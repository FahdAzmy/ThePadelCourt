const mongoose = require("mongoose");

// Create a schema for Owner
const ownerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the User model
      required: true,
    },
    padelCourts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "court", // Reference to the PadelCourt model
      },
    ],
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Create a model from the schema
const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
