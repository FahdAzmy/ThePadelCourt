const express = require("express");
const {
  CreateCourt,
  getCourts,
  getOwnerCourts,
  deleteCourt,
  editCourt,
} = require("../Controllers/Court.Controller");
const { verifeyToken, isAdminOrOwner } = require("../middlewares/VerifyToken");
const router = express.Router();
router.post("/createcourt", verifeyToken, isAdminOrOwner, CreateCourt);
router.get("/getcourts", getCourts);
router.get("/getcourtsofowner", verifeyToken, isAdminOrOwner, getOwnerCourts);
router.delete("/deletecourt", verifeyToken, isAdminOrOwner, deleteCourt);
router.put("/updatecourt", verifeyToken, isAdminOrOwner, editCourt);
module.exports = router;
