import { useResume } from "../../hooks/useResume.js";
import AISuggestButton from "./AISuggestButton.jsx";

export default function ExperienceSection({ aiSuggest }) {
  const { resume, addExperience, updateExperience, removeExperience } = useResume();

  return (
    <div className="card">
      <div className="card-title">Work Experience</div>

      {resume.experience.map((exp) => (
        <div className="entry-card" key={exp._id}>
          <div className="flex justify-between items-start mb-2.5">
            <div>
              <div className="text-[13px] text-[#aaa]">{exp.title || "New Position"}</div>
              <div className="text-[11px] text-[#3a4560]">{exp.company ? `@ ${exp.company}` : ""}</div>
            </div>
            <button className="btn btn-danger btn-xs" onClick={() => removeExperience(exp._id)}>Remove</button>
          </div>

          <div className="form-row">
            {[["Job Title","title","Senior Engineer"],["Company","company","Acme Corp"],["Start","start","Jan 2022"],["End","end","Present"]].map(([l,k,p]) => (
              <div className="form-group" key={k}>
                <label>{l}</label>
                <input value={exp[k] || ""} placeholder={p} disabled={k==="end" && exp.current}
                  onChange={(e) => updateExperience(exp._id, k, e.target.value)} />
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>Location</label>
            <input value={exp.location || ""} placeholder="New York / Remote"
              onChange={(e) => updateExperience(exp._id, "location", e.target.value)} />
          </div>

          <div className="form-group">
            <label>Achievements & Responsibilities (use • bullets)</label>
            <textarea rows={4} value={exp.description || ""}
              placeholder={"• Increased system throughput by 35%\n• Led migration to microservices"}
              onChange={(e) => updateExperience(exp._id, "description", e.target.value)} />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-[11px] text-[#3a4560] mb-2">
            <input type="checkbox" checked={exp.current || false} style={{ width: "auto" }}
              onChange={(e) => updateExperience(exp._id, "current", e.target.checked)} />
            Currently working here
          </label>

          <AISuggestButton
            field={`exp_${exp._id}`}
            label="improve bullet points"
            context={`Role: ${exp.title} at ${exp.company}`}
            currentValue={exp.description}
            aiSuggest={aiSuggest}
          />
        </div>
      ))}

      <button className="add-entry-btn" onClick={addExperience}>+ Add Experience</button>
    </div>
  );
}
