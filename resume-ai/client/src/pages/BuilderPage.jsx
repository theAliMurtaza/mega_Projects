import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResume } from "../hooks/useResume.js";
import { useAISuggest } from "../hooks/useAISuggest.js";
import { resumeAPI } from "../services/resume.api.js";
import PersonalSection   from "../components/builder/PersonalSection.jsx";
import SummarySection    from "../components/builder/SummarySection.jsx";
import ExperienceSection from "../components/builder/ExperienceSection.jsx";
import EducationSection  from "../components/builder/EducationSection.jsx";
import SkillsSection     from "../components/builder/SkillsSection.jsx";
import LanguagesSection  from "../components/builder/LanguagesSection.jsx";
import ProjectsSection   from "../components/builder/ProjectsSection.jsx";
import HobbiesSection    from "../components/builder/HobbiesSection.jsx";
import ResumePreview     from "../components/builder/ResumePreview.jsx";

const SECTIONS = ["Personal","Summary","Experience","Education","Skills","Languages","Projects","Hobbies"];

const SectionMap = {
  Personal:   PersonalSection,
  Summary:    SummarySection,
  Experience: ExperienceSection,
  Education:  EducationSection,
  Skills:     SkillsSection,
  Languages:  LanguagesSection,
  Projects:   ProjectsSection,
  Hobbies:    HobbiesSection,
};

export default function BuilderPage() {
  const { id } = useParams();
  const { resume, loadResume, hasDraft, restoreDraft, resetResume, markSaved } = useResume();
  const aiSuggest = useAISuggest();
  const [section, setSection] = useState("Personal");
  const [showPreview, setShowPreview] = useState(true);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const navigate = useNavigate();

  // Load existing resume from server
  useEffect(() => {
    if (id && id !== resume._id) {
      resumeAPI.getOne(id).then((d) => loadResume(d.resume)).catch(() => navigate("/"));
    }
  }, [id]);

  // Show draft banner if there is an unsaved draft and we're on /builder (new)
  useEffect(() => {
    if (!id && hasDraft) setShowDraftBanner(true);
  }, [hasDraft, id]);

  const handleRestoreDraft = () => {
    restoreDraft();
    setShowDraftBanner(false);
  };

  const handleDiscardDraft = () => {
    resetResume();
    setShowDraftBanner(false);
  };

  const ActiveSection = SectionMap[section] || PersonalSection;

  return (
    <>
      {/* Draft restore banner */}
      {showDraftBanner && (
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#1a1004] border-b border-[#7c4a03]/40 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#c9a84c] text-sm">📝</span>
            <span className="text-[13px] text-[#c9a84c]">You have an unsaved draft from your last session.</span>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-gold btn-xs" onClick={handleRestoreDraft}>Restore Draft</button>
            <button className="btn btn-ghost btn-xs" onClick={handleDiscardDraft}>Discard</button>
          </div>
        </div>
      )}

      {/* Section tabs + preview toggle */}
      <div className="flex items-center border-b border-[#1a2030] bg-[#0a0f18] shrink-0">
        <div className="flex gap-0.5 px-5 pt-3 overflow-x-auto flex-1">
          {SECTIONS.map((s) => (
            <div key={s} className={`section-tab ${section === s ? "active" : ""}`} onClick={() => setSection(s)}>{s}</div>
          ))}
        </div>
        {/* Hide/Show preview toggle */}
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 mr-4 text-[11px] border border-[#1e2838] rounded-md transition-colors shrink-0 mb-1"
          style={{ color: showPreview ? "#c9a84c" : "#3a4560", borderColor: showPreview ? "#c9a84c44" : "#1e2838" }}
          onClick={() => setShowPreview((v) => !v)}
          title={showPreview ? "Hide preview" : "Show preview"}
        >
          {showPreview ? "◫ Hide Preview" : "◱ Show Preview"}
        </button>
      </div>

      {/* Split pane */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div className="flex-1 overflow-y-auto p-5">
          <ActiveSection aiSuggest={aiSuggest} />
        </div>

        {/* Live preview — conditionally shown */}
        {showPreview && (
          <div className="w-[400px] min-w-[400px] border-l border-[#1a2030] bg-[#0c1118] flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-3.5 py-2.5 text-[11px] text-[#3a4560] border-b border-[#1a2030] shrink-0">
              <span>LIVE PREVIEW · {resume.templateId}</span>
              <button className="btn btn-ghost btn-xs" onClick={() => navigate("/templates")}>Change</button>
            </div>
            <div className="p-3.5 flex-1">
              <div className="w-full overflow-hidden rounded-md shadow-2xl bg-white">
                <div style={{ width: "142.8%", transform: "scale(0.70)", transformOrigin: "top left", pointerEvents: "none" }}>
                  <ResumePreview resume={resume} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
