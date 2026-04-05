import User from "../models/User.js";
import Subscription from "../models/Subscription.js";
import {
  createCheckoutSession, createPortalSession,
  constructWebhookEvent, getSubscription, cancelSubscription,
  getOrCreateCustomer,
} from "../services/stripe.service.js";
import { asyncHandler } from "../middleware/error.middleware.js";

const PRICE_TO_PLAN = {
  [process.env.STRIPE_PRO_MONTHLY_PRICE_ID]: "pro",
  [process.env.STRIPE_PRO_ANNUAL_PRICE_ID]: "pro_annual",
};

// POST /api/billing/checkout
export const checkout = asyncHandler(async (req, res) => {
  const { priceId } = req.body;

  const validPrices = [
    process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
    process.env.STRIPE_PRO_ANNUAL_PRICE_ID,
  ];
  if (!validPrices.includes(priceId)) {
    return res.status(400).json({ error: "Invalid price ID." });
  }

  const planName = PRICE_TO_PLAN[priceId] || "pro";
  const session = await createCheckoutSession({ user: req.user, priceId, planName });
  res.json({ url: session.url, sessionId: session.id });
});

// POST /api/billing/portal
export const portal = asyncHandler(async (req, res) => {
  if (!req.user.stripeCustomerId) {
    return res.status(400).json({ error: "No billing account found." });
  }
  const session = await createPortalSession(req.user.stripeCustomerId);
  res.json({ url: session.url });
});

// GET /api/billing/subscription
export const getSubscriptionInfo = asyncHandler(async (req, res) => {
  const sub = await Subscription.findOne({ userId: req.user._id });
  res.json({ subscription: sub, plan: req.user.plan });
});

// POST /api/billing/cancel
export const cancel = asyncHandler(async (req, res) => {
  const sub = await Subscription.findOne({ userId: req.user._id });
  if (!sub?.stripeSubscriptionId) {
    return res.status(400).json({ error: "No active subscription found." });
  }
  await cancelSubscription(sub.stripeSubscriptionId);
  sub.cancelAtPeriodEnd = true;
  await sub.save();
  res.json({ message: "Subscription will cancel at the end of the billing period." });
});

// POST /api/billing/webhook — Stripe webhook handler (raw body)
export const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = constructWebhookEvent(req.body, sig);
  } catch (err) {
    console.error(`Webhook signature error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        if (!userId || !session.subscription) break;

        const stripeSub = await getSubscription(session.subscription);
        const priceId = stripeSub.items.data[0]?.price?.id;
        const plan = PRICE_TO_PLAN[priceId] || "pro";

        await User.findByIdAndUpdate(userId, { plan, stripeCustomerId: session.customer });

        await Subscription.findOneAndUpdate(
          { userId },
          {
            userId,
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            stripePriceId: priceId,
            plan,
            status: "active",
            currentPeriodStart: new Date(stripeSub.current_period_start * 1000),
            currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
            cancelAtPeriodEnd: false,
          },
          { upsert: true, new: true }
        );
        break;
      }

      case "customer.subscription.updated": {
        const stripeSub = event.data.object;
        const userId = stripeSub.metadata?.userId;
        if (!userId) break;

        const priceId = stripeSub.items.data[0]?.price?.id;
        const plan = PRICE_TO_PLAN[priceId] || "pro";
        const status = stripeSub.status;

        await User.findByIdAndUpdate(userId, {
          plan: status === "active" ? plan : "free",
        });

        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: stripeSub.id },
          {
            status,
            plan,
            currentPeriodStart: new Date(stripeSub.current_period_start * 1000),
            currentPeriodEnd: new Date(stripeSub.current_period_end * 1000),
            cancelAtPeriodEnd: stripeSub.cancel_at_period_end,
          }
        );
        break;
      }

      case "customer.subscription.deleted": {
        const stripeSub = event.data.object;
        const userId = stripeSub.metadata?.userId;
        if (!userId) break;

        await User.findByIdAndUpdate(userId, { plan: "free" });
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: stripeSub.id },
          { status: "canceled", canceledAt: new Date(), plan: "free" }
        );
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: invoice.subscription },
          { status: "past_due" }
        );
        break;
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    res.status(500).json({ error: "Webhook processing failed." });
  }
};
