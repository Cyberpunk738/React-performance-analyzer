import { VERSION_COLORS } from "../../config/constants";

/**
 * Metric card with monochrome styling for the expanded results view.
 */
export default function MetricCard({ label, icon, valueA, valueB, unit, winner }) {
  return (
    <div className="border border-border rounded-lg bg-surface-elevated p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs">{icon}</span>
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.1em]">{label}</span>
        </div>
        {winner && (
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded uppercase"
            style={{
              color: VERSION_COLORS[winner].primary,
              backgroundColor: `${VERSION_COLORS[winner].primary}15`,
              border: `1px solid ${VERSION_COLORS[winner].primary}30`,
            }}
          >
            {winner} wins
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <VersionValue version="A" value={valueA} unit={unit} isWinner={winner === "A"} />
        <VersionValue version="B" value={valueB} unit={unit} isWinner={winner === "B"} />
      </div>
    </div>
  );
}

function VersionValue({ version, value, unit, isWinner }) {
  const config = VERSION_COLORS[version];
  return (
    <div
      className="rounded-md p-3 transition-colors"
      style={{
        backgroundColor: isWinner ? `${config.primary}08` : '#0a0a0a',
        border: `1px solid ${isWinner ? `${config.primary}25` : '#1c1c1c'}`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.primary }} />
        <span className="text-[9px] text-text-muted font-semibold uppercase tracking-wider">
          Version {version}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-white tabular-nums">
          {typeof value === "number" ? value.toLocaleString() : "—"}
        </span>
        <span className="text-[10px] text-text-muted">{unit}</span>
      </div>
    </div>
  );
}
