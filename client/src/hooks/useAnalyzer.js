import { useState, useCallback } from "react";
import { analyzeCode } from "../services/api";

/**
 * Custom hook encapsulating all analysis state and actions.
 * Keeps the page component focused on rendering.
 *
 * @param {string} initialCodeA
 * @param {string} initialCodeB
 */
export function useAnalyzer(initialCodeA, initialCodeB) {
  const [codeA, setCodeA] = useState(initialCodeA);
  const [codeB, setCodeB] = useState(initialCodeB);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await analyzeCode(codeA, codeB);
      setResults(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [codeA, codeB]);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  return {
    codeA,
    codeB,
    setCodeA,
    setCodeB,
    results,
    loading,
    error,
    analyze,
    clearResults,
    dismissError,
    /** Derived state — whether the results section should be visible. */
    hasOutput: !!(results || loading || error),
  };
}
