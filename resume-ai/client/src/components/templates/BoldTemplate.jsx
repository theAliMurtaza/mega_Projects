export default function BoldTemplate({ resume }) {
  const p = resume.personal || {};
  const allSkills = [resume.skills?.technical, resume.skills?.soft].filter(Boolean).join(", ").split(",").map(s=>s.trim()).filter(Boolean);
  const SH = ({title}) => <h2 className="text-[13px] font-bold text-[#1b4332] uppercase tracking-[2px] mb-3 mt-5">{title}</h2>;
  return (
    <div className="bg-white font-serif text-[12px] min-h-[1000px]">
      <div className="bg-[#1b4332] px-10 py-8">
        <h1 className="text-[32px] font-bold text-[#d4e9d8] tracking-tight">{p.name||"Your Name"}</h1>
        {p.jobTitle&&<div className="text-green-300 text-[12px] mt-0.5">{p.jobTitle}</div>}
        <p className="text-green-300 text-[11px] mt-2 tracking-wide">{[p.email,p.phone,p.location].filter(Boolean).join(" | ")}</p>
      </div>
      <div className="px-10 py-7">
        {resume.summary&&<div className="bg-[#f0f7f0] border-l-4 border-[#1b4332] px-4 py-3 mb-5"><p className="text-[13px] text-[#2d5a27] italic leading-relaxed">{resume.summary}</p></div>}
        {resume.experience?.length>0&&<><SH title="Experience"/>{resume.experience.map((exp,i)=><div key={i} className="mb-4"><div className="flex justify-between items-center"><strong className="text-[13px] text-gray-900">{exp.title}</strong><span className="bg-[#1b4332] text-white text-[9px] px-2 py-0.5 rounded-full">{exp.start} – {exp.current?"Now":exp.end}</span></div><div className="text-[12px] font-bold text-[#1b4332] mt-0.5">{exp.company}</div>{exp.description&&<div className="text-[12px] text-gray-600 mt-1 whitespace-pre-wrap">{exp.description}</div>}</div>)}</>}
        {resume.education?.length>0&&<><SH title="Education"/>{resume.education.map((edu,i)=><div key={i} className="flex justify-between mb-2"><span><strong>{edu.degree}</strong><span className="text-gray-500"> — {edu.institution}</span></span><span className="text-[10px] text-gray-400 shrink-0 ml-3">{edu.year}</span></div>)}</>}
        {resume.projects?.length>0&&<><SH title="Projects"/>{resume.projects.map((proj,i)=><div key={i} className="mb-2"><strong>{proj.name}</strong>{proj.tech&&<span className="text-gray-500 text-[11px] ml-1">({proj.tech})</span>}{proj.description&&<div className="text-[12px] text-gray-600 mt-0.5">{proj.description}</div>}</div>)}</>}
        {allSkills.length>0&&<><SH title="Skills"/><div className="flex flex-wrap gap-1.5">{allSkills.map((s,i)=><span key={i} className="bg-[#1b4332] text-[#d4e9d8] px-2.5 py-0.5 rounded text-[11px]">{s}</span>)}</div></>}
        {resume.languages?.length>0&&<><SH title="Languages"/><div className="flex flex-wrap gap-1.5">{resume.languages.map((l,i)=><span key={i} className="border border-[#1b4332] text-[#1b4332] px-2.5 py-0.5 rounded text-[11px]">{l.language} · {l.proficiency}</span>)}</div></>}
        {resume.hobbies&&<><SH title="Hobbies & Interests"/><p className="text-gray-600">{resume.hobbies}</p></>}
      </div>
    </div>
  );
}
