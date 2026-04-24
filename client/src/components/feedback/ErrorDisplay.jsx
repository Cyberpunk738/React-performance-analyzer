export default function ErrorDisplay({ error, onDismiss }) {
  if (!error) return null;

  const message = typeof error === "string"
    ? error
    : error?.response?.data?.error || error?.message || "An unknown error occurred.";
  const details = error?.response?.data?.details;

  return (
    <div className="border border-[#2a1515] rounded-lg bg-danger-dim p-4 animate-fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-danger text-sm mt-0.5">✕</span>
          <div>
            <p className="text-[12px] font-bold text-danger mb-0.5">Analysis Failed</p>
            <p className="text-[12px] text-text-secondary">{message}</p>
            {details?.length > 0 && (
              <div className="mt-2 space-y-1">
                {details.map((d, i) => (
                  <p key={i} className="text-[11px] font-mono text-text-muted px-2 py-1 rounded bg-surface-card">
                    {d.line && <span className="text-danger mr-1.5">L{d.line}</span>}
                    {d.text}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-text-muted hover:text-white transition-colors text-sm">✕</button>
        )}
      </div>
    </div>
  );
}
