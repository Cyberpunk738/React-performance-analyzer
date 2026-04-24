import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import AnalyzerPage from "./pages/AnalyzerPage";

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-surface text-text-primary overflow-hidden">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-hidden">
          <AnalyzerPage />
        </main>
      </div>
    </div>
  );
}
