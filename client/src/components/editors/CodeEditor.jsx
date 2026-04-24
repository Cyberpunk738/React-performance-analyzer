import Editor from "@monaco-editor/react";
import { EDITOR_OPTIONS } from "../../config/constants";

export default function CodeEditor({ value, onChange, label, badge, color, textColor, badgeColor, filename }) {
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Editor tab bar */}
      <div className="flex items-center justify-between h-[42px] px-4 bg-[#1e1e1e] border-b border-[#333]">
        <div className="flex items-center gap-3">
          <span
            className="text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded"
            style={{ backgroundColor: color, color: textColor }}
          >
            {label}
          </span>
          {filename && (
            <span className="text-[11px] font-mono text-[#a1a1aa]">{filename}</span>
          )}
        </div>

        {badge && (
          <div
            className="text-[9px] font-bold px-2.5 py-0.5 rounded text-right leading-tight"
            style={{
              color: badgeColor,
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)"
            }}
          >
            {badge.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}
      </div>

      {/* Editor body */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={value}
          onChange={(val) => onChange(val || "")}
          theme="vs-dark"
          options={{...EDITOR_OPTIONS, minimap: { enabled: false }, padding: { top: 16 } }}
        />
      </div>
    </div>
  );
}
