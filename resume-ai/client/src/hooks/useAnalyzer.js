import { useState, useCallback } from "react";
import { analysisAPI } from "../services/analysis.api.js";

export const useAnalyzer = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runGeneral = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analysisAPI.general(payload);
      setResult({ ...data.analysis, type: "general" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const runMatch = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analysisAPI.match(payload);
      setResult({ ...data.analysis, type: "job_match" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadFile = useCallback(async (file) => {
    try {
      const data = await analysisAPI.upload(file);
      return data.resumeText;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, runGeneral, runMatch, uploadFile, reset };
};
