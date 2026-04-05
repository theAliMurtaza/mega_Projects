import { useState, useRef } from "react";
import { useAnalyzer } from "../hooks/useAnalyzer.js";
import { useResume } from "../hooks/useResume.js";
import { resumeToText } from "../utils/resumeToText.js";
import ScoreRing     from "../components/analyzer/ScoreRing.jsx";
import MetricGrid    from "../components/analyzer/MetricGrid.jsx";
import FeedbackList  from "../components/analyzer/FeedbackList.jsx";
import KeywordChips  from "../components/analyzer/KeywordChips.jsx";
import ResumeUploader from "../components/analyzer/ResumeUploader.jsx";

export default function AnalyzerPage() {
  const { resume } = useResume();
  const { result, loading, error, runGeneral, runMatch, uploadFile } = useAnalyzer();
  const [tab, setTab] = useState("general");          // general | jd
  const [inputMode, setInputMode] = useState("paste"); // paste | upload
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const hasResume = resume.personal?.name || resume.summary || resume.experience?.length;

  const handleRun = () => {
    const text = resumeText.trim();
    if (!text) return;
    if (tab === "general") runGeneral({ resumeText: text });
    else runMatch({ resumeText: text, jobDescription: jdText });
  };

  const handleUpload = async (text) => {
    setResumeText(text);
    setInputMode("paste");
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">

      {/* Mode toggle */}
      <div className="flex gap-2 mb-5">
        {["general","jd"].map((t) => (
          <button key={t} className={`btn ${tab === t ? "btn-gold" : "btn-ghost"}`}
            onClick={() => { setTab(t); }}>
            {t === "general" ? "General Analysis" : "Job Match"}
          </button>
        ))}
      </div>

      {/* Resume input */}
      <div className="card">
        <div className="card-title">Resume Input</div>
        <div className="flex gap-2 mb-3">
          {["paste","upload"].map((m) => (
            <button key={m} className={`btn btn-sm ${inputMode === m ? "btn-gold" : "btn-ghost"}`} onClick={() => setInputMode(m)}>
              {m === "paste" ? "Paste Text" : "Upload File"}
            </button>
          ))}
          {hasResume && (
            <button className="btn btn-ghost btn-sm" onClick={() => { setResumeText(resumeToText(resume)); setInputMode("paste"); }}>
              Use My Resume
            </button>
          )}
        </div>

        {inputMode === "paste" ? (
          <div className="form-group">
            <label>Paste resume text here</label>
            <textarea rows={8} value={resumeText} onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your full resume as plain text…" />
          </div>
        ) : (
          <ResumeUploader onText={handleUpload} />
        )}
        {resumeText && (
          <div className="text-[11px] text-[#3a4560] mt-1.5">{resumeText.length} characters loaded</div>
        )}
      </div>

      {/* Job description */}
      {tab === "jd" && (
        <div className="card">
          <div className="card-title">Job Description</div>
          <div className="form-group">
            <label>Paste the job description you're targeting</label>
            <textarea rows={6} value={jdText} onChange={(e) => setJdText(e.target.value)}
              placeholder="Senior Software Engineer at Acme Corp…\n\nWe're looking for…" />
          </div>
        </div>
      )}

      {/* Run button */}
      <button className="btn btn-gold btn-full py-3 mb-5 text-sm"
        onClick={handleRun}
        disabled={loading || !resumeText.trim() || (tab === "jd" && !jdText.trim())}>
        {loading ? "✦ Analyzing…" : tab === "general" ? "✦ Analyze Resume" : "✦ Check Job Match"}
      </button>

      {/* Error */}
      {error && <div className="text-sm text-[#e4709a] mb-4">{error}</div>}

      {/* General result */}
      {result?.type === "general" && (
        <>
          <div className="flex items-center gap-6 mb-5">
            <ScoreRing score={result.score || 0} />
            <div>
              <div className="text-xs text-[#3a4560] mb-1">Overall Resume Score</div>
              <div className="text-sm text-[#c9a84c]">
                {result.score >= 75 ? "Strong Resume ✦" : result.score >= 50 ? "Good Resume" : "Needs Improvement"}
              </div>
              {result.strengths?.[0] && <div className="text-xs text-[#3a4560] mt-1.5">Top strength: {result.strengths[0]}</div>}
            </div>
          </div>

          <MetricGrid metrics={result.metrics} />
          <FeedbackList feedback={result.feedback} />

          {result.improvements?.length > 0 && (
            <div className="card mt-3">
              <div className="card-title">Top Improvements</div>
              {result.improvements.map((imp, i) => (
                <div key={i} className="text-xs text-[#6070a0] py-2 border-b border-[#1a2030] last:border-0">→ {imp}</div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Job match result */}
      {result?.type === "job_match" && (
        <>
          <div className="flex items-center gap-6 mb-5">
            <ScoreRing score={result.matchScore || 0} />
            <div>
              <div className="text-xs text-[#3a4560] mb-1">Job Match Score</div>
              <div className="text-sm text-[#c9a84c]">
                {result.matchScore >= 75 ? "Strong Match ✦" : result.matchScore >= 50 ? "Partial Match" : "Low Match"}
              </div>
            </div>
          </div>

          <MetricGrid metrics={result.metrics} />
          <KeywordChips matched={result.matched} missing={result.missing} />
          <FeedbackList feedback={result.feedback} />

          {result.tips?.length > 0 && (
            <div className="card mt-3">
              <div className="card-title">Tailoring Tips</div>
              {result.tips.map((t, i) => (
                <div key={i} className="text-xs text-[#6070a0] py-2 border-b border-[#1a2030] last:border-0">→ {t}</div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
