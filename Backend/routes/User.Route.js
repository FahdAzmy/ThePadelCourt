const express = require("express");
const router = express.Router();

const { verifeyToken, isAdminOrOwner } = require("../middlewares/VerifyToken");
const {
  getUsers,
  getUser,
  updateUser,
  ChangePassword,
} = require("../Controllers/User.Controller");
router.get("/getusers", getUsers);
router.get("/getuser", verifeyToken, getUser);
router.put("/updateuser", verifeyToken, updateUser);
router.post("/changepassword", verifeyToken, ChangePassword);
module.exports = router;
