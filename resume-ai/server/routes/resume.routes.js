import { Router } from "express";
import {
  getResumes, getResume, createResume, updateResume, deleteResume,
  downloadPDF, downloadDOCX,
} from "../controllers/resume.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { requirePremium } from "../middleware/premium.middleware.js";
import { validate, resumeSchema } from "../utils/validators.js";

const router = Router();

router.use(protect); // all resume routes require auth

router.get("/", getResumes);
router.post("/", validate(resumeSchema), createResume);
router.get("/:id", getResume);
router.put("/:id", validate(resumeSchema), updateResume);
router.delete("/:id", deleteResume);

router.get("/:id/pdf", downloadPDF);
router.get("/:id/docx", requirePremium, downloadDOCX); // Word export = Pro only

export default router;
