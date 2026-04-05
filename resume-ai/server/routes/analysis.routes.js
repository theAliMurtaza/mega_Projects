import { Router } from "express";
import {
  generalAnalysis, jobMatchAnalysis, uploadAndAnalyze,
  aiSuggest, getAnalyses,
} from "../controllers/analysis.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { checkAnalysisLimit } from "../middleware/premium.middleware.js";

const router = Router();

router.use(protect);

router.get("/", getAnalyses);
router.post("/general", checkAnalysisLimit, generalAnalysis);
router.post("/match", checkAnalysisLimit, jobMatchAnalysis);
router.post("/upload", uploadAndAnalyze);       // returns extracted text, no AI limit
router.post("/suggest", aiSuggest);              // per-field suggestions, no count limit

export default router;
