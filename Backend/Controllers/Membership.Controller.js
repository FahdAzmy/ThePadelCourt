const asyncHandler = require("../middlewares/AsyncHandler");

const membershipPlans = {
  starter: {
    id: "starter",
    name: "Starter",
    description: "For casual players who want priority court access.",
    price: 29,
    interval: "month",
    features: ["2 priority bookings", "Off-peak court access", "Member-only events"],
  },
  pro: {
    id: "pro",
    name: "Pro",
    description: "For weekly players building a serious rhythm.",
    price: 59,
    interval: "month",
    features: ["6 priority bookings", "Peak-hour access", "Free racket rental"],
  },
  elite: {
    id: "elite",
    name: "Elite",
    description: "For competitive players who want the full club experience.",
    price: 99,
    interval: "month",
    features: ["Unlimited priority bookings", "Private coaching discount", "Guest passes"],
  },
};

function getClientUrl() {
  return (
    [process.env.CLIENT_URL, process.env.FRONTEND_URL, process.env.CORS_ORIGIN]
      .map((url) => url?.trim())
      .find(Boolean) || "http://localhost:5173"
  ).replace(/\/$/, "");
}

exports.getMembershipPlans = asyncHandler(async (req, res) => {
  res.status(200).json({ plans: Object.values(membershipPlans) });
});

exports.createMembershipCheckoutSession = asyncHandler(async (req, res) => {
  const { planId } = req.body;
  const plan = membershipPlans[planId];

  if (!plan) {
    return res.status(400).json({ message: "Invalid membership plan" });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({
      message: "Stripe is not configured. Add STRIPE_SECRET_KEY to Backend/.env",
    });
  }

  if (typeof fetch !== "function") {
    return res.status(500).json({
      message: "Stripe checkout requires Node 18+ fetch support.",
    });
  }

  const clientUrl = getClientUrl();
  const currency = process.env.STRIPE_CHECKOUT_CURRENCY || "usd";
  const body = new URLSearchParams();

  body.append("mode", "subscription");
  body.append("payment_method_types[0]", "card");
  body.append("line_items[0][quantity]", "1");
  body.append("line_items[0][price_data][currency]", currency);
  body.append("line_items[0][price_data][unit_amount]", String(plan.price * 100));
  body.append("line_items[0][price_data][recurring][interval]", plan.interval);
  body.append("line_items[0][price_data][product_data][name]", `${plan.name} Membership`);
  body.append("line_items[0][price_data][product_data][description]", plan.description);
  body.append("metadata[planId]", plan.id);
  body.append("metadata[planName]", plan.name);
  body.append(
    "success_url",
    `${clientUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan.id}`
  );
  body.append("cancel_url", `${clientUrl}/checkout/cancel?plan=${plan.id}`);

  const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const session = await stripeResponse.json();

  if (!stripeResponse.ok) {
    return res.status(stripeResponse.status).json({
      message: session.error?.message || "Stripe checkout failed",
    });
  }

  res.status(200).json({ url: session.url });
});
