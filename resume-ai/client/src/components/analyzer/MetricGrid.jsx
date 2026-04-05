const METRIC_COLORS = {
  content:    "#c9a84c",
  impact:     "#6fcf97",
  ats:        "#60a0e0",
  clarity:    "#c490d0",
  keywords:   "#c9a84c",
  experience: "#6fcf97",
  skills:     "#5DCAA5",
  fit:        "#85B7EB",
};

export default function MetricGrid({ metrics = {} }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 mt-4">
      {Object.entries(metrics).map(([key, value]) => {
        const color = METRIC_COLORS[key] || "#c9a84c";
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        const pct = Math.round(value || 0);
        return (
          <div key={key} className="bg-[#080c14] border border-[#1a2030] rounded-lg p-3">
            <div className="text-[10px] text-[#3a4560] uppercase tracking-wide mb-1.5">{label}</div>
            <div className="text-[20px] font-semibold text-[#ddd] mb-1">{pct}%</div>
            <div className="h-[3px] bg-[#111822] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
