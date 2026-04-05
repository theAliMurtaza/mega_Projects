import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../hooks/useResume.js";
import { useAuth } from "../hooks/useAuth.js";
import { TEMPLATE_META, getTemplateComponent } from "../components/templates/index.js";

export default function TemplatesPage() {
  const { resume, updateResume } = useResume();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState("");
  const isPremium = user?.plan === "pro" || user?.plan === "pro_annual";

  const apply = (t) => {
    if (t.premium && !isPremium) { navigate("/billing"); return; }
    updateResume({ templateId: t.id });
    setToast('"' + t.name + '" applied!');
    setTimeout(() => setToast(""), 2000);
  };

  const ActivePreview = getTemplateComponent(resume.templateId);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {toast && <div className="notification">{toast}</div>}

      <p className="text-sm text-[#3a4560] mb-5">
        8 professionally designed templates.{" "}
        {!isPremium && (
          <span>4 premium templates require a <button className="btn btn-gold btn-xs ml-1" onClick={() => navigate("/billing")}>Pro plan ✦</button></span>
        )}
      </p>

      {/* Template grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5 mb-8">
        {TEMPLATE_META.map((t) => {
          const locked = t.premium && !isPremium;
          const active = resume.templateId === t.id;
          return (
            <div key={t.id} className={"tmpl-card " + (active ? "selected" : "")} onClick={() => apply(t)}>
              <div className="h-[110px] flex items-center justify-center relative" style={{ background: t.color }}>
                <span className="text-4xl" style={{ filter: locked ? "blur(3px)" : "none", opacity: locked ? 0.4 : 1 }}>{t.icon}</span>
                {t.premium && <span className="absolute top-2 right-2 text-[9px] bg-[#7c4a03] text-[#f5d38a] px-1.5 py-0.5 rounded-full">{locked ? "🔒 Premium" : "✦ Premium"}</span>}
                {active && <span className="absolute bottom-2 right-2 text-[9px] bg-[#c9a84c] text-[#080c14] px-1.5 py-0.5 rounded-full font-semibold">Active</span>}
              </div>
              <div className="p-3 border-t border-[#1a2030]">
                <div className="text-[13px] font-medium text-[#c8c4bc]">{t.name} {locked && "🔒"}</div>
                <div className="text-[11px] text-[#3a4560] mt-0.5">{t.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full live preview */}
      <div className="card">
        <div className="flex items-center justify-between border-b border-[#1a2030] pb-3 mb-4">
          <div className="card-title mb-0">Live Preview — {TEMPLATE_META.find((t) => t.id === resume.templateId)?.name}</div>
          <button className="btn btn-gold btn-sm" onClick={() => navigate("/builder")}>Edit Resume →</button>
        </div>
        <div className="w-full overflow-hidden rounded shadow-2xl bg-white">
          <div style={{ width: "142.8%", transform: "scale(0.70)", transformOrigin: "top left", pointerEvents: "none" }}>
            <ActivePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
