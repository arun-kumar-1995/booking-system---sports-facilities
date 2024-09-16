import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaType.Types.ObjectId,
      ref: "User",
    },
    facilityId: {
      type: mongoose.SchemaType.Types.ObjectId,
      ref: "Facility",
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    price: {
      type: Number,
      min: 0,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", schema);

export default Booking;
