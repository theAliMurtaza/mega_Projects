import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ── Create or retrieve Stripe customer ───────────────────────────────────────
export const getOrCreateCustomer = async (user) => {
  if (user.stripeCustomerId) {
    return await stripe.customers.retrieve(user.stripeCustomerId);
  }
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: { userId: user._id.toString() },
  });
  user.stripeCustomerId = customer.id;
  await user.save();
  return customer;
};

// ── Create Stripe Checkout session ───────────────────────────────────────────
export const createCheckoutSession = async ({ user, priceId, planName }) => {
  const customer = await getOrCreateCustomer(user);

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.CLIENT_URL}/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/billing?canceled=true`,
    metadata: { userId: user._id.toString(), planName },
    subscription_data: {
      metadata: { userId: user._id.toString() },
    },
  });

  return session;
};

// ── Create billing portal session (manage subscription) ──────────────────────
export const createPortalSession = async (stripeCustomerId) => {
  return await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.CLIENT_URL}/billing`,
  });
};

// ── Construct webhook event ───────────────────────────────────────────────────
export const constructWebhookEvent = (payload, signature) =>
  stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);

// ── Retrieve subscription ─────────────────────────────────────────────────────
export const getSubscription = async (subscriptionId) =>
  await stripe.subscriptions.retrieve(subscriptionId);

// ── Cancel subscription ───────────────────────────────────────────────────────
export const cancelSubscription = async (subscriptionId) =>
  await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });

export default stripe;
