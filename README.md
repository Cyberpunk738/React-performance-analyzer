<p align="center">
  <img src="client/public/favicon.svg" width="64" height="64" alt="React Perf Analyzer" />
</p>

<h1 align="center">React Performance Analyzer</h1>

<p align="center">
  <strong>Compare two versions of React/JavaScript code side-by-side and get instant performance metrics powered by esbuild.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat-square" alt="Node" />
  <img src="https://img.shields.io/badge/react-19.x-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/esbuild-0.20+-FFCF00?style=flat-square&logo=esbuild" alt="esbuild" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" />
</p>

---

## Overview

React Performance Analyzer is a developer tool that lets you paste two versions of React or JavaScript code into side-by-side Monaco editors, run a real esbuild bundle on each, and instantly compare:

- **Bundle size** (minified ESM output, in bytes)
- **Build time** (wall-clock milliseconds)
- **Winner detection** across both metrics
- **Optimization tips** based on static code pattern analysis

The backend bundles code through esbuild with React externalized, so measurements reflect your application code — not framework overhead.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Frontend Components](#frontend-components)
- [Configuration](#configuration)
- [How Analysis Works](#how-analysis-works)
- [Extending the Analyzer](#extending-the-analyzer)
- [Scripts Reference](#scripts-reference)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| **Node.js** (≥18) | Runtime |
| **Express 4** | HTTP server & routing |
| **esbuild** | Bundling engine — sub-10ms builds |
| **cors** | Cross-origin support for dev proxy |

### Frontend

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite 8** | Dev server & build tooling |
| **Tailwind CSS v4** | Utility-first styling via `@tailwindcss/vite` plugin |
| **Monaco Editor** | VS Code-grade code editing (`@monaco-editor/react`) |
| **Recharts** | Data visualization (bar charts) |
| **Axios** | HTTP client with timeout & interceptors |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                          Browser                                 │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐                               │
│  │  Monaco      │  │  Monaco      │  ← Side-by-side editors     │
│  │  Editor A    │  │  Editor B    │                               │
│  └──────┬───────┘  └──────┬───────┘                               │
│         │                  │                                      │
│         └──────┬───────────┘                                      │
│                │  onClick("Analyze")                              │
│                ▼                                                  │
│  ┌──────────────────────┐                                        │
│  │   useAnalyzer Hook   │  ← State management + API call         │
│  └──────────┬───────────┘                                        │
│             │  POST /api/analyze                                 │
└─────────────┼────────────────────────────────────────────────────┘
              │  (Vite proxy → localhost:4000)
              ▼
┌──────────────────────────────────────────────────────────────────┐
│                       Express Server                             │
│                                                                  │
│  ┌─────────────────┐                                             │
│  │ validateAnalysis │  ← Middleware: input validation             │
│  └────────┬────────┘                                             │
│           ▼                                                      │
│  ┌─────────────────┐     ┌──────────────────┐                    │
│  │ analyze.routes   │────▶│ analyzer.service │                    │
│  └─────────────────┘     └────────┬─────────┘                    │
│                                   │                              │
│                    ┌──────────────┼──────────────┐               │
│                    ▼              ▼               ▼              │
│           ┌──────────────┐ ┌───────────┐ ┌────────────┐         │
│           │bundler.service│ │tips.service│ │compareResults│        │
│           └──────┬───────┘ └───────────┘ └────────────┘         │
│                  │                                               │
│                  ▼                                               │
│           ┌──────────┐                                           │
│           │  esbuild  │  ← Minified ESM bundle                   │
│           └──────────┘                                           │
│                                                                  │
│  ┌──────────────┐                                                │
│  │ errorHandler  │  ← Catches all next(err) calls                │
│  └──────────────┘                                                │
└──────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User code (string)
  → writeFileSync to temp .jsx file
  → esbuild.build({ bundle, minify, format: "esm" })
  → Read output file size (bytes) + measure wall-clock time (ms)
  → Pattern-match source code for anti-patterns
  → Return { bundleSize, buildTime, warnings, errors, tips }
  → If two versions: compute comparison + winners
  → Cleanup temp directory
```

---

## Getting Started

### Prerequisites

- **Node.js ≥ 18** (uses `performance.now()`, `fs.rmSync`, and `--watch`)
- **npm ≥ 9**

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/react-performance-analyzer.git
cd react-performance-analyzer

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Running in Development

You need **two terminals** running simultaneously:

```bash
# Terminal 1 — Backend (port 4000)
cd server
npm run dev          # Uses node --watch for auto-restart

# Terminal 2 — Frontend (port 5173)
cd client
npm run dev          # Vite dev server with HMR
```

Open **http://localhost:5173** in your browser.

> **Note:** The Vite dev server automatically proxies `/api/*` requests to `localhost:4000`. No CORS configuration needed in development.

### Production Build

```bash
cd client
npm run build        # Output in client/dist/
npm run preview      # Preview production build locally
```

---

## Project Structure

```
react-performance-analyzer/
│
├── server/                          # ── Express Backend ──
│   ├── index.js                     # Entry point — starts the server (5 lines)
│   ├── app.js                       # Express app factory (testable, no side effects)
│   ├── config/
│   │   └── index.js                 # Centralized config: PORT, BODY_LIMIT, ESBUILD opts, THRESHOLDS
│   ├── middleware/
│   │   ├── errorHandler.js          # Global error handler (esbuild-aware)
│   │   └── validateAnalysis.js      # Request body validation + normalization
│   ├── routes/
│   │   ├── analyze.routes.js        # POST /api/analyze
│   │   └── health.routes.js         # GET /api/health
│   ├── services/
│   │   ├── analyzer.service.js      # Orchestrator: analyzeVersion() + compareResults()
│   │   ├── bundler.service.js       # esbuild bundling + temp file lifecycle
│   │   └── tips.service.js          # Data-driven optimization tip generation
│   └── package.json
│
├── client/                          # ── Vite + React Frontend ──
│   ├── index.html                   # HTML shell with SEO meta tags
│   ├── vite.config.js               # Tailwind v4 plugin + API proxy config
│   ├── public/
│   │   └── favicon.svg              # Gradient lightning bolt SVG
│   └── src/
│       ├── main.jsx                 # React DOM entry point
│       ├── App.jsx                  # Root layout (background + Header + page)
│       ├── index.css                # Tailwind theme tokens + animations + glass utilities
│       ├── config/
│       │   └── constants.js         # VERSION_COLORS, CHART_COLORS, DEFAULT_CODE, EDITOR_OPTIONS
│       ├── hooks/
│       │   └── useAnalyzer.js       # Custom hook: analysis state + actions
│       ├── services/
│       │   └── api.js               # Axios client (POST /api/analyze)
│       ├── pages/
│       │   └── AnalyzerPage.jsx     # Main page + page-specific layout primitives
│       └── components/
│           ├── layout/
│           │   └── Header.jsx       # Sticky header (LogoMark, StatusBadge, GitHubLink)
│           ├── editors/
│           │   └── CodeEditor.jsx   # Monaco wrapper (EditorHeader, VersionDot)
│           ├── results/
│           │   ├── ComparisonPanel.jsx  # Composition of OverallWinner + MetricCards
│           │   ├── MetricCard.jsx       # Per-metric card (VersionValue, DeltaIndicator)
│           │   ├── OverallWinner.jsx    # Winner banner / tie state
│           │   └── ResultsChart.jsx     # Recharts bar charts (ChartCard, ChartTooltip)
│           └── feedback/
│               ├── ErrorDisplay.jsx     # Error banner with esbuild syntax details
│               ├── LoadingOverlay.jsx   # Dual-ring spinner + shimmer skeleton
│               └── TipsPanel.jsx        # Severity-classified optimization tips
│
└── README.md
```

---

## API Reference

### `POST /api/analyze`

Analyzes one or two code versions and returns structured metrics.

**Request Body:**

```json
{
  "codeA": "import React from 'react';\n...",
  "codeB": "import React from 'react';\n..."   // optional
}
```

**Success Response (`200`):**

```json
{
  "A": {
    "bundleSize": 142,
    "buildTime": 8.34,
    "warnings": 0,
    "errors": 0,
    "tips": ["Code looks well-optimized. No major issues detected."]
  },
  "B": {
    "bundleSize": 198,
    "buildTime": 6.21,
    "warnings": 0,
    "errors": 0,
    "tips": ["Inline styles create new objects each render — consider CSS modules."]
  },
  "comparison": {
    "sizeWinner": "A",
    "timeWinner": "B",
    "sizeDiff": 56,
    "timeDiff": 2.13
  }
}
```

**Validation Error (`400`):**

```json
{
  "error": "Version A code is required and must be a non-empty string."
}
```

**Build Error (`422`):**

```json
{
  "error": "Code contains syntax or build errors.",
  "details": [
    { "text": "Unexpected token", "line": 5, "column": 12 }
  ]
}
```

### `GET /api/health`

Returns server liveness status.

```json
{
  "status": "ok",
  "timestamp": "2026-04-24T19:41:00.743Z"
}
```

---

## Frontend Components

### Component Hierarchy

```
App
├── Background layers (app-bg, dot-grid)
├── Header
│   ├── LogoMark (animated gradient + hover glow)
│   ├── StatusBadge ("esbuild powered" indicator)
│   └── GitHubLink
└── AnalyzerPage
    ├── HeroBar (title + Analyze button)
    ├── EditorGrid
    │   ├── CodeEditor (Version A)
    │   └── CodeEditor (Version B)
    ├── ResultsDivider (gradient line + label)
    ├── ErrorDisplay?
    ├── LoadingOverlay?
    └── Results?
        ├── ComparisonPanel
        │   ├── OverallWinner / TieBanner
        │   └── MetricCard × 2
        │       ├── VersionValue × 2
        │       └── DeltaIndicator
        ├── ResultsChart
        │   └── ChartCard × 2
        │       └── ChartTooltip
        └── TipsPanel
            └── TipRow × N
```

### Custom Hook: `useAnalyzer`

```javascript
const {
  codeA, codeB,           // Current editor values
  setCodeA, setCodeB,     // Editor change handlers
  results,                // Analysis response (null until analyzed)
  loading,                // Boolean — analysis in progress
  error,                  // Error object or null
  analyze,                // () => void — triggers analysis
  clearResults,           // () => void — resets results + error
  dismissError,           // () => void — clears error only
  hasOutput,              // Boolean — derived: results || loading || error
} = useAnalyzer(initialCodeA, initialCodeB);
```

---

## Configuration

### Backend (`server/config/index.js`)

| Key | Default | Description |
|-----|---------|-------------|
| `PORT` | `4000` | Server port (override via `PORT` env var) |
| `BODY_LIMIT` | `"1mb"` | Max request body size |
| `ESBUILD.format` | `"esm"` | Output format |
| `ESBUILD.minify` | `true` | Minification enabled |
| `ESBUILD.external` | `["react", "react-dom", ...]` | Packages excluded from bundle measurement |
| `THRESHOLDS.LARGE_BUNDLE` | `5000` | Bytes threshold for "consider splitting" tip |
| `THRESHOLDS.VERY_LARGE_BUNDLE` | `10000` | Bytes threshold for "look for unused imports" tip |
| `THRESHOLDS.SLOW_BUILD` | `100` | Milliseconds threshold for "build time is high" tip |
| `THRESHOLDS.LONG_FILE_LINES` | `200` | Line count threshold for "file is long" tip |

### Frontend (`client/src/config/constants.js`)

Exports: `VERSION_COLORS`, `CHART_COLORS`, `TIP_SEVERITY`, `DEFAULT_CODE_A`, `DEFAULT_CODE_B`, `EDITOR_OPTIONS`

### Vite Proxy (`client/vite.config.js`)

```javascript
server: {
  proxy: {
    '/api': 'http://localhost:4000',
  },
}
```

---

## How Analysis Works

1. **Receive code** — Express validates the request body via `validateAnalysis` middleware.
2. **Write temp file** — Source code is written to a temporary `.jsx` file in the OS temp directory.
3. **Bundle with esbuild** — Runs `esbuild.build()` with minification and ESM format. React packages are externalized so only user code is measured.
4. **Measure metrics** — `performance.now()` captures build time; `fs.statSync()` captures output file size.
5. **Generate tips** — Source code is scanned against a `PATTERN_RULES` array for common anti-patterns (inline styles, JSON deep clone, raw fetch in useEffect, large array allocations, long files).
6. **Compare** (if two versions) — Determines winner for each metric, calculates absolute diff.
7. **Cleanup** — Temp directory is removed in a `finally` block.

### Why esbuild?

- **Speed**: Cold builds complete in ~200ms, warm builds in <10ms
- **Accuracy**: Real bundling gives true minified output size, not estimates
- **JSX support**: Built-in JSX transform (`jsx: "automatic"`) — no Babel needed

### Measurement Notes

- The first analysis after server start includes esbuild's cold-start overhead (~200ms). Subsequent analyses are significantly faster.
- Bundle size reflects **minified ESM output** with React externalized — this isolates your component code's footprint.

---

## Extending the Analyzer

### Adding a New Optimization Tip

Open `server/services/tips.service.js` and add an entry to `PATTERN_RULES`:

```javascript
const PATTERN_RULES = [
  // ... existing rules
  {
    test: /document\.getElementById/,
    message: "Direct DOM access detected — prefer React refs (useRef) for DOM manipulation.",
  },
];
```

That's it. The rule engine picks it up automatically.

### Adding a New Metric

1. **Backend**: Compute the metric in `bundler.service.js` and return it in the result object.
2. **Frontend**: Add a new `MetricCard` in `ComparisonPanel.jsx` and a new `ChartCard` in `ResultsChart.jsx`.
3. **Comparison**: Add the winner logic in `analyzer.service.js` → `compareResults()`.

### Adding a New Endpoint

1. Create `server/routes/your-feature.routes.js`
2. Register it in `server/app.js`: `app.use("/api/your-feature", yourRoutes)`
3. Errors automatically flow through the centralized `errorHandler`

---

## Scripts Reference

### Backend (`server/`)

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `node index.js` | Production start |
| `dev` | `node --watch index.js` | Development with auto-restart |

### Frontend (`client/`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `vite` | Development server with HMR |
| `build` | `vite build` | Production build |
| `preview` | `vite preview` | Preview production build |

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `502 Bad Gateway` on Analyze | Backend not running | Start the backend: `cd server && node index.js` |
| `react-is` import error | Missing peer dependency | Run `npm install react-is` in `client/` |
| Stale Vite cache after installing deps | Vite pre-bundles dependencies on first run | Delete `client/node_modules/.vite` and restart |
| First analysis is slow (~200ms+) | esbuild cold start | Expected — subsequent analyses are <10ms |
| Monaco editor blank | Component hasn't loaded yet | Wait for Monaco CDN bundle to download (~2s on first load) |

---

## License

MIT © 2026
#   R e a c t - p e r f o r m a n c e - a n a l y z e r 
 
 