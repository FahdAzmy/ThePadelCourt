const asyncHandler = require("../middlewares/AsyncHandler");
const appError = require("../utils/AppError");
const Court = require("../models/Court.Model");
const Booking = require("../models/Booking.Model");
const User = require("../models/User.Model");

const { default: mongoose } = require("mongoose");
exports.CreateBooking = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { courtId, date, timeSlot } = req.body;
    const userId = req.user.userId;

    const bookingDate = new Date(date);
    bookingDate.setDate(bookingDate.getDate()); // Keep the same date
    bookingDate.setUTCHours(22, 0, 0, 0);
    // const offsetHours = bookingDate.getTimezoneOffset() / 60;

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

    await booking.save({ session });

    await Court.updateOne(
      {
        _id: courtId,
        "availability.date": bookingDate,
      },
      { $pull: { "availability.$.timeSlots": timeSlot } },
      { session }
    );
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
    await session.abortTransaction();
    res.status(400).json({ message: "Booking Failed", error: error.message });
  } finally {
    session.endSession();
  }
};
exports.confirmBooking = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bookingId } = req.params;
    const userId = req.user.userId;

    // Find the pending booking
    const booking = await Booking.findOne({
      _id: bookingId,
      userId,
      status: "Pending", // assuming 'pending' is the initial status
    }).session(session);
    if (!booking) {
      next(new appError("Booking not found or not pending"));
    }

    // Update booking status to confirmed
    booking.status = "confirmed";
    await booking.save({ session });

    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "Booking Confirmed",
      booking,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};
exports.cancelBooking = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bookingId } = req.params;
    const userId = req.user.userId;
    console.log(userId);
    console.log(bookingId);
    const booking = await Booking.findOne({
      _id: bookingId,
      userId,
      status: "confirmed",
    }).session(session);

    if (!booking) {
      next(new appError("Booking not found or not confirmed", 404));
    }
    // update Booking status
    booking.status = "cancelled";
    await booking.save({ session });
    // return the time back
    await Court.updateOne(
      {
        _id: booking.courtId,
        "availability.date": booking.date,
      },
      {
        $push: {
          "availability.$.timeSlots": booking.timeSlot,
        },
      },
      { session }
    );

    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};
