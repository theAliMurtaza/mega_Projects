import { useResume } from "../../hooks/useResume.js";
import AISuggestButton from "./AISuggestButton.jsx";

export default function ProjectsSection({ aiSuggest }) {
  const { resume, addProject, updateProject, removeProject } = useResume();

  return (
    <div className="card">
      <div className="card-title">Projects</div>

      {resume.projects.map((proj) => (
        <div className="entry-card" key={proj._id}>
          <div className="flex justify-between items-start mb-2.5">
            <div className="text-[13px] text-[#aaa]">{proj.name || "Project Name"}</div>
            <button className="btn btn-danger btn-xs" onClick={() => removeProject(proj._id)}>Remove</button>
          </div>

          {[["Project Name","name","E-Commerce Platform"],["Technologies","tech","React, Node.js, MongoDB"],["URL / GitHub","url","github.com/you/project"]].map(([l,k,p]) => (
            <div className="form-group" key={k}>
              <label>{l}</label>
              <input value={proj[k] || ""} placeholder={p}
                onChange={(e) => updateProject(proj._id, k, e.target.value)} />
            </div>
          ))}

          <div className="form-group">
            <label>Description</label>
            <textarea rows={3} value={proj.description || ""}
              placeholder="Built a full-stack platform with real-time inventory tracking…"
              onChange={(e) => updateProject(proj._id, "description", e.target.value)} />
          </div>

          <AISuggestButton
            field={`proj_${proj._id}`}
            label="improve description"
            context={`Project: ${proj.name}, Tech: ${proj.tech}`}
            currentValue={proj.description}
            aiSuggest={aiSuggest}
          />
        </div>
      ))}

      <button className="add-entry-btn" onClick={addProject}>+ Add Project</button>
    </div>
  );
}
