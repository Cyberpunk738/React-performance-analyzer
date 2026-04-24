/** Version color tokens — single source of truth for A/B styling. */
export const VERSION_COLORS = {
  A: {
    primary: "#7c3aed",
    gradient: "from-[#7c3aed] to-[#8b5cf6]",
    glow: "rgba(124, 58, 237, 0.12)",
    border: "rgba(124, 58, 237, 0.3)",
    textClass: "text-[#7c3aed]",
  },
  B: {
    primary: "#06b6d4",
    gradient: "from-[#06b6d4] to-[#22d3ee]",
    glow: "rgba(6, 182, 212, 0.12)",
    border: "rgba(6, 182, 212, 0.3)",
    textClass: "text-[#06b6d4]",
  },
};

/** Chart color constants. */
export const CHART_COLORS = {
  grid: "rgba(255, 255, 255, 0.03)",
  axis: "rgba(255, 255, 255, 0.06)",
  tick: "#5c5c78",
  cursor: "rgba(255,255,255,0.02)",
};

/** Tip severity styles — data-driven severity classification. */
export const TIP_SEVERITY = {
  success: {
    icon: "✅",
    bg: "rgba(16, 185, 129, 0.05)",
    border: "rgba(16, 185, 129, 0.12)",
  },
  warning: {
    icon: "⚠️",
    bg: "rgba(245, 158, 11, 0.05)",
    border: "rgba(245, 158, 11, 0.12)",
  },
  info: {
    icon: "💡",
    bg: "rgba(99, 102, 241, 0.05)",
    border: "rgba(99, 102, 241, 0.12)",
  },
};

/** Default code loaded into editor A. */
export const DEFAULT_CODE_A = `import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`;

/** Default code loaded into editor B. */
export const DEFAULT_CODE_B = `import React, { useMemo, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  
  const doubled = useMemo(() => count * 2, [count]);

  return (
    <div>
      <h1>Count: {count} (x2: {doubled})</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`;

/** Monaco editor configuration. */
export const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 13,
  lineHeight: 22,
  padding: { top: 16, bottom: 16 },
  scrollBeyondLastLine: false,
  wordWrap: "on",
  tabSize: 2,
  renderLineHighlight: "line",
  smoothScrolling: true,
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: "on",
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  fontLigatures: true,
  bracketPairColorization: { enabled: true },
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  scrollbar: {
    verticalScrollbarSize: 5,
    horizontalScrollbarSize: 5,
    verticalSliderSize: 5,
  },
};
