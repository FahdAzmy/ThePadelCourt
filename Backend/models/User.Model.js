const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Requried"],
    minlength: [4, "Name must be at least 4 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: [6, "Password must be at Least 6 Characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  bookings: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
      courtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PadelCourt",
      },
      courtName: String,
      date: Date,
      timeSlot: {
        start: String,
        end: String,
      },
      status: {
        type: String,
        enum: ["confirmed", "Pending", "cancelled"],
        default: "Pending",
      },
      createdAt: Date,
    },
  ],
  role: {
    type: String,
    enum: ["user", "admin", "owner"],
    default: "user",
  },
  role: {
    type: String,
    enum: ["user", "admin", "owner"],
    default: "user",
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
