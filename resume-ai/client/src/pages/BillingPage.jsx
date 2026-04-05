import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { billingAPI } from "../services/billing.api.js";
import PlanCard from "../components/billing/PlanCard.jsx";
import CardForm from "../components/billing/CardForm.jsx";

const PLANS = [
  { id: "free",   name: "Free",       price: 0,  period: "forever",   priceId: null,
    features: ["4 Free Templates","Basic AI Suggestions","PDF Download","5 Analyses/month"] },
  { id: "pro",    name: "Pro",        price: 9,  period: "per month",  priceId: import.meta.env.VITE_STRIPE_PRO_MONTHLY_PRICE_ID,
    features: ["All 8 Templates","Unlimited AI Suggestions","PDF + Word Download","Unlimited Analyses","Priority Support"] },
  { id: "annual", name: "Pro Annual", price: 79, period: "per year",   priceId: import.meta.env.VITE_STRIPE_PRO_ANNUAL_PRICE_ID,
    features: ["Everything in Pro","2 Months Free","Team Sharing (soon)","White-label PDF"] },
];

export default function BillingPage() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState("pro");
  const [step, setStep] = useState(searchParams.get("success") ? 2 : 0);
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isPremium = user?.plan === "pro" || user?.plan === "pro_annual";

  const chosenPlan = PLANS.find((p) => p.id === selected);

  const handleCheckout = async () => {
    if (selected === "free") { navigate("/"); return; }
    setLoading(true);
    setError("");
    try {
      // Try real Stripe checkout first
      if (chosenPlan.priceId) {
        const data = await billingAPI.checkout(chosenPlan.priceId);
        window.location.href = data.url;
        return;
      }
    } catch {
      // Fall through to demo card form if Stripe not configured
    }
    setStep(1);
    setLoading(false);
  };

  const handlePay = async () => {
    if (!card.name || !card.number || !card.expiry || !card.cvv) {
      setError("Please fill all card fields.");
      return;
    }
    setLoading(true);
    // Simulate payment success (demo)
    await new Promise((r) => setTimeout(r, 1200));
    await refreshUser?.().catch(() => {});
    setStep(2);
    setLoading(false);
  };

  // Success screen
  if (step === 2) return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
      <div className="text-5xl mb-5">✦</div>
      <h2 className="font-serif text-3xl text-[#c9a84c] mb-2">You're on Pro!</h2>
      <p className="text-sm text-[#3a4560] mb-6 max-w-sm">All premium features are unlocked. Enjoy all 8 templates, unlimited AI suggestions, and Word downloads.</p>
      <button className="btn btn-gold" onClick={() => navigate("/")}>Go to Dashboard →</button>
    </div>
  );

  // Card payment step
  if (step === 1) return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button className="btn btn-ghost btn-sm" onClick={() => setStep(0)}>← Back</button>
          <div className="text-sm text-[#bbb]">Payment · {chosenPlan?.name} — ${chosenPlan?.price}/{chosenPlan?.period}</div>
        </div>
        <CardForm form={card} onChange={setCard} />
        {error && <div className="text-xs text-[#e04060] mb-3">{error}</div>}
        <button className="btn btn-gold btn-full py-3 text-sm" onClick={handlePay} disabled={loading}>
          {loading ? "Processing…" : `Pay $${chosenPlan?.price} — Activate Pro ✦`}
        </button>
      </div>
    </div>
  );

  // Plan selection step
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <h1 className="font-serif text-2xl text-[#c9a84c] mb-1">Choose Your Plan</h1>
      <p className="text-sm text-[#3a4560] mb-6">Unlock the full potential of your resume-building journey.</p>

      {isPremium && (
        <div className="flex items-center gap-3 mb-5 px-4 py-3 bg-green-950/20 border border-green-800/30 rounded-xl">
          <span className="text-green-400 text-lg">✦</span>
          <div>
            <div className="text-sm text-green-400 font-medium">You're on the Pro plan</div>
            <div className="text-xs text-[#3a4560] mt-0.5">All premium features are active.</div>
          </div>
          <button className="btn btn-ghost btn-sm ml-auto" onClick={async () => { try { const d = await billingAPI.portal(); window.location.href = d.url; } catch { alert("Billing portal unavailable in demo mode."); } }}>
            Manage Billing
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} selected={selected === plan.id} onSelect={setSelected} />
        ))}
      </div>

      {error && <div className="text-xs text-[#e04060] mb-3">{error}</div>}

      <div className="flex justify-end">
        {selected === "free" ? (
          <button className="btn btn-ghost" onClick={() => navigate("/")}>Continue with Free</button>
        ) : (
          <button className="btn btn-gold px-8 py-2.5 text-sm" onClick={handleCheckout} disabled={loading}>
            {loading ? "Redirecting…" : `Continue to Payment →`}
          </button>
        )}
      </div>

      <p className="text-center text-[10px] text-[#2a3040] mt-4">
        Powered by Stripe · Cancel anytime · No hidden fees
      </p>
    </div>
  );
}
