import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    location: {
      type: String,
    },
    type: {
      type: String,
      enum: [
        "table tennis",
        "football",
        "basketball",
        "swimming",
        "badminton",
        "volleyball",
        "cricket",
      ],
    },
    availability: [
      {
        date: {
          type: Date,
        },

        timeSlots: [
          {
            startTime: {
              type: Date,
            },
            endTime: {
              type: Date,
            },
            isAvailable: {
              type: Boolean,
              default: true,
            },
          },
        ],
      },
    ],
    pricing: {
      regularPrice: {
        type: Number,
        min: 0,
      },
      peakPrice: {
        type: Number,
        min: 0,
      },
    },
    peakHours: [
      {
        startTime: { type: String },
        endTime: { type: String },
      },
    ],
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
    managedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Facility = mongoose.model("Facility", schema);
export default Facility;
