const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");
const os = require("os");
const config = require("../config");

const TEMP_PREFIX = "perf-analyzer-";

/**
 * Bundles a code string with esbuild and returns raw build metrics.
 *
 * @param {string} code  — Source code to bundle
 * @param {string} label — Filename label (e.g. "versionA")
 * @returns {Promise<{ bundleSize: number, buildTime: number, warnings: number, errors: number }>}
 */
async function bundle(code, label = "input") {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), TEMP_PREFIX));
  const entryFile = path.join(tmpDir, `${label}.jsx`);
  const outFile = path.join(tmpDir, `${label}.out.js`);

  try {
    fs.writeFileSync(entryFile, code, "utf-8");

    const start = performance.now();

    const result = await esbuild.build({
      entryPoints: [entryFile],
      outfile: outFile,
      bundle: true,
      write: true,
      ...config.ESBUILD,
    });

    const buildTime = parseFloat((performance.now() - start).toFixed(2));
    const bundleSize = fs.statSync(outFile).size;

    return { bundleSize, buildTime, warnings: result.warnings.length, errors: result.errors.length };
  } finally {
    cleanupDir(tmpDir);
  }
}

/** Safely remove a temp directory. */
function cleanupDir(dir) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch {
    // Non-critical — OS will clean up eventually
  }
}

module.exports = { bundle };
