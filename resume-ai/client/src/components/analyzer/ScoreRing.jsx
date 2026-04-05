export default function ScoreRing({ score = 0, size = 110 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? "#6fcf97" : score >= 50 ? "#c9a84c" : "#e4709a";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#111822" strokeWidth={8} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      </svg>
      <div className="absolute text-center">
        <div className="font-serif font-semibold text-[28px]" style={{ color }}>{score}</div>
        <div className="text-[9px] text-[#3a4560] uppercase tracking-wide">/ 100</div>
      </div>
    </div>
  );
}
