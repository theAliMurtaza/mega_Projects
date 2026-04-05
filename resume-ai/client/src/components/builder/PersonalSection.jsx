import { useRef } from "react";
import { useResume } from "../../hooks/useResume.js";
import AISuggestButton from "./AISuggestButton.jsx";

const FIELDS = [
  ["name",     "Full Name",    "Jane Doe"],
  ["jobTitle", "Job Title / Headline", "Senior Software Engineer"],
  ["email",    "Email",        "jane@example.com"],
  ["phone",    "Phone",        "+1 555 000 0000"],
  ["location", "Location",     "New York, NY"],
  ["linkedin", "LinkedIn",     "linkedin.com/in/jane"],
  ["website",  "Website",      "janedoe.dev"],
];

export default function PersonalSection({ aiSuggest }) {
  const { resume, updatePersonal } = useResume();
  const fileRef = useRef(null);

  // Convert uploaded image to base64 and store in personal.profilePhoto
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => updatePersonal("profilePhoto", ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="card">
      <div className="card-title">Personal Information</div>

      {/* Profile photo uploader */}
      <div className="mb-5">
        <label>Profile Photo <span className="text-[#2a3040]">(used in Profile template)</span></label>
        <div className="flex items-center gap-4 mt-2">
          {/* Avatar preview */}
          <div className="w-16 h-16 rounded-full bg-[#1a2030] border-2 border-[#2a3040] overflow-hidden flex items-center justify-center shrink-0">
            {resume.personal.profilePhoto ? (
              <img src={resume.personal.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl text-[#3a4560]">👤</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            <button className="btn btn-ghost btn-sm" onClick={() => fileRef.current?.click()}>
              Upload Photo
            </button>
            {resume.personal.profilePhoto && (
              <button className="btn btn-danger btn-xs" onClick={() => updatePersonal("profilePhoto", "")}>
                Remove
              </button>
            )}
          </div>
          <p className="text-[11px] text-[#2a3040] leading-relaxed">
            JPG or PNG recommended.<br />Used in the "Profile" template.
          </p>
        </div>
      </div>

      {/* Text fields */}
      <div className="form-row">
        {FIELDS.map(([key, label, ph]) => (
          <div className="form-group" key={key}>
            <label>{label}</label>
            <input
              value={resume.personal[key] || ""}
              placeholder={ph}
              onChange={(e) => updatePersonal(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <AISuggestButton
        field="personal"
        label="improve contact section"
        context={`Name: ${resume.personal.name}, Location: ${resume.personal.location}`}
        currentValue={JSON.stringify(resume.personal)}
        aiSuggest={aiSuggest}
      />
    </div>
  );
}
