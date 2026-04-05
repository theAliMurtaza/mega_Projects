import { resumeAPI } from "../services/resume.api.js";

// Download Word .docx for a saved resume (calls server docx endpoint — Pro only)
export const downloadWord = async (resumeId) => {
  await resumeAPI.downloadDOCX(resumeId);
};
