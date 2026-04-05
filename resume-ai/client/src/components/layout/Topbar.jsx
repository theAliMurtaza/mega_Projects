import { useLocation, useNavigate } from "react-router-dom";
import { useResume } from "../../hooks/useResume.js";
import { useAuth } from "../../hooks/useAuth.js";
import { resumeAPI } from "../../services/resume.api.js";
import { useState } from "react";

const TITLES = {
  "/": "Dashboard", "/builder": "Resume Builder", "/templates": "Choose Template",
  "/analyzer": "AI Analyzer", "/billing": "Plans & Billing",
};

export default function Topbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { resume, isDirty, hasDraft, loadResume, markSaved } = useResume();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const isPremium = user?.plan === "pro" || user?.plan === "pro_annual";
  const isBuilder = pathname === "/builder" || pathname.startsWith("/builder/");
  const title = TITLES[pathname] || (isBuilder ? "Resume Builder" : "");

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      if (resume._id) {
        await resumeAPI.update(resume._id, resume);
      } else {
        const data = await resumeAPI.create(resume);
        loadResume(data.resume);
        navigate(`/builder/${data.resume._id}`, { replace: true });
      }
      markSaved(); // clears draft + isDirty
      setSaveMsg("Saved!");
      setTimeout(() => setSaveMsg(""), 2000);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1a2030] bg-[#0a0f18] shrink-0">
      <div className="flex items-center gap-3">
        <h2 className="text-[17px] font-medium text-[#ddd]">{title}</h2>
        {/* Draft indicator */}
        {isBuilder && hasDraft && !isDirty && (
          <span className="text-[10px] text-[#7c4a03] bg-[#7c4a03]/10 border border-[#7c4a03]/30 px-2 py-0.5 rounded-full">draft</span>
        )}
        {isBuilder && isDirty && (
          <span className="text-[10px] text-[#c9a84c] bg-[#c9a84c]/10 border border-[#c9a84c]/30 px-2 py-0.5 rounded-full">unsaved changes</span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {saveMsg && <span className="text-[11px] text-green-400">{saveMsg}</span>}
        {isBuilder && (
          <>
            <button className="btn btn-ghost btn-sm" onClick={() => resume._id ? resumeAPI.downloadPDF(resume._id) : alert("Save first")}>↓ PDF</button>
            {isPremium
              ? <button className="btn btn-ghost btn-sm" onClick={() => resume._id ? resumeAPI.downloadDOCX(resume._id) : alert("Save first")}>↓ Word</button>
              : <button className="btn btn-ghost btn-sm" onClick={() => navigate("/billing")} title="Pro feature">↓ Word ✦</button>
            }
            <button className="btn btn-gold btn-sm" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
          </>
        )}
        {pathname === "/templates" && (
          <span className="tag tag-gold">{resume.templateId} selected</span>
        )}
      </div>
    </div>
  );
}
