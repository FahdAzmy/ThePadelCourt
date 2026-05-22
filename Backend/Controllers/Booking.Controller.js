const asyncHandler = require("../middlewares/AsyncHandler");
const appError = require("../utils/AppError");
const Court = require("../models/Court.Model");
const Booking = require("../models/Booking.Model");
const User = require("../models/User.Model");
const { default: mongoose } = require("mongoose");

function getClientUrl() {
  return (
    [process.env.CLIENT_URL, process.env.FRONTEND_URL, process.env.CORS_ORIGIN]
      .map((url) => url?.trim())
      .find(Boolean) || "http://localhost:5173"
  ).replace(/\/$/, "");
}

const getUtcDateRange = (date) => {
  const dateKey = typeof date === "string" ? date.slice(0, 10) : date;
  const selectedDate = new Date(`${dateKey}T00:00:00.000Z`);

  if (Number.isNaN(selectedDate.getTime())) {
    return null;
  }

  const nextDate = new Date(selectedDate);
  nextDate.setUTCDate(nextDate.getUTCDate() + 1);

  return { selectedDate, nextDate };
};

const parseSlotTime = (time) => {
  const match = String(time).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);

  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3]?.toUpperCase();

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }

  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return hours * 60 + minutes;
};

const getSlotDurationHours = (timeSlot) => {
  const start = parseSlotTime(timeSlot.start);
  const end = parseSlotTime(timeSlot.end);

  if (start === null || end === null) {
    return 1;
  }

  const durationMinutes = end > start ? end - start : end + 24 * 60 - start;
  return Math.max(durationMinutes / 60, 1);
};

/**
 * @desc Create a new booking for a court
 * @route POST /api/bookings
 * @access Private
 * @middleware verifyToken
 */
exports.CreateBooking = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { courtId, date, timeSlot } = req.body;
    const userId = req.user.userId; // Extracting user ID from the request

    if (!courtId || !date || !timeSlot?.start || !timeSlot?.end) {
      await session.abortTransaction();
      return next(new appError("Court, date, and time slot are required", 400));
    }

    const dateRange = getUtcDateRange(date);

    if (!dateRange) {
      await session.abortTransaction();
      return next(new appError("Invalid booking date", 400));
    }

    // Check if the court is available for the requested date and time slot
    const court = await Court.findOne({
      _id: courtId,
      availability: {
        $elemMatch: {
          date: {
            $gte: dateRange.selectedDate,
            $lt: dateRange.nextDate,
          },
          timeSlots: {
            $elemMatch: { start: timeSlot.start, end: timeSlot.end },
          },
        },
      },
    }).session(session);

    // If the court is not available, send an error
    if (!court) {
      await session.abortTransaction();
      return next(
        new appError("This Court is not available at this time", 409)
      );
    }

    const availabilityDay = court.availability.find(
      (availability) =>
        availability.date >= dateRange.selectedDate &&
        availability.date < dateRange.nextDate
    );

    const bookedSlot = availabilityDay?.timeSlots.find(
      (slot) => slot.start === timeSlot.start && slot.end === timeSlot.end
    );

    if (!availabilityDay || !bookedSlot) {
      await session.abortTransaction();
      return next(
        new appError("This Court is not available at this time", 409)
      );
    }

    const booking = new Booking({
      courtId,
      userId,
      date: availabilityDay.date,
      timeSlot: {
        start: bookedSlot.start,
        end: bookedSlot.end,
      },
    });

    await booking.save({ session }); // Save the booking to the database

    // Update court availability by removing the booked time slot
    const updateResult = await Court.updateOne(
      {
        _id: courtId,
        "availability._id": availabilityDay._id,
      },
      { $pull: { "availability.$.timeSlots": { _id: bookedSlot._id } } },
      { session }
    );

    if (updateResult.modifiedCount === 0) {
      throw new Error("Failed to update court availability");
    }

    // Add the booking to the user's bookings
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          bookings: {
            _id: booking._id,
            courtId: booking.courtId,
            courtName: court.name,
            date: booking.date,
            timeSlot: booking.timeSlot,
            status: booking.status,
            createdAt: booking.createdAt,
          },
        },
      },
      { session }
    );

    await session.commitTransaction();
    res.status(200).json({ message: "Booking Created Successfully", booking });
  } catch (error) {
    await session.abortTransaction(); // Rollback if there's an error
    res.status(400).json({ message: "Booking Failed", error: error.message });
  } finally {
    session.endSession(); // End the session
  }
};

exports.createBookingCheckoutSession = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const userId = req.user.userId;

  if (!bookingId) {
    return res.status(400).json({ message: "Booking id is required" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({
      message: "Stripe is not configured. Add STRIPE_SECRET_KEY to Backend/.env",
    });
  }

  if (typeof fetch !== "function") {
    return res.status(500).json({
      message: "Stripe checkout requires Node 18+ fetch support.",
    });
  }

  const booking = await Booking.findOne({
    _id: bookingId,
    userId,
    status: { $ne: "cancelled" },
  });

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  const court = await Court.findById(booking.courtId);

  if (!court) {
    return res.status(404).json({ message: "Court not found" });
  }

  const clientUrl = getClientUrl();
  const currency = process.env.STRIPE_CHECKOUT_CURRENCY || "usd";
  const durationHours = getSlotDurationHours(booking.timeSlot);
  const totalCents = Math.max(
    Math.round(court.pricePerHour * durationHours * 100),
    50
  );
  const dateLabel = booking.date.toISOString().slice(0, 10);
  const body = new URLSearchParams();

  body.append("mode", "payment");
  body.append("payment_method_types[0]", "card");
  body.append("line_items[0][quantity]", "1");
  body.append("line_items[0][price_data][currency]", currency);
  body.append("line_items[0][price_data][unit_amount]", String(totalCents));
  body.append("line_items[0][price_data][product_data][name]", `${court.name} Booking`);
  body.append(
    "line_items[0][price_data][product_data][description]",
    `${dateLabel}, ${booking.timeSlot.start} - ${booking.timeSlot.end}`
  );
  body.append("metadata[bookingId]", String(booking._id));
  body.append("metadata[courtId]", String(court._id));
  body.append("metadata[userId]", String(userId));
  body.append(
    "success_url",
    `${clientUrl}/profile/reservations?checkout=success&booking=${booking._id}`
  );
  body.append(
    "cancel_url",
    `${clientUrl}/profile/reservations?checkout=cancel&booking=${booking._id}`
  );

  const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const session = await stripeResponse.json();

  if (!stripeResponse.ok) {
    return res.status(stripeResponse.status).json({
      message: session.error?.message || "Stripe checkout failed",
    });
  }

  res.status(200).json({ url: session.url });
});

/**
 * @desc Confirm a pending booking
 * @route POST /api/confirmbooking/:bookingId
 * @access Private
 * @middleware verifyToken
 */
exports.confirmBooking = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bookingId } = req.params; // Extracting booking ID from the request

    // Find the pending booking
    const booking = await Booking.findOne({
      _id: bookingId,
      status: "Pending", // Check if the booking is still pending
    }).session(session);

    // If booking not found, return an error
    if (!booking) {
      next(new appError("Booking not found or not pending"));
    }

    const userId = booking.userId; // Extracting user ID from the booking

    // Update booking status to confirmed
    booking.status = "confirmed";
    await booking.save({ session });

    // Update user's booking status
    await User.updateOne(
      { _id: userId, "bookings._id": bookingId },
      { $set: { "bookings.$.status": "confirmed" } },
      { session }
    );

    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "Booking Confirmed",
      booking,
    });
  } catch (error) {
    await session.abortTransaction(); // Rollback if there's an error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession(); // End the session
  }
};

/**
 * @desc Cancel an existing booking
 * @route POST /api/cancelbooking/:bookingId
 * @access Private
 * @middleware verifyToken
 */
exports.cancelBooking = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bookingId } = req.params; // Extracting booking ID from the request
    const requestingUserId = req.user.userId;

    // Find the booking to cancel
    const booking = await Booking.findOne({
      _id: bookingId,
      userId: requestingUserId,
    }).session(session);

    // If booking not found, return an error
    if (!booking) {
      await session.abortTransaction();
      return next(new appError("Booking not found", 404));
    }

    // Update booking status to cancelled
    booking.status = "cancelled";
    await booking.save({ session });

    // Return the booked time slot back to court availability
    const updateResult = await Court.updateOne(
      {
        _id: booking.courtId,
        "availability.date": booking.date,
      },
      {
        $push: {
          "availability.$[elem].timeSlots": {
            $each: [booking.timeSlot],
            $sort: { start: 1 }, // Sort the time slots after adding the new one
          },
        },
      },
      {
        arrayFilters: [{ "elem.date": booking.date }],
        session,
      }
    );

    // Ensure the court availability was updated successfully
    if (updateResult.modifiedCount === 0) {
      throw new Error("Failed to update court availability");
    }

    const userId = booking.userId; // Extracting user ID from the booking
    await User.updateOne(
      { _id: userId },
      { $pull: { bookings: { _id: bookingId } } },
      { session }
    );

    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    await session.abortTransaction(); // Rollback if there's an error
    res.status(400).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession(); // End the session
  }
};

/**
 * @desc Retrieve all bookings
 * @route GET /api/bookings
 * @access Private
 * @middleware verifyToken
 */
exports.getBookings = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.find(); // Fetch all bookings
  res.status(200).json({
    success: true,
    bookings,
  });
});
