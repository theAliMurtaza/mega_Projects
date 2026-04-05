export const resumeToText = (resume) => {
  const p = resume.personal || {};
  let text = "";
  if (p.name)     text += `Name: ${p.name}\n`;
  if (p.jobTitle) text += `Title: ${p.jobTitle}\n`;
  if (p.email)    text += `Email: ${p.email}\n`;
  if (p.phone)    text += `Phone: ${p.phone}\n`;
  if (p.location) text += `Location: ${p.location}\n`;
  if (p.linkedin) text += `LinkedIn: ${p.linkedin}\n`;
  if (p.website)  text += `Website: ${p.website}\n`;
  if (resume.summary) text += `\nPROFESSIONAL SUMMARY\n${resume.summary}\n`;
  if (resume.experience?.length) {
    text += `\nWORK EXPERIENCE\n`;
    resume.experience.forEach((e) => {
      text += `\n${e.title} at ${e.company}${e.location ? `, ${e.location}` : ""}\n`;
      text += `${e.start} – ${e.current ? "Present" : e.end}\n`;
      if (e.description) text += `${e.description}\n`;
    });
  }
  if (resume.education?.length) {
    text += `\nEDUCATION\n`;
    resume.education.forEach((e) => text += `${e.degree}, ${e.institution} (${e.year})${e.gpa ? ` | GPA: ${e.gpa}` : ""}\n`);
  }
  if (resume.skills?.technical) text += `\nTECHNICAL SKILLS: ${resume.skills.technical}\n`;
  if (resume.skills?.soft)      text += `SOFT SKILLS: ${resume.skills.soft}\n`;
  if (resume.languages?.length) text += `LANGUAGES: ${resume.languages.map(l => `${l.language} (${l.proficiency})`).join(", ")}\n`;
  if (resume.projects?.length) {
    text += `\nPROJECTS\n`;
    resume.projects.forEach((p) => { text += `\n${p.name}${p.tech ? ` (${p.tech})` : ""}\n`; if (p.description) text += `${p.description}\n`; });
  }
  if (resume.hobbies) text += `\nHOBBIES & INTERESTS: ${resume.hobbies}\n`;
  return text.trim();
};
