export default function KeywordChips({ matched = [], missing = [] }) {
  if (!matched.length && !missing.length) return null;
  return (
    <div className="card mt-4">
      <div className="card-title">Keyword Analysis</div>

      {matched.length > 0 && (
        <div className="mb-3">
          <div className="text-[10px] text-[#3a4560] uppercase tracking-[1px] mb-1.5">Matched</div>
          <div className="flex flex-wrap gap-1">
            {matched.map((k, i) => (
              <span key={i} className="inline-block px-2.5 py-0.5 rounded-full text-[11px] bg-[#0a1a0a] border border-[#2d5a2d]/30 text-green-400">{k}</span>
            ))}
          </div>
        </div>
      )}

      {missing.length > 0 && (
        <div>
          <div className="text-[10px] text-[#3a4560] uppercase tracking-[1px] mb-1.5">Missing — add these</div>
          <div className="flex flex-wrap gap-1">
            {missing.map((k, i) => (
              <span key={i} className="inline-block px-2.5 py-0.5 rounded-full text-[11px] bg-[#1a0a15] border border-[#6a2a4a]/30 text-pink-400">{k}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
