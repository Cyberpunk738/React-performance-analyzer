const { bundle } = require("./bundler.service");
const { generateTips } = require("./tips.service");

/**
 * Analyzes a single code snippet — bundles it and generates optimization tips.
 *
 * @param {string} code  — Source code string
 * @param {string} label — Version label for temp files
 * @returns {Promise<{ bundleSize: number, buildTime: number, warnings: number, errors: number, tips: string[] }>}
 */
async function analyzeVersion(code, label) {
  const metrics = await bundle(code, label);
  const tips = generateTips(metrics.bundleSize, metrics.buildTime, code);

  return { ...metrics, tips };
}

/**
 * Compares two analysis results and determines winners.
 *
 * @param {{ bundleSize: number, buildTime: number }} resultA
 * @param {{ bundleSize: number, buildTime: number }} resultB
 * @returns {{ sizeWinner: string, timeWinner: string, sizeDiff: number, timeDiff: number }}
 */
function compareResults(resultA, resultB) {
  return {
    sizeWinner: resultA.bundleSize <= resultB.bundleSize ? "A" : "B",
    timeWinner: resultA.buildTime <= resultB.buildTime ? "A" : "B",
    sizeDiff: Math.abs(resultA.bundleSize - resultB.bundleSize),
    timeDiff: parseFloat(Math.abs(resultA.buildTime - resultB.buildTime).toFixed(2)),
  };
}

module.exports = { analyzeVersion, compareResults };
