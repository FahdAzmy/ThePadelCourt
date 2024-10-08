const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ConnectToDb  = require("./db/ConeectedToDb");
const OwnerModul   = require("./modul/modul")
const Rout =require("./Routs/Rout");
const { ownerPost } = require("./controler/controler");
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // استبدل بهذا العنوان إذا كان مختلفاً
    methods: ["GET", "POST", "PUT", "DELETE","PATCH" ],
    credentials: true,
  })


);
const Port = 3012;;
// Other middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Routes
app.use(Rout);
//error Handler

// Connect To DB
app.listen(Port, () => {
  ConnectToDb();
  console.log("Server Listening on Port", Port);
});
