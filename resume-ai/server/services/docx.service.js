import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle,
} from "docx";

export const generateDOCX = async (resume) => {
  const p = resume.personal || {};

  const heading = (text) =>
    new Paragraph({
      text,
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      border: { bottom: { color: "999999", space: 1, style: BorderStyle.SINGLE, size: 6 } },
    });

  const bullet = (text) =>
    new Paragraph({
      bullet: { level: 0 },
      children: [new TextRun({ text, size: 22 })],
      spacing: { after: 60 },
    });

  const plain = (text, opts = {}) =>
    new Paragraph({
      children: [new TextRun({ text, size: 22, ...opts })],
      spacing: { after: 80 },
    });

  const children = [];

  // ── Header ────────────────────────────────────────────────────────────────
  children.push(new Paragraph({
    children: [new TextRun({ text: p.name || "Your Name", bold: true, size: 52 })],
    alignment: AlignmentType.CENTER, spacing: { after: 60 },
  }));

  if (p.jobTitle) {
    children.push(new Paragraph({
      children: [new TextRun({ text: p.jobTitle, size: 26, color: "555555", italics: true })],
      alignment: AlignmentType.CENTER, spacing: { after: 100 },
    }));
  }

  const contacts = [p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean);
  if (contacts.length) {
    children.push(new Paragraph({
      children: [new TextRun({ text: contacts.join("  |  "), size: 20, color: "666666" })],
      alignment: AlignmentType.CENTER, spacing: { after: 300 },
    }));
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  if (resume.summary) {
    children.push(heading("Professional Summary"));
    children.push(plain(resume.summary, { italics: true }));
  }

  // ── Experience ────────────────────────────────────────────────────────────
  if (resume.experience?.length) {
    children.push(heading("Work Experience"));
    resume.experience.forEach((exp) => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: exp.title || "", bold: true, size: 24 }),
          new TextRun({ text: exp.company ? `  —  ${exp.company}` : "", size: 22, color: "444444" }),
        ],
        spacing: { before: 120, after: 60 },
      }));
      children.push(new Paragraph({
        children: [new TextRun({
          text: `${exp.start || ""} – ${exp.current ? "Present" : exp.end || ""}${exp.location ? "  ·  " + exp.location : ""}`,
          size: 20, color: "888888",
        })],
        spacing: { after: 80 },
      }));
      if (exp.description) {
        exp.description.split("\n").filter(Boolean).forEach((line) => {
          children.push(bullet(line.replace(/^[•\-]\s*/, "")));
        });
      }
    });
  }

  // ── Education ─────────────────────────────────────────────────────────────
  if (resume.education?.length) {
    children.push(heading("Education"));
    resume.education.forEach((edu) => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: edu.degree || "", bold: true, size: 24 }),
          new TextRun({ text: edu.institution ? `  —  ${edu.institution}` : "", size: 22, color: "444444" }),
          new TextRun({ text: edu.year ? `  (${edu.year})` : "", size: 20, color: "888888" }),
          ...(edu.gpa ? [new TextRun({ text: `  |  GPA: ${edu.gpa}`, size: 20, color: "666666" })] : []),
        ],
        spacing: { before: 100, after: 120 },
      }));
    });
  }

  // ── Projects ──────────────────────────────────────────────────────────────
  if (resume.projects?.length) {
    children.push(heading("Projects"));
    resume.projects.forEach((proj) => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: proj.name || "", bold: true, size: 24 }),
          proj.tech ? new TextRun({ text: `  ·  ${proj.tech}`, size: 20, color: "666666" }) : new TextRun(""),
        ],
        spacing: { before: 100, after: 60 },
      }));
      if (proj.description) children.push(bullet(proj.description));
      if (proj.url) {
        children.push(plain(proj.url, { color: "0066CC" }));
      }
    });
  }

  // ── Skills ────────────────────────────────────────────────────────────────
  const skillLines = [
    resume.skills?.technical ? `Technical: ${resume.skills.technical}` : null,
    resume.skills?.soft      ? `Soft Skills: ${resume.skills.soft}`    : null,
  ].filter(Boolean);
  if (skillLines.length) {
    children.push(heading("Skills"));
    skillLines.forEach((line) => children.push(bullet(line)));
  }

  // ── Languages ─────────────────────────────────────────────────────────────
  if (resume.languages?.length) {
    children.push(heading("Languages"));
    resume.languages.forEach((lang) => {
      children.push(bullet(`${lang.language} — ${lang.proficiency}`));
    });
  }

  // ── Hobbies ───────────────────────────────────────────────────────────────
  if (resume.hobbies) {
    children.push(heading("Hobbies & Interests"));
    children.push(plain(resume.hobbies));
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
    styles: { default: { document: { run: { font: "Calibri", size: 22 } } } },
  });

  return await Packer.toBuffer(doc);
};
