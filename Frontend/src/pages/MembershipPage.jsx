import { useEffect, useState } from "react";
import { ArrowRight, Check, Crown, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { getMembershipPlans } from "../api/api";

const planIcons = {
  starter: Sparkles,
  pro: Zap,
  elite: Crown,
};

const fallbackPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "For casual players who want priority court access.",
    price: 29,
    interval: "month",
    features: ["2 priority bookings", "Off-peak court access", "Member-only events"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For weekly players building a serious rhythm.",
    price: 59,
    interval: "month",
    features: ["6 priority bookings", "Peak-hour access", "Free racket rental"],
  },
  {
    id: "elite",
    name: "Elite",
    description: "For competitive players who want the full club experience.",
    price: 99,
    interval: "month",
    features: ["Unlimited priority bookings", "Private coaching discount", "Guest passes"],
  },
];

export default function MembershipPage() {
  const [plans, setPlans] = useState(fallbackPlans);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await getMembershipPlans();
        setPlans(data.plans || fallbackPlans);
        setStatus("ready");
      } catch (error) {
        console.error("Error Fetching Membership Plans:", error);
        setStatus("fallback");
      }
    };

    loadPlans();
  }, []);

  return (
    <main className="membership-page">
      <section className="membership-hero">
        <p>Memberships</p>
        <h1>Play more. Wait less.</h1>
        <span>
          Choose a premium plan and move from browsing courts to owning your
          weekly match rhythm.
        </span>
      </section>

      {status === "fallback" && (
        <div className="membership-note glass-panel">
          Showing default plans because the backend plans endpoint is not reachable.
        </div>
      )}

      <section className="plans-grid" aria-label="Membership plans">
        {plans.map((plan) => {
          const Icon = planIcons[plan.id] || Sparkles;
          const isFeatured = plan.id === "pro";

          return (
            <article
              className={`plan-card glass-panel ${isFeatured ? "featured" : ""}`}
              key={plan.id}
            >
              {isFeatured && <span className="plan-ribbon">Most Popular</span>}
              <div className="plan-icon">
                <Icon size={26} strokeWidth={2.2} />
              </div>
              <h2>{plan.name}</h2>
              <p>{plan.description}</p>
              <div className="plan-price">
                ${plan.price}<span> / {plan.interval}</span>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} strokeWidth={2.4} /> {feature}
                  </li>
                ))}
              </ul>
              <Link className="plan-cta" to={`/checkout/${plan.id}`}>
                Start {plan.name} <ArrowRight size={18} strokeWidth={2.4} />
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
