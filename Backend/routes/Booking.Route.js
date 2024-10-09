const { verifeyToken, isAdminOrOwner } = require("../middlewares/VerifyToken");
const express = require("express");
const router = express.Router();
const {
  CreateBooking,
  cancelBooking,
  confirmBooking,
} = require("../Controllers/Booking.Controller");
router.post("/createbooking", verifeyToken, CreateBooking);
router.post("/confirmbooking/:bookingId", verifeyToken, confirmBooking);
router.post("/cancelbooking/:bookingId", verifeyToken, cancelBooking);
module.exports = router;
