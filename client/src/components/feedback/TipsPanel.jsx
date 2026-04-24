import { VERSION_COLORS, TIP_SEVERITY } from "../../config/constants";

const WARNING_KEYWORDS = ["large", "high", "Avoid", "Long"];
const SUCCESS_KEYWORDS = ["well-optimized", "No major issues"];

function classifyTip(tip) {
  if (SUCCESS_KEYWORDS.some((kw) => tip.includes(kw))) return "success";
  if (WARNING_KEYWORDS.some((kw) => tip.includes(kw))) return "warning";
  return "info";
}

function collectTips(results) {
  const seen = new Set();
  const tips = [];
  for (const version of ["A", "B"]) {
    for (const tip of results[version]?.tips || []) {
      if (!seen.has(tip)) {
        seen.add(tip);
        tips.push({ tip, version });
      }
    }
  }
  return tips;
}

export default function TipsPanel({ results }) {
  if (!results) return null;
  const tips = collectTips(results);
  if (tips.length === 0) return null;

  return (
    <div className="border border-border rounded-lg overflow-hidden animate-fade-in">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-card border-b border-border">
        <span className="text-xs">⚡</span>
        <span className="text-[11px] font-bold text-text-muted uppercase tracking-[0.1em]">
          Optimization Tips
        </span>
        <span className="text-[10px] text-text-muted ml-auto">{tips.length}</span>
      </div>

      <div className="bg-surface-elevated divide-y divide-border">
        {tips.map(({ tip, version }, i) => {
          const severity = classifyTip(tip);
          const style = TIP_SEVERITY[severity];
          return (
            <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-surface-hover transition-colors">
              <span className="text-xs mt-0.5 shrink-0">{style.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-text-secondary leading-relaxed">{tip}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: VERSION_COLORS[version].primary }} />
                  <span className="text-[10px] text-text-muted">Version {version}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
