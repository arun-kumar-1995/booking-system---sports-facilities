import mongoose from "mongoose";
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

// define user methods here

// define usefull index here
export default User;
