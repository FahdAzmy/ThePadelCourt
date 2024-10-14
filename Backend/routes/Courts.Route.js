const express = require("express");
const {
  CreateCourt,
  getCourts,
  getOwnerCourts,
  deleteCourt,
  editCourt,
  getCourtAvailability,
  getCourt,
} = require("../Controllers/Court.Controller");
const photoUpload = require("../middlewares/Uploadeimg");
const { verifeyToken, isAdminOrOwner } = require("../middlewares/VerifyToken");
const router = express.Router();
router.post(
  "/createcourt",
  verifeyToken,
  isAdminOrOwner,
  photoUpload.single("courtImg"),
  CreateCourt
);
router.get("/getcourts", getCourts);
router.get("/getcourt/:courtId", verifeyToken, getCourtAvailability);
router.get("/getcourtsofowner", verifeyToken, isAdminOrOwner, getOwnerCourts);
router.delete("/deletecourt", deleteCourt);
router.put("/updatecourt", verifeyToken, isAdminOrOwner, editCourt);
router.get("/court/:id", getCourt);
module.exports = router;
