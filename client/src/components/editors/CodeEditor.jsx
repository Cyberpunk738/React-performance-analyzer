import Editor from "@monaco-editor/react";
import { EDITOR_OPTIONS } from "../../config/constants";

export default function CodeEditor({ value, onChange, version, filename, results }) {
  const isA = version === "A";
  const versionResult = results?.[version];

  const getBadge = () => {
    if (!versionResult) return null;
    const size = formatBytes(versionResult.bundleSize);
    if (!isA && results?.comparison) {
      const pct = ((results.comparison.sizeDiff / results.A.bundleSize) * 100).toFixed(0);
      const sign = results.comparison.sizeWinner === "B" ? "-" : "+";
      return `${size} (${sign}${pct}%)`;
    }
    return size;
  };

  const badge = getBadge();

  return (
    <>
      {/* Tab header */}
      <div className={`flex items-center justify-between px-md py-sm shrink-0 ${
        isA
          ? "bg-surface-container-low border-b border-[#333333]"
          : "bg-primary/5 border-b border-primary/30"
      }`}>
        <div className="flex items-center gap-sm">
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
            isA ? "bg-slate-700 text-white" : "bg-primary text-on-primary"
          }`}>
            {isA ? "VERSION A" : "VERSION B"}
          </span>
          <span className={`text-body-xs font-code-sm ${isA ? "text-slate-400" : "text-primary"}`}>
            {filename}
          </span>
        </div>
        <div className="flex items-center gap-sm">
          {versionResult && (
            <>
              <span className="text-[10px] font-mono text-slate-500">
                {versionResult.buildTime.toFixed(1)}ms
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                isA ? "text-error bg-error/10 border-error/20" : "text-tertiary bg-tertiary/10 border-tertiary/20"
              }`}>
                {badge}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Monaco editor */}
      <div className="flex-1 min-h-0 bg-[#1E1E1E]">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={value}
          onChange={(val) => onChange(val || "")}
          theme="vs-dark"
          options={{ ...EDITOR_OPTIONS, minimap: { enabled: false }, padding: { top: 16 } }}
          loading={
            <div className="flex items-center justify-center h-full text-slate-500 text-body-xs">
              Loading editor...
            </div>
          }
        />
      </div>
    </>
  );
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}
