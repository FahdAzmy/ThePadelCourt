import { Link, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

function useCheckoutStatusContent(isSuccess) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const plan = query.get("plan");

  return (
    <main className="checkout-page">
      <section className="checkout-panel glass-panel">
        <div className={`checkout-icon ${isSuccess ? "success" : "cancel"}`}>
          {isSuccess ? <CheckCircle2 size={38} /> : <XCircle size={38} />}
        </div>
        <p className="checkout-kicker">Membership Checkout</p>
        <h1>{isSuccess ? "You are almost in" : "Checkout cancelled"}</h1>
        <p className="checkout-copy">
          {isSuccess
            ? `Stripe test checkout completed for ${plan || "your"} plan. Add webhook handling when you are ready to activate memberships in the database.`
            : "No payment was completed. You can return to the plans and choose another membership."}
        </p>
        <Link className="plan-cta status-link" to={isSuccess ? "/courts" : "/memberships"}>
          {isSuccess ? "Browse courts" : "Back to plans"} <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}

export function CheckoutSuccessPage() {
  return useCheckoutStatusContent(true);
}

export function CheckoutCancelPage() {
  return useCheckoutStatusContent(false);
}
