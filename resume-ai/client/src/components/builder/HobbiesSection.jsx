import { useResume } from "../../hooks/useResume.js";
import AISuggestButton from "./AISuggestButton.jsx";

const HOBBY_SUGGESTIONS = [
  "Photography", "Rock Climbing", "Open Source Development", "Chess", "Hiking",
  "Cooking", "Reading", "Travelling", "Yoga", "Gaming", "Painting", "Cycling",
];

export default function HobbiesSection({ aiSuggest }) {
  const { resume, updateHobbies } = useResume();

  const addSuggestion = (hobby) => {
    const current = resume.hobbies ? resume.hobbies.split(",").map((h) => h.trim()) : [];
    if (!current.includes(hobby)) {
      updateHobbies([...current, hobby].join(", "));
    }
  };

  return (
    <div className="card">
      <div className="card-title">Hobbies & Interests</div>
      <p className="text-[11px] text-[#3a4560] mb-4 -mt-2">
        Add hobbies that show personality and cultural fit. Keep it authentic.
      </p>

      <div className="form-group">
        <label>Hobbies & Interests <span className="text-[#2a3040]">(comma-separated)</span></label>
        <textarea
          rows={3}
          value={resume.hobbies || ""}
          placeholder="Photography, Rock Climbing, Open Source Development, Chess…"
          onChange={(e) => updateHobbies(e.target.value)}
        />
      </div>

      {/* Quick-add chips */}
      <div className="mb-4">
        <div className="text-[10px] text-[#3a4560] uppercase tracking-wide mb-2">Quick add</div>
        <div className="flex flex-wrap gap-1.5">
          {HOBBY_SUGGESTIONS.map((hobby) => {
            const already = resume.hobbies?.toLowerCase().includes(hobby.toLowerCase());
            return (
              <button
                key={hobby}
                disabled={already}
                onClick={() => addSuggestion(hobby)}
                className={`px-2.5 py-1 rounded-full text-[11px] border transition-colors duration-150 cursor-pointer
                  ${already
                    ? "bg-[#1a3a1a] border-green-800/30 text-green-400 cursor-default"
                    : "bg-[#101620] border-[#1e2838] text-[#4a5060] hover:border-[#c9a84c]/40 hover:text-[#c9a84c]"
                  }`}
              >
                {already ? "✓ " : "+ "}{hobby}
              </button>
            );
          })}
        </div>
      </div>

      <AISuggestButton
        field="hobbies"
        label="suggest relevant hobbies"
        context={`Job roles: ${resume.experience?.map((e) => e.title).join(", ")}, Industry: tech/professional`}
        currentValue={resume.hobbies}
        aiSuggest={aiSuggest}
      />
    </div>
  );
}
