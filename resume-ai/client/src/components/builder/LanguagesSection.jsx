import { useResume } from "../../hooks/useResume.js";
import AISuggestButton from "./AISuggestButton.jsx";

const PROFICIENCY_LEVELS = ["Native", "Fluent", "Advanced", "Intermediate", "Conversational", "Basic"];

export default function LanguagesSection({ aiSuggest }) {
  const { resume, addLanguage, updateLanguage, removeLanguage } = useResume();

  return (
    <div className="card">
      <div className="card-title">Languages</div>
      <p className="text-[11px] text-[#3a4560] mb-4 -mt-2">
        Add languages you speak along with your proficiency level.
      </p>

      {resume.languages?.length > 0 ? (
        <div className="space-y-2.5 mb-3">
          {resume.languages.map((lang) => (
            <div key={lang._id} className="entry-card">
              <div className="flex items-center gap-2.5">
                <div className="flex-1">
                  <label>Language</label>
                  <input
                    value={lang.language || ""}
                    placeholder="e.g. Spanish, French, Mandarin"
                    onChange={(e) => updateLanguage(lang._id, "language", e.target.value)}
                  />
                </div>
                <div className="w-44">
                  <label>Proficiency</label>
                  <select
                    value={lang.proficiency || "Conversational"}
                    onChange={(e) => updateLanguage(lang._id, "proficiency", e.target.value)}
                  >
                    {PROFICIENCY_LEVELS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <button
                  className="btn btn-danger btn-xs mt-4"
                  onClick={() => removeLanguage(lang._id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-[#2a3040] text-sm mb-3">
          No languages added yet. Click below to add one.
        </div>
      )}

      <button className="add-entry-btn mb-3" onClick={addLanguage}>
        + Add Language
      </button>

      <AISuggestButton
        field="languages"
        label="suggest languages to list"
        context={`Roles: ${resume.experience?.map((e) => e.title).join(", ")}, Location: ${resume.personal?.location}`}
        currentValue={resume.languages?.map((l) => `${l.language} (${l.proficiency})`).join(", ")}
        aiSuggest={aiSuggest}
      />
    </div>
  );
}
