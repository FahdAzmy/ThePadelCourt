const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ConnectToDb = require("./db/ConeectedToDb");

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // استبدل بهذا العنوان إذا كان مختلفاً
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const Port = process.env.PORT || 3000;
// Other middleware
app.use(cookieParser());
app.use(express.json());

//Routes

//error Handler

// Connect To DB
app.listen(Port, () => {
  ConnectToDb();
  console.log("Server Listening on Port", Port);
});
