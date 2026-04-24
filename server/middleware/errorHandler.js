/**
 * Centralized Express error handler.
 * Catches both esbuild errors (with .errors array) and generic errors.
 */
function errorHandler(err, _req, res, _next) {
  console.error("[ErrorHandler]", err.message || err);

  // esbuild build errors — return structured details
  if (err.errors && Array.isArray(err.errors)) {
    return res.status(422).json({
      error: "Code contains syntax or build errors.",
      details: err.errors.map((e) => ({
        text: e.text,
        line: e.location?.line,
        column: e.location?.column,
      })),
    });
  }

  const status = err.status || 500;
  const message = err.expose ? err.message : "Internal server error.";

  return res.status(status).json({ error: message });
}

module.exports = errorHandler;
