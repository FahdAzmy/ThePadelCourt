const asyncHandler = require("../middlewares/AsyncHandler");
const appError = require("../utils/AppError");
const User = require("../models/User.Model");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(new appError("No Users"));
  res.status(404).json({ length: users.length, Users: users });
});
exports.getUser = asyncHandler(async (req, res, next) => {
  const id = req.user.userId;
  const user = await User.findById(id);
  if (!user) return next(new appError("User not found"));
  res.status(200).json({ user });
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  const id = req.user.userId;
  const user = await User.findById(id);
  if (!user) return next(new appError("User not found"));
  const { name, password } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, password },
    { new: true }
  );
  res.status(200).json({ message: "User updated successfully", updatedUser });
});
exports.ChangePassword = asyncHandler(async (req, res, next) => {
  const id = req.user.userId;
  const user = await User.findById(id);
  if (!user) return next(new appError("User not found"));
  console.log(`old Password ${oldPassword} newPassword ${newPassword}`);
  const isMatchPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isMatchPassword) return next(new appError("Invalid Old Pasword"));
  const HashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  user.password = HashedNewPassword;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});
