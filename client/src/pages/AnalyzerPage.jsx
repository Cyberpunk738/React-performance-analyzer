import { DEFAULT_CODE_A, DEFAULT_CODE_B } from "../config/constants";
import { useAnalyzer } from "../hooks/useAnalyzer";
import CodeEditor from "../components/editors/CodeEditor";
import ComparisonPanel from "../components/results/ComparisonPanel";

export default function AnalyzerPage() {
  const {
    codeA, codeB, setCodeA, setCodeB,
    results, loading, error,
    analyze, clearResults, dismissError,
  } = useAnalyzer(DEFAULT_CODE_A, DEFAULT_CODE_B);

  return (
    <>
      {/* Page toolbar */}
      <div className="flex items-center justify-between px-lg py-md border-b border-[#333333] shrink-0">
        <div>
          <h1 className="text-headline font-headline text-on-surface">Code Comparison</h1>
          <p className="text-body-xs text-slate-500">
            Paste two versions of React/JavaScript code to compare bundle size &amp; build performance
          </p>
        </div>
        <div className="flex gap-sm items-center">
          {results && (
            <button
              onClick={clearResults}
              className="bg-surface-container-high text-on-surface-variant px-md py-1.5 rounded-lg font-label-caps text-xs flex items-center gap-xs border border-[#333333] transition-all hover:bg-surface-bright active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Clear
            </button>
          )}
          <button
            onClick={analyze}
            disabled={loading}
            className="bg-primary text-on-primary px-lg py-1.5 rounded-lg font-label-caps text-xs flex items-center gap-sm shadow-lg shadow-primary/10 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-sm">play_arrow</span>
            )}
            {loading ? "Analyzing..." : "Analyze Performance"}
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-sm px-lg py-2.5 bg-error-container/30 border-b border-error/20 animate-fade-in">
          <span className="material-symbols-outlined text-error text-sm">error</span>
          <span className="text-body-xs text-error font-medium flex-1">{error.message || "Analysis failed. Check your code and try again."}</span>
          <button onClick={dismissError} className="text-error/60 hover:text-error transition-colors p-1">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Editors side-by-side */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col border-r border-[#333333]">
          <CodeEditor
            value={codeA}
            onChange={setCodeA}
            version="A"
            filename="version-a.jsx"
            results={results}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <CodeEditor
            value={codeB}
            onChange={setCodeB}
            version="B"
            filename="version-b.jsx"
            results={results}
          />
        </div>
      </div>

      {/* Bottom metrics panel */}
      <ComparisonPanel results={results} loading={loading} />
    </>
  );
}
