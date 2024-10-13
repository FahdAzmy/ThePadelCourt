const jwt = require("jsonwebtoken");
exports.generateToeknAndSetCookie = (res, user) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  res.cookie("token", token, {
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
