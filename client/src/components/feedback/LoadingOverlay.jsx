export default function LoadingOverlay() {
  return (
    <div className="border border-border rounded-lg bg-surface-elevated p-10 flex flex-col items-center justify-center animate-fade-in">
      <div className="relative w-10 h-10 mb-5">
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent" style={{ animation: 'spin 0.8s linear infinite' }} />
      </div>
      <p className="text-[13px] font-semibold text-white mb-1">Analyzing...</p>
      <p className="text-[11px] text-text-muted">Bundling with esbuild</p>
      <div className="mt-5 w-48 space-y-1.5">
        <div className="h-1 rounded-full shimmer" />
        <div className="h-1 rounded-full shimmer w-3/4" />
      </div>
    </div>
  );
}
