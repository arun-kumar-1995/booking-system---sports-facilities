import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    facilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
    refundAmount: {
      type: Number,
    },
    cancellationTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Cancellation = mongoose.model("Cancellation", schema);
export default Cancellation;
