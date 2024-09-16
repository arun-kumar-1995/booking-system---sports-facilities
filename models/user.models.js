import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: true,
    },
    last_name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      select: false,
    },
    phone: {
      type: Number,
      required: true,
      select: false,
    },
    password: {
      type: String,
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    bookings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    account_status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password
schema.pre("save", async function (next) {
  // Check if the password field has been modified
  if (!this.isModified("password")) return next();

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed with the save
  } catch (err) {
    return next(err);
  }
});

// Method to compare hashed passwords
schema.methods.matchPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// Define the User model
const User = mongoose.model("User", schema);

export default User;
