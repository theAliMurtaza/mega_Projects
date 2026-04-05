export default function ElegantTemplate({ resume }) {
  const p = resume.personal || {};
  const allSkills = [resume.skills?.technical, resume.skills?.soft].filter(Boolean).join(" · ");
  const SH = ({title}) => <div className="text-center text-[11px] text-[#c4903a] uppercase tracking-[3px] my-4">{title}</div>;
  return (
    <div className="bg-[#fff9f0] border border-[#e8c98a] px-14 py-11 min-h-[1000px]" style={{fontFamily:"'Palatino Linotype',Palatino,serif",fontSize:"12px",color:"#2d1a00",lineHeight:"1.6"}}>
      <div className="text-center border-b border-[#d4af7a] pb-6 mb-6">
        <h1 style={{fontSize:"32px",fontWeight:400,color:"#3d1f00",letterSpacing:"2px",margin:0}}>{p.name||"Your Name"}</h1>
        {p.jobTitle&&<div className="text-[12px] text-[#8b6340] mt-1 italic">{p.jobTitle}</div>}
        {p.linkedin&&<div className="text-[11px] text-[#c4903a] mt-2.5 tracking-[3px] uppercase">{p.linkedin}</div>}
        <p className="text-[11px] text-[#8b6340] mt-2">{[p.email,p.phone,p.location].filter(Boolean).join("  ·  ")}</p>
      </div>
      {resume.summary&&<div className="text-center mb-6 px-4 py-4 border border-[#e8c98a] bg-[#fef8ee]"><p className="text-[13px] text-[#5c3d1e] italic leading-[1.8]">{resume.summary}</p></div>}
      {resume.experience?.length>0&&<><SH title="— Professional Experience —"/>{resume.experience.map((exp,i)=><div key={i} className="mb-4 pb-3.5 border-b border-dotted border-[#e8c98a]"><div className="flex justify-between items-baseline"><strong style={{fontSize:"13px",color:"#2d1a00"}}>{exp.title}</strong><em className="text-[10px] text-[#9b7040]">{exp.start} – {exp.current?"Present":exp.end}</em></div><div className="text-[11px] font-bold text-[#c4903a] mt-0.5">{exp.company}{exp.location?`, ${exp.location}`:""}</div>{exp.description&&<div className="text-[12px] text-[#5c4030] mt-1.5 leading-relaxed whitespace-pre-wrap">{exp.description}</div>}</div>)}</>}
      {resume.education?.length>0&&<><SH title="— Education —"/>{resume.education.map((edu,i)=><div key={i} className="text-center mb-2.5"><strong>{edu.degree}</strong><span className="text-[#8b6340]"> · </span><em>{edu.institution}</em><span className="text-[10px] text-gray-400 ml-1.5">{edu.year}</span></div>)}</>}
      {resume.projects?.length>0&&<><SH title="— Projects —"/>{resume.projects.map((proj,i)=><div key={i} className="mb-2.5 text-center"><strong>{proj.name}</strong>{proj.tech&&<span className="text-[#8b6340] text-[10px] ml-1.5">· {proj.tech}</span>}{proj.description&&<div className="text-[12px] text-[#5c4030] mt-0.5">{proj.description}</div>}</div>)}</>}
      {allSkills&&<><SH title="— Skills & Expertise —"/><p className="text-center text-[#5c4030] leading-[2]">{allSkills}</p></>}
      {resume.languages?.length>0&&<><SH title="— Languages —"/><p className="text-center text-[#5c4030]">{resume.languages.map(l=>`${l.language} (${l.proficiency})`).join("  ·  ")}</p></>}
      {resume.hobbies&&<><SH title="— Interests —"/><p className="text-center text-[#5c4030]">{resume.hobbies}</p></>}
    </div>
  );
}
