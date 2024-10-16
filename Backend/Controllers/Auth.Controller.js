const asynHandler = require("../middlewares/AsyncHandler");
const appError = require("../utils/AppError");
const User = require("../models/User.Model");
const bcrypt = require("bcrypt");
const { generateToeknAndSetCookie } = require("../utils/generateToken");
const SALT_ROUNDS = 12;

// Create User
/**
 * @desc Create a new user || Signup
 * @route POST /api/signup
 * @access Public
 */
exports.Signup = asynHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password)
    return next(new appError("All Fields are required", 404));
  const emailExist = await User.findOne({ email });
  if (emailExist) return next(new appError("User already Exist", 400));
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  res.status(200).json({ message: "User Created Successfully", user });
});
// User Login
/**
 * @desc Login a user and set JWT token in cookie
 * @route POST /api/login
 * @access Public
 */
exports.Login = asynHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new appError("Invalid Email Or Password", 404));
  const isPassword = await bcrypt.compare(password, user.password);
  if (!isPassword) return next(new appError("Invalid Email Or Password"));
  generateToeknAndSetCookie(res, user);
  res.status(200).json({ message: "Login Successfully", user });
});
// User Logout
/**
 * @desc Logout a user and clear the JWT token cookie
 * @route POST /api/logout
 * @access Private
 * @middleware verifyToken
 */
exports.logout = asynHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ Success: true, message: "Logout Successfully" });
});
