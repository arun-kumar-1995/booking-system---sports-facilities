import mongoose from "mongoose";
import bcrypt from "bcrypt";
const schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
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
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

//define hooks here
schema.pre("isModified", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    return next(err);
  }
});

// define user methods here
// define usefull index here
export default User;
