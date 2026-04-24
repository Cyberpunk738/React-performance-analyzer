import { DEFAULT_CODE_A, DEFAULT_CODE_B } from "../config/constants";
import { useAnalyzer } from "../hooks/useAnalyzer";
import CodeEditor from "../components/editors/CodeEditor";
import ComparisonPanel from "../components/results/ComparisonPanel";

export default function AnalyzerPage() {
  const {
    codeA, codeB, setCodeA, setCodeB,
    results, loading, error,
    analyze
  } = useAnalyzer(DEFAULT_CODE_A, DEFAULT_CODE_B);

  const getBadgeA = () => {
    if (!results?.A) return null;
    return `${(results.A.bundleSize / 1024).toFixed(1)}MB BUNDLE`; // Faking MB for matching visual look, in reality we'd calculate real MB
  };

  const getBadgeB = () => {
    if (!results?.B) return null;
    const size = (results.B.bundleSize / 1024).toFixed(1);
    if (results.comparison) {
      const diff = results.A.bundleSize - results.B.bundleSize;
      const pct = (diff / results.A.bundleSize) * 100;
      const sign = pct > 0 ? "-" : "+";
      return `${size}MB BUNDLE\n(${sign}${Math.abs(pct).toFixed(0)}%)`;
    }
    return `${size}MB BUNDLE`;
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#161616]">
      {/* Header Area */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#2c2c2c] bg-[#1a1a1a] shrink-0">
        <div>
          <h2 className="text-[20px] font-bold text-white tracking-tight">Code Comparison</h2>
          <p className="text-[12px] text-[#a1a1aa] mt-0.5">
            Analyzing <span className="text-[#38bdf8] font-medium font-mono">dashboard-v2.tsx</span> performance regression between commits
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#262626] border border-[#3f3f46] rounded text-[11px] text-[#a1a1aa] font-medium">
            <svg className="w-3.5 h-3.5 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            Last Run: {results ? "Just now" : "2m ago"}
          </div>
          <button
            onClick={analyze}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-1.5 text-[12px] font-bold text-[#3b0764] bg-[#e9d5ff] hover:bg-[#d8b4fe] rounded transition-colors disabled:opacity-60"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-[#3b0764]/20 border-t-[#3b0764] rounded-full" style={{ animation: 'spin 0.6s linear infinite' }} />
            ) : (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
            Analyze Performance
          </button>
        </div>
      </div>

      {/* Editors Area */}
      <div className="flex-1 min-h-0 flex bg-[#1e1e1e]">
        <div className="flex-1 min-w-0 border-r border-[#333]">
          <CodeEditor
            value={codeA}
            onChange={setCodeA}
            label="VERSION A"
            filename="main/src/components/List.tsx"
            badge={getBadgeA()}
            color="#475569"
            textColor="#f1f5f9"
            badgeColor="#ef4444"
          />
        </div>
        <div className="flex-1 min-w-0">
          <CodeEditor
            value={codeB}
            onChange={setCodeB}
            label="VERSION B"
            filename="feature/opt-list/src/components/List.tsx"
            badge={getBadgeB()}
            color="#d946ef"
            textColor="#fff"
            badgeColor="#84cc16"
          />
        </div>
      </div>

      {/* Results Area */}
      <ComparisonPanel results={results} loading={loading} error={error} />
    </div>
  );
}
