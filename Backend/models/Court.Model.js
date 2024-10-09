const mongoose = require("mongoose");

const padelCourtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    operatingHours: {
      start: {
        type: Number,
        required: true,
        min: 0,
        max: 23,
      },
      end: {
        type: Number,
        required: true,
        min: 0,
        max: 23,
      },
    },
    availability: [
      {
        date: {
          type: Date,
          required: true,
        },
        timeSlots: [
          {
            start: String,
            end: String,
          },
        ],
      },
    ],
    pricePerHour: {
      type: Number,
      required: true,
      min: 0,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courtImg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// إنشاء الموديل
const PadelCourt = mongoose.model("PadelCourt", padelCourtSchema);

module.exports = PadelCourt;
