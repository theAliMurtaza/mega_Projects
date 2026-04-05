import { useResume } from "../../hooks/useResume.js";
import AISuggestButton from "./AISuggestButton.jsx";

export default function SummarySection({ aiSuggest }) {
  const { resume, updateResume } = useResume();

  return (
    <div className="card">
      <div className="card-title">Professional Summary</div>
      <div className="form-group">
        <label>2–4 sentence career overview</label>
        <textarea
          rows={6}
          value={resume.summary}
          placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications…"
          onChange={(e) => updateResume({ summary: e.target.value })}
        />
      </div>
      <AISuggestButton
        field="summary"
        label="write a better summary"
        context={`Name: ${resume.personal.name}, Roles: ${resume.experience.map((e) => e.title).join(", ")}`}
        currentValue={resume.summary}
        aiSuggest={aiSuggest}
      />
    </div>
  );
}
