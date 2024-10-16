const asyncHandler = require("../middlewares/AsyncHandler");
const appError = require("../utils/AppError");
const User = require("../models/User.Model");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

/**
 * @desc Get all users
 * @route GET /api/getusers
 * @access Private
 * @middleware verifyToken, isAdminOrOwner
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  if (!users) return next(new appError("No Users"));
  res.status(404).json({ length: users.length, Users: users });
});

/**
 * @desc Get the logged-in user details
 * @route GET /api/getuser
 * @access Private
 * @middleware verifyToken
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const id = req.user.userId;
  const user = await User.findById(id);
  if (!user) return next(new appError("User not found"));
  res.status(200).json({ user });
});

/**
 * @desc Update the logged-in user's details
 * @route PUT /api/updateuser
 * @access Private
 * @middleware verifyToken
 */
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

/**
 * @desc Change the logged-in user's password
 * @route POST /api/changepassword
 * @access Private
 * @middleware verifyToken
 */
exports.ChangePassword = asyncHandler(async (req, res, next) => {
  const id = req.user.userId;
  const user = await User.findById(id);
  if (!user) return next(new appError("User not found"));

  const { oldPassword, newPassword } = req.body; // Ensure to destructure oldPassword and newPassword
  console.log(`old Password ${oldPassword} newPassword ${newPassword}`);

  const isMatchPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isMatchPassword) return next(new appError("Invalid Old Password"));

  const HashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  user.password = HashedNewPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password changed successfully",
  });
});
