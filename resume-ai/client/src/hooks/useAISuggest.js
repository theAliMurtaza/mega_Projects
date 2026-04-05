import { useState, useCallback } from "react";
import { analysisAPI } from "../services/analysis.api.js";

export const useAISuggest = () => {
  const [tips, setTips] = useState({});
  const [loading, setLoading] = useState({});

  const getSuggestion = useCallback(async (field, context, currentValue) => {
    setLoading((prev) => ({ ...prev, [field]: true }));
    try {
      const data = await analysisAPI.suggest(field, context, currentValue);
      setTips((prev) => ({ ...prev, [field]: data.suggestion }));
    } catch (err) {
      setTips((prev) => ({ ...prev, [field]: "Could not fetch suggestion. Please try again." }));
    } finally {
      setLoading((prev) => ({ ...prev, [field]: false }));
    }
  }, []);

  const clearTip = useCallback((field) => {
    setTips((prev) => { const n = { ...prev }; delete n[field]; return n; });
  }, []);

  return { tips, loading, getSuggestion, clearTip };
};
