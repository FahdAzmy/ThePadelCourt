import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createMembershipCheckoutSession } from "../api/api";

const planNames = {
  starter: "Starter",
  pro: "Pro",
  elite: "Elite",
};

export default function CheckoutPage() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Preparing secure checkout...");
  const [error, setError] = useState("");

  const planName = useMemo(() => planNames[planId] || "Membership", [planId]);

  useEffect(() => {
    const startCheckout = async () => {
      if (!planNames[planId]) {
        setError("This membership plan does not exist.");
        return;
      }

      try {
        setStatus("Creating your Stripe test checkout session...");
        const data = await createMembershipCheckoutSession(planId);

        if (!data.url) {
          throw new Error("Stripe did not return a checkout URL.");
        }

        setStatus("Redirecting you to Stripe...");
        window.location.assign(data.url);
      } catch (checkoutError) {
        console.error("Checkout error:", checkoutError);
        setError(
          checkoutError.response?.data?.message ||
            checkoutError.message ||
            "Could not start Stripe checkout."
        );
      }
    };

    startCheckout();
  }, [planId]);

  return (
    <main className="checkout-page">
      <section className="checkout-panel glass-panel">
        <div className="checkout-icon">
          {error ? <ShieldCheck size={34} /> : <Loader2 size={34} className="spin" />}
        </div>
        <p className="checkout-kicker">Stripe Test Checkout</p>
        <h1>{error ? "Checkout needs attention" : `${planName} Membership`}</h1>
        <p className="checkout-copy">{error || status}</p>

        {error && (
          <div className="checkout-actions">
            <button type="button" onClick={() => navigate(0)}>
              Try Again
            </button>
            <Link to="/memberships">
              <ArrowLeft size={18} /> Back to plans
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
