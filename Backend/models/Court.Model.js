const mongoose = require("mongoose");

// Create a schema for Padel Court
const padelCourtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading/trailing whitespace
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    availability: {
      type: [{ date: Date, timeSlots: [{ start: String, end: String }] }], // Array of availability objects
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
      min: 0, // Ensures price is not negative
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model for the court owner
      required: true,
    },
    courtImg: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Create a model from the schema
const PadelCourt = mongoose.model("court", padelCourtSchema);

module.exports = PadelCourt;
