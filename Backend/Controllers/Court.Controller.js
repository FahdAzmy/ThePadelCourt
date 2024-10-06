const asyncHandler = require("../middlewares/AsyncHandler");
const appError = require("../utils/AppError");
const Court = require("../models/Court.Model");
exports.CreateCourt = asyncHandler(async (req, res, next) => {
  const { name, location, availability, pricePerHour, courtImg } = req.body;
  const ownerId = req.user.userId;
  const courtIsExist = await Court.findOne({ name });
  if (courtIsExist) return next(new appError("This Court is Exist", 404));
  const newCourt = await Court.create({
    name,
    location,
    availability,
    pricePerHour,
    ownerId: ownerId,
    courtImg,
  });
  res.status(201).json({ message: "Court create Succes", newCourt });
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
