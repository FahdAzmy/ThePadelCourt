const express = require("express");
const {} = require("../Controllers/Court.Controller");
const { verifeyToken, isAdminOrOwner } = require("../middlewares/VerifyToken");
const router = express.Router();

module.exports = router;
