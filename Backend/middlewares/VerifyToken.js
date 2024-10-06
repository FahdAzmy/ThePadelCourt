const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
exports.verifeyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return next(new AppError("Access Denied: No Token Provided", 401));
  try {
    const verifedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verifedToken;
    next();
  } catch (error) {
    return next(new AppError("Invalid Token", error));
  }
};

// Middleware to check if the user is an admin
exports.isAdminOrOwner = (req, res, next) => {
  // Check if the user's role is admin or owner
  if (req.user && (req.user.role === "admin" || req.user.role === "owner")) {
    return next(); // Proceed to the next middleware or route handler
  } else {
    return next(new AppError("Access Denied: Admins or Owners Only", 403)); // Forbidden for others
  }
};
