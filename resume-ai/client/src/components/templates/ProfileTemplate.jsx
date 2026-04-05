// Profile Template — Free — Sidebar with profile photo, contact & skills; main content on right

const PROFICIENCY_BAR = {
  Native:         100,
  Fluent:         90,
  Advanced:       75,
  Intermediate:   60,
  Conversational: 45,
  Basic:          25,
};

export default function ProfileTemplate({ resume }) {
  const p = resume.personal || {};
  const allSkills = [resume.skills?.technical, resume.skills?.soft]
    .filter(Boolean).join(", ").split(",").map((s) => s.trim()).filter(Boolean);
  const initials = (p.name || "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const SectionHead = ({ title }) => (
    <h2 className="text-[10px] font-bold text-[#1e3a5f] uppercase tracking-[2px] border-b border-[#c0d4e8] pb-1 mb-2.5 mt-4">
      {title}
    </h2>
  );

  return (
    <div className="bg-white flex font-sans text-[12px] min-h-[1000px]">

      {/* ── LEFT SIDEBAR ──────────────────────────────────── */}
      <div className="w-[220px] min-w-[220px] bg-[#1e3a5f] text-white px-5 py-8 flex flex-col">

        {/* Avatar */}
        <div className="flex justify-center mb-5">
          {p.profilePhoto ? (
            <img
              src={p.profilePhoto}
              alt={p.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white/30"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center text-3xl font-bold text-white/70">
              {initials}
            </div>
          )}
        </div>

        {/* Name + title */}
        <div className="text-center mb-6">
          <h1 className="text-[18px] font-bold leading-tight">{p.name || "Your Name"}</h1>
          {p.jobTitle && (
            <div className="text-[11px] text-blue-200 mt-1">{p.jobTitle}</div>
          )}
        </div>

        {/* Contact */}
        <div className="mb-5">
          <h3 className="text-[9px] text-blue-300 uppercase tracking-widest border-b border-blue-800 pb-1 mb-2">
            Contact
          </h3>
          {[
            p.email && { icon: "✉", value: p.email },
            p.phone && { icon: "☎", value: p.phone },
            p.location && { icon: "⌖", value: p.location },
            p.linkedin && { icon: "in", value: p.linkedin },
            p.website && { icon: "⊙", value: p.website },
          ].filter(Boolean).map((item, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5">
              <span className="text-blue-300 text-[10px] mt-0.5 shrink-0 w-4">{item.icon}</span>
              <span className="text-blue-100 text-[10px] break-all">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Skills */}
        {allSkills.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[9px] text-blue-300 uppercase tracking-widest border-b border-blue-800 pb-1 mb-2">
              Skills
            </h3>
            {allSkills.map((s, i) => (
              <div key={i} className="mb-1.5">
                <div className="text-[10px] text-blue-100 mb-0.5">{s}</div>
                <div className="h-1 bg-blue-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-300 rounded-full" style={{ width: "80%" }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {resume.languages?.length > 0 && (
          <div className="mb-5">
            <h3 className="text-[9px] text-blue-300 uppercase tracking-widest border-b border-blue-800 pb-1 mb-2">
              Languages
            </h3>
            {resume.languages.map((lang, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-[10px] mb-0.5">
                  <span className="text-blue-100">{lang.language}</span>
                  <span className="text-blue-300">{lang.proficiency}</span>
                </div>
                <div className="h-1 bg-blue-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full"
                    style={{ width: `${PROFICIENCY_BAR[lang.proficiency] || 50}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hobbies */}
        {resume.hobbies && (
          <div>
            <h3 className="text-[9px] text-blue-300 uppercase tracking-widest border-b border-blue-800 pb-1 mb-2">
              Interests
            </h3>
            <div className="flex flex-wrap gap-1">
              {resume.hobbies.split(",").map((h, i) => (
                <span key={i} className="bg-blue-800/50 text-blue-100 text-[9px] px-1.5 py-0.5 rounded">
                  {h.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT MAIN CONTENT ────────────────────────────── */}
      <div className="flex-1 px-7 py-8">

        {/* Summary */}
        {resume.summary && (
          <>
            <SectionHead title="Profile" />
            <p className="text-gray-600 leading-relaxed">{resume.summary}</p>
          </>
        )}

        {/* Experience */}
        {resume.experience?.length > 0 && (
          <>
            <SectionHead title="Experience" />
            {resume.experience.map((exp, i) => (
              <div key={i} className="mb-4 pl-3 border-l-2 border-[#c0d4e8]">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <strong className="text-[13px] text-[#1e3a5f]">{exp.title}</strong>
                  <span className="text-[10px] text-gray-400 shrink-0">{exp.start} – {exp.current ? "Present" : exp.end}</span>
                </div>
                <div className="text-[11px] font-semibold text-[#2a5fa0] mt-0.5">
                  {exp.company}{exp.location ? ` · ${exp.location}` : ""}
                </div>
                {exp.description && (
                  <div className="text-[11px] text-gray-600 mt-1 whitespace-pre-wrap">{exp.description}</div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <>
            <SectionHead title="Education" />
            {resume.education.map((edu, i) => (
              <div key={i} className="mb-2.5">
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <strong className="text-[12px]">{edu.degree}</strong>
                  <span className="text-[10px] text-gray-400 shrink-0">{edu.year}</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  {edu.institution}{edu.gpa ? ` · GPA: ${edu.gpa}` : ""}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <>
            <SectionHead title="Projects" />
            {resume.projects.map((proj, i) => (
              <div key={i} className="mb-2.5">
                <div className="flex items-baseline gap-2">
                  <strong className="text-[12px]">{proj.name}</strong>
                  {proj.tech && <span className="text-[10px] text-[#2a5fa0]">{proj.tech}</span>}
                </div>
                {proj.description && (
                  <div className="text-[11px] text-gray-600 mt-0.5">{proj.description}</div>
                )}
              </div>
            ))}
          </>
        )}

        {/* Hobbies on right side if no sidebar space issue */}
        {resume.hobbies && resume.languages?.length === 0 && (
          <>
            <SectionHead title="Hobbies & Interests" />
            <p className="text-gray-600">{resume.hobbies}</p>
          </>
        )}
      </div>
    </div>
  );
}
