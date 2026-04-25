/**
 * ComparisonPanel — Bottom metrics panel.
 * Only shows real data from the API. No fake/hardcoded metrics.
 */
export default function ComparisonPanel({ results, loading }) {
  // Loading skeleton
  if (loading) {
    return (
      <div className="border-t border-[#333333] bg-[#121212] flex flex-col shrink-0">
        <StatusBar label="Analyzing..." spinning />
        <div className="grid grid-cols-4 gap-gutter bg-[#333333] p-gutter h-28">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface-container p-panel-padding flex flex-col justify-center gap-sm">
              <div className="w-20 h-2 bg-surface-container-high rounded animate-pulse" />
              <div className="w-14 h-6 bg-surface-container-high rounded animate-pulse" />
              <div className="w-28 h-2 bg-surface-container-high rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (!results) {
    return (
      <div className="border-t border-[#333333] bg-[#121212] flex flex-col shrink-0">
        <StatusBar />
        <div className="h-20 flex items-center justify-center gap-xs text-body-xs text-slate-500">
          <span className="material-symbols-outlined text-sm">play_arrow</span>
          Click "Analyze Performance" to compare your code
        </div>
      </div>
    );
  }

  // Results view
  const hasB = !!results.B;
  const comp = results.comparison;
  const a = results.A;
  const b = hasB ? results.B : a;

  const sizeA = formatBytes(a.bundleSize);
  const sizeB = formatBytes(b.bundleSize);

  // Collect all tips from both versions
  const allTips = [...(a.tips || []), ...(b?.tips || [])];
  const uniqueTips = [...new Set(allTips)];

  return (
    <div className="border-t border-[#333333] bg-[#121212] flex flex-col shrink-0 animate-fade-in">
      {/* Status bar with inline A→B comparison */}
      <StatusBar>
        {hasB && (
          <div className="flex-1 flex justify-center gap-xl">
            <InlineMetric label="Build Time" valA={`${a.buildTime.toFixed(1)}ms`} valB={`${b.buildTime.toFixed(1)}ms`} better={comp?.timeWinner === "B"} />
            <InlineMetric label="Bundle Size" valA={sizeA} valB={sizeB} better={comp?.sizeWinner === "B"} />
          </div>
        )}
      </StatusBar>

      {/* Metric cards — real data only */}
      <div className="grid grid-cols-4 gap-gutter bg-[#333333] p-gutter">
        {/* 1. Bundle Size */}
        <MetricCard
          label="BUNDLE SIZE"
          value={hasB ? formatBytesShort(b.bundleSize).val : formatBytesShort(a.bundleSize).val}
          unit={hasB ? formatBytesShort(b.bundleSize).unit : formatBytesShort(a.bundleSize).unit}
          color="text-primary"
          icon={hasB && comp ? (comp.sizeWinner === "B" ? "arrow_downward" : comp.sizeWinner === "A" ? "arrow_upward" : "remove") : "info"}
          subtext={
            hasB && comp
              ? comp.sizeWinner === "B" ? `${((comp.sizeDiff / a.bundleSize) * 100).toFixed(0)}% smaller than A`
              : comp.sizeWinner === "A" ? `${((comp.sizeDiff / b.bundleSize) * 100).toFixed(0)}% larger than A`
              : "No significant change"
              : "Minified output size"
          }
          subtextColor={hasB && comp?.sizeWinner === "B" ? "text-tertiary" : hasB && comp?.sizeWinner === "A" ? "text-error" : "text-slate-500"}
        />

        {/* 2. Build Time */}
        <MetricCard
          label="BUILD TIME"
          value={b.buildTime.toFixed(1)}
          unit="ms"
          color="text-secondary"
          icon={hasB && comp ? (comp.timeWinner === "B" ? "arrow_downward" : comp.timeWinner === "A" ? "arrow_upward" : "remove") : "schedule"}
          subtext={
            hasB && comp
              ? Math.abs(comp.timeDiff) < 1 ? "No significant change"
              : comp.timeWinner === "B" ? `${comp.timeDiff.toFixed(1)}ms faster`
              : `${comp.timeDiff.toFixed(1)}ms slower`
              : "Wall-clock build time"
          }
          subtextColor={hasB && comp?.timeWinner === "B" ? "text-tertiary" : hasB && comp?.timeWinner === "A" ? "text-error" : "text-slate-500"}
        />

        {/* 3. Warnings */}
        <MetricCard
          label="WARNINGS"
          value={a.warnings + (b?.warnings || 0)}
          unit=""
          color={a.warnings + (b?.warnings || 0) === 0 ? "text-tertiary" : "text-error"}
          icon={a.warnings + (b?.warnings || 0) === 0 ? "check_circle" : "warning"}
          subtext={a.warnings + (b?.warnings || 0) === 0 ? "Clean build" : "Review esbuild warnings"}
          subtextColor={a.warnings + (b?.warnings || 0) === 0 ? "text-tertiary" : "text-error"}
        />

        {/* 4. Optimization Tips */}
        <MetricCard
          label="OPTIMIZATION TIPS"
          value={uniqueTips.length}
          unit={uniqueTips.length === 1 ? "tip" : "tips"}
          color={uniqueTips.length <= 1 ? "text-tertiary" : "text-primary-fixed-dim"}
          icon={uniqueTips.length <= 1 ? "verified" : "lightbulb"}
          subtext={uniqueTips.length > 0 ? uniqueTips[0] : "No suggestions"}
          subtextColor="text-slate-500"
          truncate
        />
      </div>

      {/* Tips detail row — only shows if there are actionable tips */}
      {uniqueTips.length > 1 && (
        <div className="px-lg py-2.5 border-t border-[#333333] bg-surface-container flex flex-col gap-1.5">
          <span className="font-label-caps text-[9px] text-slate-600">All Optimization Suggestions</span>
          {uniqueTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-xs text-body-xs text-slate-400">
              <span className="material-symbols-outlined text-xs text-primary-fixed-dim mt-0.5 shrink-0">arrow_right</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


/* ─── Subcomponents ─── */

function StatusBar({ label, spinning, children }) {
  return (
    <div className="flex items-center px-lg py-2 border-b border-[#333333] bg-surface-container gap-lg">
      <div className="flex items-center gap-xs">
        <span className={`material-symbols-outlined text-xs text-secondary ${spinning ? "animate-spin" : ""}`}>
          {spinning ? "progress_activity" : "analytics"}
        </span>
        <span className="font-label-caps text-[10px]">{label || "Performance Metrics"}</span>
      </div>
      {children}
    </div>
  );
}

function InlineMetric({ label, valA, valB, better }) {
  return (
    <div className="flex items-center gap-sm text-body-xs">
      <span className="text-slate-500">{label}:</span>
      <span className="font-bold text-on-surface">{valA}</span>
      <span className={`material-symbols-outlined text-xs ${better ? "text-tertiary" : "text-slate-500"}`}>
        {better ? "trending_down" : "trending_flat"}
      </span>
      <span className={`font-bold ${better ? "text-tertiary" : "text-on-surface"}`}>{valB}</span>
    </div>
  );
}

function MetricCard({ label, value, unit, color, icon, subtext, subtextColor, truncate }) {
  return (
    <div className="bg-surface-container p-panel-padding flex flex-col justify-center gap-xs">
      <span className="text-slate-500 text-[10px] font-label-caps">{label}</span>
      <div className="flex items-baseline gap-sm">
        <span className={`text-display ${color}`}>{value}</span>
        {unit && <span className="text-body-xs text-slate-400 font-bold">{unit}</span>}
      </div>
      <div className={`flex items-center gap-xs text-[10px] ${subtextColor}`}>
        <span className="material-symbols-outlined text-xs shrink-0">{icon}</span>
        <span className={truncate ? "truncate" : ""}>{subtext}</span>
      </div>
    </div>
  );
}


/* ─── Helpers ─── */

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}

function formatBytesShort(bytes) {
  if (bytes >= 1024 * 1024) return { val: (bytes / (1024 * 1024)).toFixed(1), unit: "MB" };
  if (bytes >= 1024) return { val: (bytes / 1024).toFixed(1), unit: "KB" };
  return { val: bytes, unit: "B" };
}
