const { verifeyToken, isAdminOrOwner } = require("../middlewares/VerifyToken");
const express = require("express");
const router = express.Router();
const {
  CreateBooking,
  cancelBooking,
  confirmBooking,
  createBookingCheckoutSession,
  getBookings,
} = require("../Controllers/Booking.Controller");
router.post("/createbooking", verifeyToken, CreateBooking);
router.post(
  "/create-booking-checkout-session",
  verifeyToken,
  createBookingCheckoutSession
);
router.post("/confirmbooking/:bookingId", confirmBooking);
router.post("/cancelbooking/:bookingId", verifeyToken, cancelBooking);
router.get("/bookings", getBookings);
module.exports = router;
