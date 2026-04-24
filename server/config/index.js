/** Centralized server configuration — all tunables in one place. */
module.exports = {
  PORT: process.env.PORT || 4000,

  /** Maximum request body size for code submissions. */
  BODY_LIMIT: "1mb",

  /** esbuild bundling options. */
  ESBUILD: {
    format: "esm",
    jsx: "automatic",
    minify: true,
    logLevel: "silent",
    /** Externalized packages — excluded from bundle measurement. */
    external: ["react", "react-dom", "react/jsx-runtime"],
  },

  /** Thresholds that trigger optimization tips. */
  THRESHOLDS: {
    LARGE_BUNDLE: 5000,
    VERY_LARGE_BUNDLE: 10000,
    SLOW_BUILD: 100,
    LONG_FILE_LINES: 200,
  },
};
