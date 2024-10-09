const mongoose = require("mongoose");

// Create Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    courtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PadelCourt",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      start: {
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["confirmed", "Pending", "cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Create the Booking model
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
