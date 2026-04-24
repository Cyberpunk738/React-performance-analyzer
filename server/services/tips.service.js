const { THRESHOLDS } = require("../config");

/**
 * Anti-pattern detection rules.
 * Each rule has a test (regex or function) and a message.
 */
const PATTERN_RULES = [
  {
    test: /JSON\.parse\(JSON\.stringify/,
    message: "Avoid JSON.parse(JSON.stringify()) for deep cloning — use structuredClone() instead.",
  },
  {
    test: /style=\{\{/,
    message: "Inline styles create new objects each render — consider CSS modules or styled-components.",
  },
  {
    test: /useEffect\(\s*\(\)\s*=>\s*\{[^}]*fetch/s,
    message: "Consider React Query or SWR for data fetching instead of raw useEffect + fetch.",
  },
  {
    test: /new Array\(\d{4,}\)/,
    message: "Large array allocations detected — consider lazy initialization or virtualization.",
  },
];

/**
 * Generates optimization tips based on bundle metrics and source code patterns.
 *
 * @param {number} bundleSize — Bundle size in bytes
 * @param {number} buildTime  — Build time in ms
 * @param {string} sourceCode — Original source code
 * @returns {string[]}
 */
function generateTips(bundleSize, buildTime, sourceCode) {
  const tips = [];

  // Metric-based tips
  if (bundleSize > THRESHOLDS.VERY_LARGE_BUNDLE) {
    tips.push("Bundle is very large — look for unused imports or heavy dependencies.");
  } else if (bundleSize > THRESHOLDS.LARGE_BUNDLE) {
    tips.push("Consider splitting this into smaller modules to reduce bundle size.");
  }

  if (buildTime > THRESHOLDS.SLOW_BUILD) {
    tips.push("Build time is high — simplify complex expressions or reduce file size.");
  }

  // Pattern-based tips
  for (const rule of PATTERN_RULES) {
    if (rule.test.test(sourceCode)) {
      tips.push(rule.message);
    }
  }

  // File length check
  if (sourceCode.split("\n").length > THRESHOLDS.LONG_FILE_LINES) {
    tips.push("This file is long — consider breaking it into smaller components.");
  }

  if (tips.length === 0) {
    tips.push("Code looks well-optimized. No major issues detected.");
  }

  return tips;
}

module.exports = { generateTips };
