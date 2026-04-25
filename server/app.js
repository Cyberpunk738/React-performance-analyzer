const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config");
const errorHandler = require("./middleware/errorHandler");
const analyzeRoutes = require("./routes/analyze.routes");
const healthRoutes = require("./routes/health.routes");

/** Creates and configures the Express application. */
function createApp() {
  const app = express();

  // ── Global middleware ──
  app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
  app.use(express.json({ limit: config.BODY_LIMIT }));

  // ── Routes ──
  app.use("/api/analyze", analyzeRoutes);
  app.use("/api/health", healthRoutes);

  // ── Serve frontend in production ──
  if (process.env.NODE_ENV === "production") {
    const clientDist = path.join(__dirname, "..", "client", "dist");
    app.use(express.static(clientDist));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(clientDist, "index.html"));
    });
  }

  // ── Error handler (must be registered last) ──
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
