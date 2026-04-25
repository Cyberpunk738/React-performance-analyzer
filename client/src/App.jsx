import AnalyzerPage from "./pages/AnalyzerPage";

export default function App() {
  return (
    <div className="font-body-sm overflow-hidden h-screen flex flex-col text-on-surface bg-background">
      {/* Header */}
      <header className="bg-[#1E1E1E] border-b border-[#333333] flex justify-between items-center w-full px-4 h-12 z-50 shrink-0">
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary-container text-[20px] mr-xs">bolt</span>
          <span className="text-lg font-black text-purple-400 tracking-tighter font-display">ReactPerf Analyzer</span>
        </div>
        <div className="flex items-center gap-xs text-body-xs text-slate-500">
          <span className="material-symbols-outlined text-sm text-tertiary">circle</span>
          <span>Backend connected</span>
        </div>
      </header>

      {/* Main content — no sidebar, full-width editor */}
      <main className="flex-1 flex flex-col bg-background overflow-hidden">
        <AnalyzerPage />
      </main>
    </div>
  );
}
