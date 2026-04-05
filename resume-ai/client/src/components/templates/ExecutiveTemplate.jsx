export default function ExecutiveTemplate({ resume }) {
  const p = resume.personal || {};
  const allSkills = [resume.skills?.technical, resume.skills?.soft].filter(Boolean).join(", ").split(",").map(s=>s.trim()).filter(Boolean);
  const SH = ({title}) => <h2 className="text-[10px] font-bold text-[#7c4a03] uppercase tracking-[2px] mb-3.5 mt-5">{title}</h2>;
  return (
    <div className="bg-[#fefcf7] border border-[#e8d5a3] font-serif text-[12px] min-h-[1000px]">
      <div className="bg-[#7c4a03] px-11 py-9">
        <h1 className="text-[29px] font-bold text-[#fef3e2] tracking-wide">{p.name||"Your Name"}</h1>
        {p.jobTitle&&<div className="text-[#e8c98a] text-[12px] mt-0.5">{p.jobTitle}</div>}
        <div className="h-0.5 w-14 bg-[#d4af7a] my-3"/>
        <p className="text-[#e8c98a] text-[11px]">{[p.email,p.phone,p.location,p.linkedin].filter(Boolean).join(" · ")}</p>
      </div>
      <div className="px-11 py-8">
        {resume.summary&&<div className="border-b border-[#e8d5a3] pb-5 mb-1"><p className="text-[13px] text-[#5c3d1e] italic leading-[1.7]">{resume.summary}</p></div>}
        {resume.experience?.length>0&&<><SH title="Career History"/>{resume.experience.map((exp,i)=><div key={i} className="mb-4 pl-4 border-l-[3px] border-[#d4af7a]"><div className="flex justify-between items-baseline"><strong className="text-[13px] text-[#2d1a00]">{exp.title}</strong><span className="text-[10px] text-gray-400 shrink-0 ml-3">{exp.start} – {exp.current?"Present":exp.end}</span></div><div className="text-[11px] font-bold text-[#7c4a03] mt-0.5">{exp.company}{exp.location?`, ${exp.location}`:""}</div>{exp.description&&<div className="text-[12px] text-gray-600 mt-1 leading-relaxed whitespace-pre-wrap">{exp.description}</div>}</div>)}</>}
        {resume.education?.length>0&&<><SH title="Education"/>{resume.education.map((edu,i)=><div key={i} className="flex justify-between mb-2"><span><strong>{edu.degree}</strong><span className="text-gray-500"> · {edu.institution}</span></span><span className="text-[10px] text-gray-400 shrink-0 ml-3">{edu.year}</span></div>)}</>}
        {resume.projects?.length>0&&<><SH title="Projects"/>{resume.projects.map((proj,i)=><div key={i} className="mb-2"><strong>{proj.name}</strong>{proj.tech&&<span className="text-gray-500 text-[10px] ml-1">· {proj.tech}</span>}{proj.description&&<div className="text-[12px] text-gray-600 mt-0.5">{proj.description}</div>}</div>)}</>}
        {allSkills.length>0&&<><SH title="Competencies"/><div className="flex flex-wrap gap-1.5">{allSkills.map((s,i)=><span key={i} className="border border-[#d4af7a] text-[#7c4a03] px-2.5 py-0.5 rounded text-[11px]">{s}</span>)}</div></>}
        {resume.languages?.length>0&&<><SH title="Languages"/><p className="text-gray-600">{resume.languages.map(l=>`${l.language} (${l.proficiency})`).join(" · ")}</p></>}
        {resume.hobbies&&<><SH title="Interests"/><p className="text-gray-600">{resume.hobbies}</p></>}
      </div>
    </div>
  );
}
