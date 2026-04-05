import { Router } from "express";
import { checkout, portal, getSubscriptionInfo, cancel, webhook } from "../controllers/billing.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Webhook uses raw body — registered BEFORE express.json() in server.js
router.post("/webhook", webhook);

// All other billing routes require auth
router.use(protect);

router.post("/checkout", checkout);
router.post("/portal", portal);
router.get("/subscription", getSubscriptionInfo);
router.post("/cancel", cancel);

export default router;
