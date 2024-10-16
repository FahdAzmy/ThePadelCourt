const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const courtRoutes = require("./routes/Courts.Route");
const bookingRoutes = require("./routes/Booking.Route");
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
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
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
app.use("/api", route);
app.use("/api", userRoutes);

//error Handler
app.use(NotFoundRoutes);
app.use(GlobalErrorHandler);

// Connect To DB
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  ConnectToDb();
  console.log("Server Listening on Port", Port);
});
 