import { useResume } from "../../hooks/useResume.js";
import AISuggestButton from "./AISuggestButton.jsx";

const SKILL_FIELDS = [
  ["technical", "Technical Skills",   "React, Node.js, Docker, AWS, TypeScript"],
  ["soft",      "Soft Skills",        "Leadership, Communication, Problem Solving"],
];

export default function SkillsSection({ aiSuggest }) {
  const { resume, updateSkills } = useResume();

  return (
    <div className="card">
      <div className="card-title">Skills</div>
      <p className="text-[11px] text-[#3a4560] mb-4 -mt-2">
        Languages are now their own section. Add spoken languages there.
      </p>

      {SKILL_FIELDS.map(([key, label, ph]) => (
        <div className="form-group" key={key}>
          <label>{label} <span className="text-[#2a3040]">(comma-separated)</span></label>
          <input
            value={resume.skills[key] || ""}
            placeholder={ph}
            onChange={(e) => updateSkills(key, e.target.value)}
          />
        </div>
      ))}

      <AISuggestButton
        field="skills"
        label="suggest skills to add"
        context={`Roles: ${resume.experience?.map((e) => e.title).join(", ")}`}
        currentValue={resume.skills.technical}
        aiSuggest={aiSuggest}
      />
    </div>
  );
}
