import Analysis from "../models/Analysis.js";
import Resume from "../models/Resume.js";
import { analyzeResume, analyzeJobMatch, getFieldSuggestion } from "../services/gemini.service.js";
import { resumeToText } from "../utils/resumeToText.js";
import { asyncHandler } from "../middleware/error.middleware.js";
import pdfParse from "pdf-parse";
import { handleUpload } from "../middleware/upload.middleware.js";

// POST /api/analysis/general
export const generalAnalysis = asyncHandler(async (req, res) => {
  const { resumeText, resumeId } = req.body;

  let text = resumeText;
  let linkedResumeId = null;

  if (resumeId) {
    const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
    if (!resume) return res.status(404).json({ error: "Resume not found." });
    text = resumeToText(resume.toObject());
    linkedResumeId = resume._id;
  }

  if (!text?.trim()) return res.status(400).json({ error: "Resume text is required." });

  const result = await analyzeResume(text);

  const analysis = await Analysis.create({
    userId: req.user._id,
    resumeId: linkedResumeId,
    type: "general",
    score: result.score,
    metrics: result.metrics,
    feedback: result.feedback,
    strengths: result.strengths,
    improvements: result.improvements,
    resumeTextSnapshot: text,
  });

  if (linkedResumeId) {
    await Resume.findByIdAndUpdate(linkedResumeId, { lastScore: result.score });
  }

  res.json({ analysis: { ...result, _id: analysis._id, createdAt: analysis.createdAt } });
});

// POST /api/analysis/match
export const jobMatchAnalysis = asyncHandler(async (req, res) => {
  const { resumeText, resumeId, jobDescription } = req.body;

  if (!jobDescription?.trim()) return res.status(400).json({ error: "Job description is required." });

  let text = resumeText;
  let linkedResumeId = null;

  if (resumeId) {
    const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
    if (!resume) return res.status(404).json({ error: "Resume not found." });
    text = resumeToText(resume.toObject());
    linkedResumeId = resume._id;
  }

  if (!text?.trim()) return res.status(400).json({ error: "Resume text is required." });

  const result = await analyzeJobMatch(text, jobDescription);

  const analysis = await Analysis.create({
    userId: req.user._id,
    resumeId: linkedResumeId,
    type: "job_match",
    matchScore: result.matchScore,
    matchMetrics: result.metrics,
    matchedKeywords: result.matched,
    missingKeywords: result.missing,
    tailoringTips: result.tips,
    feedback: result.feedback,
    resumeTextSnapshot: text,
    jobDescriptionSnapshot: jobDescription,
  });

  res.json({ analysis: { ...result, _id: analysis._id, createdAt: analysis.createdAt } });
});

// POST /api/analysis/upload
export const uploadAndAnalyze = asyncHandler(async (req, res) => {
  await handleUpload(req, res);

  if (!req.file) return res.status(400).json({ error: "No file uploaded." });

  let text = "";
  const mime = req.file.mimetype;

  if (mime === "application/pdf") {
    const parsed = await pdfParse(req.file.buffer);
    text = parsed.text;
  } else if (mime === "text/plain") {
    text = req.file.buffer.toString("utf-8");
  } else {
    return res.status(400).json({ error: "Only PDF and TXT files are supported for text extraction." });
  }

  if (!text.trim()) return res.status(422).json({ error: "Could not extract text from the uploaded file." });

  res.json({ resumeText: text.slice(0, 15000) });
});

// POST /api/analysis/suggest
export const aiSuggest = asyncHandler(async (req, res) => {
  const { field, context, currentValue } = req.body;
  if (!field) return res.status(400).json({ error: "Field name is required." });

  const suggestion = await getFieldSuggestion(field, context || "", currentValue || "");
  res.json({ suggestion });
});

// GET /api/analysis
export const getAnalyses = asyncHandler(async (req, res) => {
  const analyses = await Analysis.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50)
    .select("-resumeTextSnapshot -jobDescriptionSnapshot");
  res.json({ analyses });
});
