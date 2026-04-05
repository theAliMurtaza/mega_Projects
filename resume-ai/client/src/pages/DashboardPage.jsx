import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useResume } from "../hooks/useResume.js";
import { resumeAPI } from "../services/resume.api.js";
import { analysisAPI } from "../services/analysis.api.js";

export default function DashboardPage() {
  const { user } = useAuth();
  const { loadResume, resetResume } = useResume();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const isPremium = user?.plan === "pro" || user?.plan === "pro_annual";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  useEffect(() => {
    Promise.all([resumeAPI.getAll(), analysisAPI.getAll()])
      .then(([r, a]) => { setResumes(r.resumes || []); setAnalyses(a.analyses || []); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleNew = () => { resetResume(); navigate("/builder"); };
  const handleEdit = (r) => { loadResume(r); navigate("/builder/" + r._id); };
  const handleDelete = async (id) => {
    if (!confirm("Delete this resume?")) return;
    await resumeAPI.remove(id);
    setResumes((prev) => prev.filter((r) => r._id !== id));
  };

  if (loading) return <div className="flex-1 flex items-center justify-center text-[#3a4560] text-sm">Loading…</div>;

  return (
    <div className="flex-1 overflow-y-auto p-6">

      {/* Greeting */}
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-[#c9a84c] mb-1">Good {greeting}, {user?.name?.split(" ")[0] || "there"} 👋</h1>
        <p className="text-sm text-[#3a4560]">Here's your resume activity at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3.5 mb-5">
        {[["Resumes Built", resumes.length],["Analyses Run", analyses.length],["Current Plan", isPremium ? "Pro ✦" : "Free"]].map(([label, val]) => (
          <div key={label} className="stat-card">
            <div className="font-serif text-[28px] font-bold text-[#c9a84c] mb-0.5">{val}</div>
            <div className="text-[11px] text-[#3a4560]">{label}</div>
          </div>
        ))}
      </div>

      {/* Resumes */}
      <div className="card">
        <div className="flex justify-between items-center mb-3.5">
          <div className="card-title mb-0">My Resumes</div>
          <button className="btn btn-gold btn-sm" onClick={handleNew}>+ New Resume</button>
        </div>
        {resumes.length === 0 && <p className="text-sm text-[#3a4560] py-3">No resumes yet — create your first one!</p>}
        {resumes.map((r) => (
          <div key={r._id} className="resume-row">
            <div>
              <div className="text-[13px] text-[#bbb]">{r.personal?.name || r.title || "Untitled"}</div>
              <div className="text-[11px] text-[#3a4560] mt-0.5">
                Updated {new Date(r.updatedAt).toLocaleDateString()} · {r.templateId}
                {r.lastScore && <span className="ml-2">· Score: {r.lastScore}</span>}
              </div>
            </div>
            <div className="flex gap-1.5">
              <button className="btn btn-ghost btn-xs" onClick={() => handleEdit(r)}>Edit</button>
              <button className="btn btn-ghost btn-xs" onClick={() => resumeAPI.downloadPDF(r._id)}>PDF</button>
              <button className="btn btn-danger btn-xs" onClick={() => handleDelete(r._id)}>Del</button>
            </div>
          </div>
        ))}
      </div>

      {/* Analyses */}
      {analyses.length > 0 && (
        <div className="card">
          <div className="card-title">Recent Analyses</div>
          {analyses.slice(0, 5).map((a) => (
            <div key={a._id} className="resume-row">
              <span className="text-[13px] text-[#bbb]">{a.type === "general" ? "General Analysis" : "Job Match"}</span>
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-lg text-[#c9a84c]">{a.score || a.matchScore || "—"}</span>
                <span className="text-[11px] text-[#3a4560]">{new Date(a.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upgrade banner */}
      {!isPremium && (
        <div className="flex justify-between items-center bg-[#1a1004]/20 border border-[#7c4a03]/30 rounded-xl px-6 py-5">
          <div>
            <div className="font-serif text-lg text-[#c9a84c] mb-1">Upgrade to Pro ✦</div>
            <div className="text-xs text-[#6a5030]">Unlock all 8 templates, unlimited AI suggestions, Word downloads & more.</div>
          </div>
          <button className="btn btn-gold shrink-0" onClick={() => navigate("/billing")}>Upgrade — $9/mo</button>
        </div>
      )}
    </div>
  );
}
