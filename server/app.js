const express = require("express");
const cors = require("cors");
const config = require("./config");
const errorHandler = require("./middleware/errorHandler");
const analyzeRoutes = require("./routes/analyze.routes");
const healthRoutes = require("./routes/health.routes");

/** Creates and configures the Express application. */
function createApp() {
  const app = express();

  // ── Global middleware ──
  app.use(cors());
  app.use(express.json({ limit: config.BODY_LIMIT }));

  // ── Routes ──
  app.use("/api/analyze", analyzeRoutes);
  app.use("/api/health", healthRoutes);

  // ── Error handler (must be registered last) ──
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
