export default function MinimalTemplate({ resume }) {
  const p = resume.personal || {};
  const allSkills = [resume.skills?.technical, resume.skills?.soft].filter(Boolean).join(" · ");
  const Divider = () => <div className="border-t border-gray-100 my-5" />;
  return (
    <div className="bg-white px-14 py-12 font-sans text-[12px] text-gray-800 leading-relaxed min-h-[1000px]">
      <h1 className="text-[32px] font-light text-gray-900 tracking-tight mb-0.5">{p.name||"Your Name"}</h1>
      {p.jobTitle&&<div className="text-[13px] text-gray-500 italic mb-1">{p.jobTitle}</div>}
      <p className="text-[11px] text-gray-400 mb-9 tracking-wide">{[p.email,p.phone,p.location].filter(Boolean).join("  ·  ")}</p>
      {resume.summary&&<p className="text-[13px] text-gray-500 italic leading-[1.7] mb-8">"{resume.summary}"</p>}
      {resume.experience?.length>0&&<div className="mb-7">{resume.experience.map((exp,i)=><div key={i} className="mb-5"><div className="flex justify-between items-baseline"><span className="font-semibold text-[13px]">{exp.title}<span className="font-light text-gray-500"> @ {exp.company}</span></span><span className="text-[10px] text-gray-300 shrink-0 ml-4">{exp.start} – {exp.current?"Present":exp.end}</span></div>{exp.description&&<div className="text-[11px] text-gray-500 mt-1 whitespace-pre-wrap">{exp.description}</div>}</div>)}</div>}
      {resume.education?.length>0&&<><Divider/>{resume.education.map((edu,i)=><div key={i} className="flex justify-between mb-2"><span>{edu.degree}<span className="text-gray-400"> — {edu.institution}</span></span><span className="text-[10px] text-gray-300 shrink-0 ml-4">{edu.year}</span></div>)}</>}
      {resume.projects?.length>0&&<><Divider/>{resume.projects.map((proj,i)=><div key={i} className="mb-2"><span className="font-semibold">{proj.name}</span>{proj.tech&&<span className="text-gray-400 text-[10px] ml-1">· {proj.tech}</span>}{proj.description&&<div className="text-[11px] text-gray-500 mt-0.5">{proj.description}</div>}</div>)}</>}
      {allSkills&&<><Divider/><p className="text-[10px] text-gray-300 uppercase tracking-widest mb-2">Skills</p><p className="text-gray-500">{allSkills}</p></>}
      {resume.languages?.length>0&&<><Divider/><p className="text-[10px] text-gray-300 uppercase tracking-widest mb-2">Languages</p><p className="text-gray-500">{resume.languages.map(l=>`${l.language} (${l.proficiency})`).join("  ·  ")}</p></>}
      {resume.hobbies&&<><Divider/><p className="text-[10px] text-gray-300 uppercase tracking-widest mb-2">Interests</p><p className="text-gray-500">{resume.hobbies}</p></>}
    </div>
  );
}
