import { resumeAPI } from "../services/resume.api.js";

// Download PDF for a saved resume (calls server Puppeteer endpoint)
export const downloadPDF = async (resumeId) => {
  await resumeAPI.downloadPDF(resumeId);
};

// Client-side print-to-PDF fallback (for unsaved resumes using template HTML)
export const printPDF = (htmlContent, filename = "resume") => {
  const win = window.open("", "_blank");
  win.document.write(`<!DOCTYPE html>
<html>
  <head>
    <title>${filename}</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
      @page { margin: 0.5in; }
      body { margin: 0; }
    </style>
  </head>
  <body>${htmlContent}<script>window.onload = () => { window.print(); window.close(); }<\/script></body>
</html>`);
  win.document.close();
};
