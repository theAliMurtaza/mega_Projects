export default function TechTemplate({ resume }) {
  const p = resume.personal || {};
  const allSkills = [resume.skills?.technical, resume.skills?.soft].filter(Boolean).join(", ").split(",").map(s=>s.trim()).filter(Boolean);
  return (
    <div className="bg-[#0a2540] text-[#a8c7e8] px-10 py-8 font-mono text-[11.5px] leading-relaxed min-h-[1000px]">
      <div className="border-b border-[#1e4060] pb-5 mb-5">
        <div><span className="text-[#4fc3f7]">const</span> <span className="text-[#81d4fa]">resume</span> <span className="text-white">=</span> <span className="text-[#4fc3f7]">{"{"}</span></div>
        <div className="ml-5">
          <div><span className="text-[#a8c7e8]">name: </span><span className="text-[#a5d6a7]">"{p.name||""}"</span>,</div>
          {p.jobTitle&&<div><span className="text-[#a8c7e8]">role: </span><span className="text-[#a5d6a7]">"{p.jobTitle}"</span>,</div>}
          <div><span className="text-[#a8c7e8]">email: </span><span className="text-[#a5d6a7]">"{p.email||""}"</span>,</div>
          <div><span className="text-[#a8c7e8]">location: </span><span className="text-[#a5d6a7]">"{p.location||""}"</span></div>
        </div>
        <span className="text-[#4fc3f7]">{"}"}</span>
      </div>
      {resume.summary&&<div className="mb-5"><div className="text-[#4fc3f7]">{"/**"}</div><div className="text-[#78909c] ml-1"> * {resume.summary}</div><div className="text-[#4fc3f7]">{" */"}</div></div>}
      {resume.experience?.length>0&&<div className="mb-5"><div className="text-[#4fc3f7] mb-2.5">{"// EXPERIENCE"}</div>{resume.experience.map((exp,i)=><div key={i} className="mb-3 bg-[#0d2d4a] border-l-[3px] border-[#4fc3f7] rounded-r px-3.5 py-2.5"><div><span className="text-[#81d4fa] font-bold">{exp.title}</span> <span className="text-[#78909c]">@ {exp.company}</span> <span className="text-[#546e7a] text-[10px]">{exp.start}–{exp.current?"present":exp.end}</span></div>{exp.description&&<div className="text-[#a8c7e8] mt-1.5 whitespace-pre-wrap">{exp.description}</div>}</div>)}</div>}
      {resume.education?.length>0&&<div className="mb-5"><div className="text-[#4fc3f7] mb-2.5">{"// EDUCATION"}</div>{resume.education.map((edu,i)=><div key={i} className="bg-[#0d2d4a] rounded px-3.5 py-2 mb-1.5"><span className="text-[#81d4fa]">{edu.degree}</span><span className="text-[#78909c]"> · </span><span className="text-[#a8c7e8]">{edu.institution}</span><span className="text-[#546e7a] text-[10px] ml-2">{edu.year}</span></div>)}</div>}
      {resume.projects?.length>0&&<div className="mb-5"><div className="text-[#4fc3f7] mb-2.5">{"// PROJECTS"}</div>{resume.projects.map((proj,i)=><div key={i} className="mb-2"><span className="text-[#81d4fa] font-bold">{proj.name}</span>{proj.tech&&<span className="text-[#546e7a] text-[10px] ml-1.5">({proj.tech})</span>}{proj.description&&<div className="text-[#a8c7e8] text-[11px] mt-0.5">{proj.description}</div>}</div>)}</div>}
      {allSkills.length>0&&<div className="mb-5"><div className="text-[#4fc3f7] mb-2.5">{"// SKILLS"}</div><div className="flex flex-wrap gap-1.5">{allSkills.map((s,i)=><span key={i} className="bg-[#0d2d4a] border border-[#1e4a70] text-[#4fc3f7] px-2.5 py-0.5 rounded text-[10px]">{s}</span>)}</div></div>}
      {resume.languages?.length>0&&<div className="mb-5"><div className="text-[#4fc3f7] mb-2.5">{"// LANGUAGES"}</div><div className="flex flex-wrap gap-1.5">{resume.languages.map((l,i)=><span key={i} className="bg-[#0d2d4a] border border-[#1e4a70] text-[#a5d6a7] px-2.5 py-0.5 rounded text-[10px]">{l.language}: {l.proficiency}</span>)}</div></div>}
      {resume.hobbies&&<div><div className="text-[#4fc3f7] mb-2.5">{"// INTERESTS"}</div><p className="text-[#78909c]">{resume.hobbies}</p></div>}
    </div>
  );
}
