export default function AISuggestButton({ field, label, context, currentValue, aiSuggest }) {
  const { tips, loading, getSuggestion, clearTip } = aiSuggest;
  const isLoading = loading[field];
  const tip = tips[field];

  return (
    <div className="mt-1.5">
      <button
        className="ai-suggest-btn"
        disabled={isLoading}
        onClick={() => tip ? clearTip(field) : getSuggestion(field, context, currentValue)}
      >
        <span>✦</span>
        {isLoading ? "Thinking…" : tip ? "Clear suggestion" : `AI: ${label}`}
      </button>
      {tip && !isLoading && (
        <div className="ai-tip">{tip}</div>
      )}
    </div>
  );
}
