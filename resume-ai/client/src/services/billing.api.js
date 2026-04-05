import api from "./api.js";

export const billingAPI = {
  checkout: (priceId) => api.post("/billing/checkout", { priceId }),
  portal: () => api.post("/billing/portal"),
  getSubscription: () => api.get("/billing/subscription"),
  cancel: () => api.post("/billing/cancel"),
};
