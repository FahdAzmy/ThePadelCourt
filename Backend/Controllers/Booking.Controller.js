const asyncHandler = require("../middlewares/AsyncHandler");
const appError = require("../utils/AppError");
const Court = require("../models/Court.Model");
const Booking = require("../models/Booking.Model");
const User = require("../models/User.Model");
const { default: mongoose } = require("mongoose");

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

    const bookingDate = new Date(date);
    bookingDate.setUTCHours(22, 0, 0, 0); // Set the time to UTC 22:00

    // Check if the court is available for the requested date and time slot
    const court = await Court.findOne({
      _id: courtId,
      availability: {
        $elemMatch: {
          date: bookingDate,
          timeSlots: {
            $elemMatch: { start: timeSlot.start, end: timeSlot.end },
          },
        },
      },
    }).session(session);

    // If the court is not available, send an error
    if (!court) {
      return next(
        new appError("This Court is not available at this time", 404)
      );
    }

    const booking = new Booking({
      courtId,
      userId,
      date: bookingDate,
      timeSlot,
    });

    await booking.save({ session }); // Save the booking to the database

    // Update court availability by removing the booked time slot
    await Court.updateOne(
      {
        _id: courtId,
        "availability.date": bookingDate,
      },
      { $pull: { "availability.$.timeSlots": timeSlot } },
      { session }
    );

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

    // Find the booking to cancel
    const booking = await Booking.findOne({
      _id: bookingId,
    }).session(session);

    // If booking not found, return an error
    if (!booking) {
      next(new appError("Booking not found", 404));
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
    if (updateResult.nModified === 0) {
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
