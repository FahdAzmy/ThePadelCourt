const asyncHandler = require("../middlewares/AsyncHandler");
const appError = require("../utils/AppError");
const Court = require("../models/Court.Model");
const { UploadPhotoToCloud } = require("../middlewares/UploadToCloudaniry");

// Generate time slots based on start and end hours
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

/**
 * @desc Create a new court
 * @route POST /api/createcourt
 * @access Private
 * @middleware verifyToken, isAdminOrOwner
 */
exports.CreateCourt = asyncHandler(async (req, res, next) => {
  const { name, location, pricePerHour, daysInAdvance = 30 } = req.body;
  const startHour = parseInt(req.body.startHour, 10);
  const endHour = parseInt(req.body.endHour, 10);

  // Check if the conversion was successful
  if (isNaN(startHour) || isNaN(endHour)) {
    return next(new appError("Invalid startHour or endHour", 400));
  }

  const ownerId = req.user.userId;

  // Ensure the owner is logged in
  if (!ownerId) return next(new appError("You Must Login", 404));

  // Validate required fields
  if (!name || !location || !startHour || !endHour || !pricePerHour)
    return next(new appError("All Fields are Required", 404));

  // Check if the court already exists
  const courtIsExist = await Court.findOne({ name });
  if (courtIsExist) return next(new appError("This Court Already Exists", 404));

  let courtImg = null;

  // Upload image if provided
  if (req.file) {
    courtImg = await UploadPhotoToCloud(req.file);
  }

  const availability = [];
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  // Generate availability for the specified number of days in advance
  for (let i = 0; i < daysInAdvance; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    availability.push({
      date: currentDate,
      timeSlots: generateTimeSlots(startHour, endHour),
    });
  }

  // Create a new court record in the database
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
 
  res.status(201).json({ message: "Court created Successfully", newCourt });
});

/**
 * @desc Get court availability for a specific date
 * @route GET /api/getcourt/:courtId
 * @access Private
 * @middleware verifyToken
 */
exports.getCourtAvailability = asyncHandler(async (req, res, next) => {
  const { courtId } = req.params;
  const { date } = req.query;

  // Find the court by ID
  const court = await Court.findById(courtId);
  if (!court) {
    return next(new appError("Court not found", 404));
  }

  let availabilityFilter = court.availability;

  // Filter availability by requested date
  if (date) {
    // Create a Date object from the query
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

/**
 * @desc Get all courts
 * @route GET /api/getcourts
 * @access Public
 */
exports.getCourts = asyncHandler(async (req, res, next) => {
  const courts = await Court.find();
  res.status(200).json({ length: courts.length, message: "Courts", courts });
});

/**
 * @desc Get courts owned by the logged-in user
 * @route GET /api/getcourtsofowner
 * @access Private
 * @middleware verifyToken, isAdminOrOwner
 */
exports.getOwnerCourts = asyncHandler(async (req, res, next) => {
  const ownerId = req.user.userId;
  const courts = await Court.find({ ownerId });
  res.status(200).json({ length: courts.length, message: "Courts", courts });
});

/**
 * @desc Delete a court
 * @route DELETE /api/deletecourt
 * @access Private
 * @middleware verifyToken, isAdminOrOwner
 */
exports.deleteCourt = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  // Validate court ID
  if (!id) return next(new appError("Court Id is Required", 404));

  const court = await Court.findById(id);
  if (!court) return next(new appError("Court Not Found", 404));

  // Delete the court record
  await Court.findByIdAndDelete(id);

  res.status(200).json({ message: "Court Deleted" });
});

/**
 * @desc Edit an existing court
 * @route PUT /api/updatecourt
 * @access Private
 * @middleware verifyToken, isAdminOrOwner
 */
exports.editCourt = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  // Validate court ID
  if (!id) return next(new appError("Court Id is Required", 404));

  const court = await Court.findById(id);
  if (!court) return next(new appError("Court Not Found", 404));

  const { name, location, availability, pricePerHour, courtImg } = req.body;

  // Update the court record
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

/**
 * @desc Get details of a specific court
 * @route GET /api/getcourt/:id
 * @access Public
 */
exports.getCourt = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Find the court by ID
  const court = await Court.findById(id);
  if (!court) return next(new appError("Court Not Found", 404));

  res.status(200).json({ court });
});
