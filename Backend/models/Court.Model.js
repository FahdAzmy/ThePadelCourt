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
        type: String,
        required: true,
      },
      end: {
        type: String,
        required: true,
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
      type: Object,
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
