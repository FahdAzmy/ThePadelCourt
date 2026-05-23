const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const courtRoutes = require("./routes/Courts.Route");
const bookingRoutes = require("./routes/Booking.Route");
const membershipRoutes = require("./routes/Membership.Route");
const route = require("./Routs/Rout.js");
const userRoutes = require("./routes/User.Route.js");
const ConnectToDb = require("./db/ConeectedToDb");
const {
  NotFoundRoutes,
  GlobalErrorHandler,
} = require("./middlewares/ErrorHandling");
const app = express();
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN || "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174",
      "http://localhost:5175",
      "http://127.0.0.1:5175"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
// Other middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", authRoutes);
app.use("/api", courtRoutes);
app.use("/api", bookingRoutes);
app.use("/api", membershipRoutes);
app.use("/api", route);
app.use("/api", userRoutes);

// Health check and root endpoints
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "System is healthy" });
});
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to The Padel Court API" });
});

//error Handler
app.use(NotFoundRoutes);
app.use(GlobalErrorHandler);

// Connect To DB
ConnectToDb();

if (process.env.NODE_ENV !== "production") {
  const Port = process.env.PORT || 4000;
  app.listen(Port, () => {
    console.log("Server Listening on Port", Port);
  });
}

module.exports = app;
