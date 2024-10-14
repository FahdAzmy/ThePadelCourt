const asyncHandler = require("../middlewares/AsyncHandler");
const appError = require("../utils/AppError");
const Court = require("../models/Court.Model");
const { UploadPhotoToCloud } = require("../middlewares/UploadToCloudaniry");
// Generate Defualt Date's
function generateTimeSlots(startHour, endHour) {
  // Check if startHour and endHour are defined
  if (startHour === undefined || endHour === undefined) {
    throw new Error("The startHour and endHour parameters are required");
  }

  // Check if startHour and endHour are valid
  if (startHour >= endHour) {
    throw new Error("Start hour must be less than end hour");
  }

  if (startHour < 0 || startHour > 23 || endHour < 0 || endHour > 23) {
    throw new Error("Time must be between 0 and 23");
  }

  const timeSlots = [];

  for (let hour = startHour; hour < endHour; hour++) {
    const startTime =
      hour < 12
        ? `${hour === 0 ? 12 : hour}:00 AM`
        : `${hour === 12 ? 12 : hour - 12}:00 PM`;

    const nextHour = hour + 1;
    const endTime =
      nextHour < 12
        ? `${nextHour === 0 ? 12 : nextHour}:00 AM`
        : `${nextHour === 12 ? 12 : nextHour - 12}:00 PM`;

    timeSlots.push({
      start: startTime,
      end: endTime,
    });
  }

  return timeSlots;
}

exports.CreateCourt = asyncHandler(async (req, res, next) => {
  const {
    name,
    location,
    startHour,
    endHour,
    pricePerHour,
    daysInAdvance = 30,
  } = req.body;
  const ownerId = req.user.userId;
  if (!ownerId) return next(new appError("You Must Login", 404));
  if (!name || !location || !startHour || !endHour || !pricePerHour)
    return next(new appError("All Fields is Required", 404));
  const courtIsExist = await Court.findOne({ name });
  if (courtIsExist) return next(new appError("This Court is Exist", 404));
  let courtImg = null;
  if (req.file) {
    courtImg = await UploadPhotoToCloud(req.file); // استدعاء فانكشن رفع الصورة
  }
  const availability = [];
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  for (let i = 0; i < daysInAdvance; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    availability.push({
      date: currentDate,
      timeSlots: generateTimeSlots(startHour, endHour),
    });
  }
  const newCourt = await Court.create({
    name,
    location,
    operatingHours: {
      start: startHour,
      end: endHour,
    },
    availability,
    pricePerHour,
    ownerId,
    courtImg,
  });

  res.status(201).json({ message: "Court create Succes", newCourt });
});
exports.getCourtAvailability = asyncHandler(async (req, res, next) => {
  const { courtId } = req.params;
  const { date } = req.query;

  const court = await Court.findById(courtId);
  if (!court) {
    return next(new appError("Court not found", 404));
  }

  let availabilityFilter = court.availability;

  if (date) {
    // Create a Date object in UTC
    const requestedDate = new Date(date);

    availabilityFilter = court.availability.filter((avail) => {
      const availDate = new Date(avail.date);

      // Compare dates using UTC methods
      return (
        availDate.getUTCFullYear() === requestedDate.getUTCFullYear() &&
        availDate.getUTCMonth() === requestedDate.getUTCMonth() &&
        availDate.getUTCDate() === requestedDate.getUTCDate()
      );
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      courtName: court.name,
      availability: availabilityFilter,
    },
  });
});
exports.getCourts = asyncHandler(async (req, res, next) => {
  const courts = await Court.find();
  res.status(200).json({ length: courts.length, message: "Courts", courts });
});
exports.getOwnerCourts = asyncHandler(async (req, res, next) => {
  const ownerId = req.user.userId;
  const courts = await Court.find({ ownerId });
  res.status(200).json({ length: courts.length, message: "Courts", courts });
});
exports.deleteCourt = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  if (!id) return next(new appError("Court Id is Required", 404));
  const court = await Court.findById(id);
  if (!court) return next(new appError("Court Not Found", 404));
  await Court.findByIdAndDelete(id);

  res.status(200).json({ message: "Court Deleted" });
});
exports.editCourt = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  if (!id) return next(new appError("Court Id is Required", 404));
  const court = await Court.findById(id);
  if (!court) return next(new appError("Court Not Found", 404));
  const { name, location, availability, pricePerHour, courtImg } = req.body;
  const newCourt = await Court.findByIdAndUpdate(
    id,
    {
      name,
      location,
      availability,
      pricePerHour,
      courtImg,
    },
    { new: true }
  );
  res.status(200).json({ message: "Court Updated", newCourt });
});
exports.getCourt = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const court = await Court.findById(id);
  if (!court) return next(new appError("Court Not Found", 404));
  res.status(200).json({ court });
});
