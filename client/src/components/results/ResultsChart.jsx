import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, Legend,
} from "recharts";
import { VERSION_COLORS } from "../../config/constants";

const CHART_THEME = {
  grid: "#1c1c1c",
  axis: "#1c1c1c",
  tick: "#555",
};

export default function ResultsChart({ results }) {
  if (!results) return null;

  const hasComparison = !!results.B;

  const sizeData = hasComparison
    ? [{ name: "Bundle Size", A: results.A.bundleSize, B: results.B.bundleSize }]
    : [{ name: "Bundle Size", value: results.A.bundleSize }];

  const timeData = hasComparison
    ? [{ name: "Build Time", A: results.A.buildTime, B: results.B.buildTime }]
    : [{ name: "Build Time", value: results.A.buildTime }];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden animate-fade-in">
      <ChartPane title="Bundle Size (bytes)" data={sizeData} hasComparison={hasComparison} unit="B" />
      <ChartPane title="Build Time (ms)" data={timeData} hasComparison={hasComparison} unit="ms" />
    </div>
  );
}

function ChartPane({ title, data, hasComparison, unit }) {
  return (
    <div className="bg-surface-elevated p-5">
      <h3 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.1em] mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_THEME.grid} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: CHART_THEME.tick, fontSize: 11 }} axisLine={{ stroke: CHART_THEME.axis }} tickLine={false} />
          <YAxis tick={{ fill: CHART_THEME.tick, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}${unit}`} width={48} />
          <Tooltip content={<ChartTooltip unit={unit} />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
          {hasComparison ? (
            <>
              <Legend formatter={(v) => <span className="text-[11px] text-text-muted ml-1">Version {v}</span>} iconType="circle" iconSize={7} />
              <Bar dataKey="A" name="A" fill={VERSION_COLORS.A.primary} radius={[4, 4, 0, 0]} maxBarSize={44} />
              <Bar dataKey="B" name="B" fill={VERSION_COLORS.B.primary} radius={[4, 4, 0, 0]} maxBarSize={44} />
            </>
          ) : (
            <Bar dataKey="value" fill={VERSION_COLORS.A.primary} radius={[4, 4, 0, 0]} maxBarSize={44}>
              <Cell fill={VERSION_COLORS.A.primary} />
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ChartTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-card border border-border rounded-lg px-3 py-2 shadow-xl">
      <p className="text-[11px] font-semibold text-white mb-1">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-[11px] text-text-secondary">
            {entry.name}: <span className="font-semibold text-white">{entry.value.toLocaleString()}{unit}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
