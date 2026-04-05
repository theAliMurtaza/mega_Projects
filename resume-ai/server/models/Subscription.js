import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    stripeCustomerId: { type: String, required: true },
    stripeSubscriptionId: { type: String, default: null },
    stripePriceId: { type: String, default: null },
    plan: {
      type: String,
      enum: ["free", "pro", "pro_annual"],
      default: "free",
    },
    status: {
      type: String,
      enum: ["active", "canceled", "past_due", "unpaid", "trialing", "inactive"],
      default: "inactive",
    },
    currentPeriodStart: { type: Date, default: null },
    currentPeriodEnd: { type: Date, default: null },
    cancelAtPeriodEnd: { type: Boolean, default: false },
    canceledAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
