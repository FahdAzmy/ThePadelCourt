const express = require("express");
const {
  createMembershipCheckoutSession,
  getMembershipPlans,
} = require("../Controllers/Membership.Controller");

const router = express.Router();

router.get("/membership-plans", getMembershipPlans);
router.post("/create-membership-checkout-session", createMembershipCheckoutSession);

module.exports = router;
