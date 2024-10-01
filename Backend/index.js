const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const ConnectToDb = require("./db/ConeectedToDb");
const {
  NotFoundRoutes,
  GlobalErrorHandler,
} = require("./middlewares/ErrorHandling");
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
// Other middleware
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/api", authRoutes);

//error Handler
app.use(NotFoundRoutes);
app.use(GlobalErrorHandler);

// Connect To DB
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
  ConnectToDb();
  console.log("Server Listening on Port", Port);
});
