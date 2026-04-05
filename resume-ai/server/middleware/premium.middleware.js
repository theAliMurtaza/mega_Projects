// Gate routes to Pro/Pro-Annual plan holders only
export const requirePremium = (req, res, next) => {
  const plan = req.user?.plan;
  if (plan === "pro" || plan === "pro_annual") return next();
  return res.status(403).json({
    error: "This feature requires a Pro plan.",
    upgradeUrl: "/billing",
  });
};

// Free tier allows 5 analyses/month — check and increment
export const checkAnalysisLimit = async (req, res, next) => {
  const user = req.user;
  if (user.plan === "pro" || user.plan === "pro_annual") return next();

  user.resetAnalysisCountIfNeeded();
  if (user.analysisCount >= 5) {
    return res.status(403).json({
      error: "Free plan limit: 5 analyses/month reached. Upgrade to Pro for unlimited.",
      upgradeUrl: "/billing",
    });
  }

  user.analysisCount += 1;
  await user.save();
  next();
};
