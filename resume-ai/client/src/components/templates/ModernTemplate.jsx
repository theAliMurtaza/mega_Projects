export default function ModernTemplate({ resume }) {
  const p = resume.personal || {};
  const allSkills = [resume.skills?.technical, resume.skills?.soft]
    .filter(Boolean).join(", ").split(",").map((s) => s.trim()).filter(Boolean);
  const SH = ({ title }) => (<h2 className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#0f3460] border-b border-[#0f3460] pb-1 mb-2.5 mt-4">{title}</h2>);
  return (
    <div className="bg-white flex min-h-[1000px] font-sans text-[12px]">
      <div className="w-[220px] min-w-[220px] bg-[#0f3460] text-white px-5 py-8">
        {p.profilePhoto ? <img src={p.profilePhoto} alt="" className="w-20 h-20 rounded-full object-cover border-4 border-white/20 mb-4" /> : null}
        <h1 className="text-[19px] font-bold leading-tight mb-0.5">{p.name || "Your Name"}</h1>
        {p.jobTitle && <div className="text-[10px] text-blue-200 mb-4">{p.jobTitle}</div>}
        <div className="h-0.5 w-10 bg-blue-300 mb-5" />
        <div className="mb-5">
          <h3 className="text-[9px] text-blue-300 uppercase tracking-widest border-b border-blue-800 pb-1 mb-2">Contact</h3>
          {[p.email,p.phone,p.location,p.linkedin,p.website].filter(Boolean).map((c,i)=><p key={i} className="text-blue-100 text-[10px] mb-1 break-all">{c}</p>)}
        </div>
        {allSkills.length>0&&<div className="mb-5"><h3 className="text-[9px] text-blue-300 uppercase tracking-widest border-b border-blue-800 pb-1 mb-2">Skills</h3>{allSkills.map((s,i)=><div key={i} className="bg-blue-900 rounded px-2 py-0.5 text-[10px] text-blue-100 mb-1">{s}</div>)}</div>}
        {resume.languages?.length>0&&<div className="mb-5"><h3 className="text-[9px] text-blue-300 uppercase tracking-widest border-b border-blue-800 pb-1 mb-2">Languages</h3>{resume.languages.map((l,i)=><div key={i} className="text-blue-100 text-[10px] mb-1">{l.language} <span className="text-blue-300">· {l.proficiency}</span></div>)}</div>}
        {resume.hobbies&&<div><h3 className="text-[9px] text-blue-300 uppercase tracking-widest border-b border-blue-800 pb-1 mb-2">Interests</h3><p className="text-blue-100 text-[10px]">{resume.hobbies}</p></div>}
      </div>
      <div className="flex-1 px-7 py-8">
        {resume.summary&&<><SH title="Summary"/><p className="text-gray-600 leading-relaxed">{resume.summary}</p></>}
        {resume.experience?.length>0&&<><SH title="Experience"/>{resume.experience.map((exp,i)=><div key={i} className="mb-3 pl-3 border-l-2 border-[#0f3460]"><div className="flex justify-between items-baseline"><strong>{exp.title}</strong><span className="text-[10px] text-gray-400 shrink-0 ml-3">{exp.start} – {exp.current?"Present":exp.end}</span></div><div className="text-[11px] text-[#0f3460] font-medium">{exp.company}</div>{exp.description&&<div className="text-[11px] text-gray-600 mt-1 whitespace-pre-wrap">{exp.description}</div>}</div>)}</>}
        {resume.education?.length>0&&<><SH title="Education"/>{resume.education.map((edu,i)=><div key={i} className="flex justify-between mb-2"><div><strong>{edu.degree}</strong><span className="text-gray-500"> — {edu.institution}</span>{edu.gpa&&<span className="text-gray-400 text-[10px] ml-1">| GPA: {edu.gpa}</span>}</div><span className="text-[10px] text-gray-400 shrink-0 ml-3">{edu.year}</span></div>)}</>}
        {resume.projects?.length>0&&<><SH title="Projects"/>{resume.projects.map((proj,i)=><div key={i} className="mb-2"><strong>{proj.name}</strong>{proj.tech&&<span className="text-[#0f3460] text-[10px] ml-1">· {proj.tech}</span>}{proj.description&&<div className="text-[11px] text-gray-600 mt-0.5">{proj.description}</div>}</div>)}</>}
      </div>
    </div>
  );
}
