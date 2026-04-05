import { useResume } from "../../hooks/useResume.js";
import AISuggestButton from "./AISuggestButton.jsx";

export default function EducationSection({ aiSuggest }) {
  const { resume, addEducation, updateEducation, removeEducation } = useResume();

  return (
    <div className="card">
      <div className="card-title">Education</div>

      {resume.education.map((edu) => (
        <div className="entry-card" key={edu._id}>
          <div className="flex justify-between items-start mb-2.5">
            <div>
              <div className="text-[13px] text-[#aaa]">{edu.degree || "Degree"}</div>
              <div className="text-[11px] text-[#3a4560]">{edu.institution ? `@ ${edu.institution}` : ""}</div>
            </div>
            <button className="btn btn-danger btn-xs" onClick={() => removeEducation(edu._id)}>Remove</button>
          </div>

          <div className="form-row">
            {[["Degree","degree","B.S. Computer Science"],["Institution","institution","MIT"],["Year","year","2021"],["GPA (optional)","gpa","3.8 / 4.0"]].map(([l,k,p]) => (
              <div className="form-group" key={k}>
                <label>{l}</label>
                <input value={edu[k] || ""} placeholder={p}
                  onChange={(e) => updateEducation(edu._id, k, e.target.value)} />
              </div>
            ))}
          </div>

          <AISuggestButton
            field={`edu_${edu._id}`}
            label="highlight this education"
            context={`Degree: ${edu.degree} from ${edu.institution}`}
            currentValue={`${edu.degree} ${edu.institution}`}
            aiSuggest={aiSuggest}
          />
        </div>
      ))}

      <button className="add-entry-btn" onClick={addEducation}>+ Add Education</button>
    </div>
  );
}
