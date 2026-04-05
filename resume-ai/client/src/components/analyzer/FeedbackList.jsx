const TYPE_MAP = {
  good: { cls: "feedback-good", icon: "✓" },
  warn: { cls: "feedback-warn", icon: "!" },
  bad:  { cls: "feedback-bad",  icon: "✗" },
  info: { cls: "feedback-info", icon: "→" },
};

export default function FeedbackList({ feedback = [], title = "Detailed Feedback" }) {
  if (!feedback.length) return null;
  return (
    <div className="mt-4">
      <div className="text-[11px] text-[#3a4560] uppercase tracking-[1px] mb-2.5">{title}</div>
      {feedback.map((f, i) => {
        const { cls, icon } = TYPE_MAP[f.type] || TYPE_MAP.info;
        return (
          <div key={i} className={`feedback-item ${cls}`}>
            <span className="text-xs shrink-0 mt-0.5">{icon}</span>
            <span className="text-xs text-[#7a8090] leading-relaxed">{f.text}</span>
          </div>
        );
      })}
    </div>
  );
}
