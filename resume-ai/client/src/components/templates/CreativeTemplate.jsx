export default function CreativeTemplate({ resume }) {
  const p = resume.personal || {};
  const allSkills = [resume.skills?.technical, resume.skills?.soft].filter(Boolean).join(", ").split(",").map(s=>s.trim()).filter(Boolean);
  const initials = (p.name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  const SH = ({title}) => <h2 className="text-[9px] font-bold text-[#8b2fc9] uppercase tracking-[2px] border-b-2 border-[#8b2fc9] pb-1 mb-2.5 mt-4">{title}</h2>;
  return (
    <div className="bg-white flex font-sans text-[12px] min-h-[1000px]">
      <div className="w-[210px] min-w-[210px] text-white px-5 py-7" style={{background:"linear-gradient(180deg,#4a0e6b,#8b2fc9)"}}>
        {p.profilePhoto ? <img src={p.profilePhoto} alt="" className="w-16 h-16 rounded-full object-cover border-4 border-white/20 mb-3"/> : <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold mb-4">{initials}</div>}
        <h1 className="text-[17px] font-bold leading-tight mb-0.5">{p.name||"Your Name"}</h1>
        {p.jobTitle&&<div className="text-[10px] text-purple-200 mb-3">{p.jobTitle}</div>}
        <div className="mt-3 mb-5"><h3 className="text-[8px] text-purple-300 uppercase tracking-[1.5px] mb-2">Contact</h3>{[p.email,p.phone,p.location].filter(Boolean).map((c,i)=><p key={i} className="text-purple-100 text-[10px] mb-1 break-all">{c}</p>)}</div>
        {allSkills.length>0&&<div className="mb-4"><h3 className="text-[8px] text-purple-300 uppercase tracking-[1.5px] mb-2">Skills</h3>{allSkills.slice(0,12).map((s,i)=><div key={i} className="bg-white/15 rounded-xl px-2 py-0.5 text-[10px] text-white mb-1">{s}</div>)}</div>}
        {resume.languages?.length>0&&<div className="mb-4"><h3 className="text-[8px] text-purple-300 uppercase tracking-[1.5px] mb-2">Languages</h3>{resume.languages.map((l,i)=><div key={i} className="text-purple-100 text-[10px] mb-1">{l.language} <span className="text-purple-300 text-[9px]">{l.proficiency}</span></div>)}</div>}
        {resume.hobbies&&<div><h3 className="text-[8px] text-purple-300 uppercase tracking-[1.5px] mb-2">Interests</h3><p className="text-purple-100 text-[10px]">{resume.hobbies}</p></div>}
      </div>
      <div className="flex-1 px-6 py-7">
        {resume.summary&&<div className="bg-purple-50 rounded-lg px-4 py-3 mb-4"><p className="text-[12px] text-purple-900 italic leading-relaxed">{resume.summary}</p></div>}
        {resume.experience?.length>0&&<><SH title="Experience"/>{resume.experience.map((exp,i)=><div key={i} className="mb-3.5"><div className="flex justify-between items-center"><strong>{exp.title}</strong><span className="bg-purple-50 text-[#8b2fc9] text-[10px] px-2 py-0.5 rounded-full shrink-0 ml-2">{exp.start} – {exp.current?"Now":exp.end}</span></div><div className="text-[11px] text-[#8b2fc9]">{exp.company}</div>{exp.description&&<div className="text-[11px] text-gray-600 mt-1 whitespace-pre-wrap">{exp.description}</div>}</div>)}</>}
        {resume.education?.length>0&&<><SH title="Education"/>{resume.education.map((edu,i)=><div key={i} className="flex justify-between mb-2"><span><strong>{edu.degree}</strong><span className="text-gray-500"> · {edu.institution}</span></span><span className="text-[10px] text-gray-400 shrink-0 ml-2">{edu.year}</span></div>)}</>}
        {resume.projects?.length>0&&<><SH title="Projects"/>{resume.projects.map((proj,i)=><div key={i} className="mb-2"><strong>{proj.name}</strong>{proj.tech&&<span className="text-gray-400 text-[10px] ml-1">· {proj.tech}</span>}{proj.description&&<div className="text-[11px] text-gray-600 mt-0.5">{proj.description}</div>}</div>)}</>}
      </div>
    </div>
  );
}
