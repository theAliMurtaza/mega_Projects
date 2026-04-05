export default function PlanCard({ plan, selected, onSelect }) {
  return (
    <div className={`plan-card ${selected ? "selected" : ""}`} onClick={() => onSelect(plan.id)}>
      <div className="text-[11px] text-[#3a4560] uppercase tracking-[1px] mb-3">{plan.name}</div>
      <div className="font-serif text-3xl font-bold text-[#c9a84c]">${plan.price}</div>
      <div className="text-[11px] text-[#3a4560] mt-0.5 mb-4">{plan.period}</div>
      <div className="border-t border-[#1a2030] pt-4 space-y-2">
        {plan.features.map((f, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-[#5a6070]">
            <span className="text-green-600 text-sm">✓</span>
            {f}
          </div>
        ))}
      </div>
      {selected && (
        <div className="mt-3 text-center text-xs text-[#c9a84c]">✓ Selected</div>
      )}
    </div>
  );
}
