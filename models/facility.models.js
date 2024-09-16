import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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
          required: true,
        },

        timeSlots: [
          {
            startTime: {
              type: Date,
              required: true,
            }, // Time in HH:mm format
            endTime: {
              type: Date,
              required: true,
            }, // Time in HH:mm format
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
        required: true,
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

const Faculty = mongoose.model("Faculty", schema);
export default Faculty;
