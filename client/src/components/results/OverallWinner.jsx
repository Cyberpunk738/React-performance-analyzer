import { VERSION_COLORS } from "../../config/constants";

export default function OverallWinner({ comparison }) {
  const aWins = (comparison.sizeWinner === "A" ? 1 : 0) + (comparison.timeWinner === "A" ? 1 : 0);
  const bWins = (comparison.sizeWinner === "B" ? 1 : 0) + (comparison.timeWinner === "B" ? 1 : 0);

  if (aWins === bWins) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface-card">
        <span className="text-xs">⚡</span>
        <span className="text-[12px] font-medium text-text-secondary">Tie — both versions perform equally</span>
      </div>
    );
  }

  const winner = aWins > bWins ? "A" : "B";
  const config = VERSION_COLORS[winner];

  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
      style={{
        backgroundColor: `${config.primary}08`,
        border: `1px solid ${config.primary}20`,
      }}
    >
      <span className="text-xs">🏆</span>
      <span className="text-[12px] font-semibold text-text-secondary">
        Version {winner} is the overall winner
      </span>
      <span
        className="text-[9px] font-bold px-2 py-0.5 rounded uppercase ml-1"
        style={{ color: config.primary, backgroundColor: `${config.primary}15` }}
      >
        WINNER
      </span>
    </div>
  );
}
