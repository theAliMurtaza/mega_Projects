export default function ClassicTemplate({ resume }) {
  const p = resume.personal || {};
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.website].filter(Boolean);
  const allSkills = [resume.skills?.technical, resume.skills?.soft]
    .filter(Boolean).join(", ").split(",").map((s) => s.trim()).filter(Boolean);

  const SH = ({ title }) => (
    <h2 className="text-[11px] font-bold uppercase tracking-[1.5px] text-gray-800 border-b border-gray-400 pb-1 mb-2 mt-4">{title}</h2>
  );

  return (
    <div className="bg-white text-gray-900 px-12 py-9 font-serif text-[13px] leading-relaxed min-h-[1000px]">
      <div className="text-center border-b-2 border-gray-900 pb-3 mb-4">
        <h1 className="text-[28px] font-bold tracking-wide uppercase">{p.name || "YOUR NAME"}</h1>
        {p.jobTitle && <div className="text-[13px] text-gray-600 mt-1 italic">{p.jobTitle}</div>}
        {contacts.length > 0 && <p className="text-[11px] text-gray-500 mt-2">{contacts.join(" • ")}</p>}
      </div>

      {resume.summary && (<><SH title="Professional Summary" /><p className="text-gray-700 leading-relaxed">{resume.summary}</p></>)}

      {resume.experience?.length > 0 && (<><SH title="Experience" />{resume.experience.map((exp, i) => (
        <div key={i} className="mb-3">
          <div className="flex justify-between items-baseline"><strong>{exp.title}</strong><span className="text-[11px] text-gray-500">{exp.start} – {exp.current ? "Present" : exp.end}</span></div>
          <div className="text-[12px] text-gray-500">{exp.company}{exp.location ? `, ${exp.location}` : ""}</div>
          {exp.description && <div className="text-[12px] text-gray-700 mt-1 whitespace-pre-wrap">{exp.description}</div>}
        </div>
      ))}</>)}

      {resume.education?.length > 0 && (<><SH title="Education" />{resume.education.map((edu, i) => (
        <div key={i} className="flex justify-between mb-1.5">
          <div><strong>{edu.degree}</strong>{edu.institution && <span className="text-gray-600"> — {edu.institution}</span>}{edu.gpa && <span className="text-gray-500 text-[11px]"> | GPA: {edu.gpa}</span>}</div>
          <span className="text-[11px] text-gray-500 shrink-0 ml-4">{edu.year}</span>
        </div>
      ))}</>)}

      {resume.projects?.length > 0 && (<><SH title="Projects" />{resume.projects.map((proj, i) => (
        <div key={i} className="mb-2"><strong>{proj.name}</strong>{proj.tech && <span className="text-gray-500 text-[11px]"> ({proj.tech})</span>}{proj.description && <div className="text-[12px] text-gray-700 mt-0.5">{proj.description}</div>}</div>
      ))}</>)}

      {allSkills.length > 0 && (<><SH title="Skills" /><p className="text-gray-700">{allSkills.join(" • ")}</p></>)}

      {resume.languages?.length > 0 && (<><SH title="Languages" /><p className="text-gray-700">{resume.languages.map((l) => `${l.language} (${l.proficiency})`).join(" • ")}</p></>)}

      {resume.hobbies && (<><SH title="Hobbies & Interests" /><p className="text-gray-700">{resume.hobbies}</p></>)}
    </div>
  );
}
