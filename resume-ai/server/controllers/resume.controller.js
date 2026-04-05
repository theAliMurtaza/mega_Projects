import Resume from "../models/Resume.js";
import { asyncHandler } from "../middleware/error.middleware.js";
import { generatePDF } from "../services/pdf.service.js";
import { generateDOCX } from "../services/docx.service.js";

/**
 * Strip client-generated _id fields from all subdocuments so MongoDB
 * generates proper ObjectIds instead of receiving timestamp strings like
 * "1775100861789" which cause CastError: Cast to ObjectId failed.
 */
const sanitizeSubdocs = (body) => {
  const clean = { ...body };

  const stripIds = (arr) =>
    Array.isArray(arr)
      ? arr.map(({ _id, id, ...rest }) => rest)   // remove _id and id
      : arr;

  if (clean.experience) clean.experience = stripIds(clean.experience);
  if (clean.education)  clean.education  = stripIds(clean.education);
  if (clean.projects)   clean.projects   = stripIds(clean.projects);
  if (clean.languages)  clean.languages  = stripIds(clean.languages);

  return clean;
};

// GET /api/resumes
export const getResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
  res.json({ resumes });
});

// GET /api/resumes/:id
export const getResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
  if (!resume) return res.status(404).json({ error: "Resume not found." });
  res.json({ resume });
});

// POST /api/resumes
export const createResume = asyncHandler(async (req, res) => {
  const data = sanitizeSubdocs(req.body);
  const resume = await Resume.create({ ...data, userId: req.user._id });
  res.status(201).json({ resume });
});

// PUT /api/resumes/:id
export const updateResume = asyncHandler(async (req, res) => {
  const data = sanitizeSubdocs(req.body);

  // Use $set so we replace the whole document body but keep userId & timestamps
  const resume = await Resume.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { $set: data },
    { new: true, runValidators: true, overwrite: false }
  );

  if (!resume) return res.status(404).json({ error: "Resume not found." });
  res.json({ resume });
});

// DELETE /api/resumes/:id
export const deleteResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!resume) return res.status(404).json({ error: "Resume not found." });
  res.json({ message: "Resume deleted." });
});

// GET /api/resumes/:id/pdf
export const downloadPDF = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
  if (!resume) return res.status(404).json({ error: "Resume not found." });

  const pdfBuffer = await generatePDF(resume.toObject());
  const filename = `${(resume.personal?.name || "resume").replace(/\s+/g, "_")}_resume.pdf`;

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Content-Length": pdfBuffer.length,
  });
  res.send(pdfBuffer);
});

// GET /api/resumes/:id/docx — Pro only
export const downloadDOCX = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
  if (!resume) return res.status(404).json({ error: "Resume not found." });

  const docxBuffer = await generateDOCX(resume.toObject());
  const filename = `${(resume.personal?.name || "resume").replace(/\s+/g, "_")}_resume.docx`;

  res.set({
    "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Content-Length": docxBuffer.length,
  });
  res.send(docxBuffer);
});
