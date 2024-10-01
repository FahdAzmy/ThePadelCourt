const express = require("express");
const { Signup, Login, logout } = require("../Controllers/Auth.Controller");
const router = express.Router();
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/logout", logout);
module.exports = router;
