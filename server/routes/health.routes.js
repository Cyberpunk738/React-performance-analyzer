const { Router } = require("express");

const router = Router();

/** GET /api/health — basic liveness check. */
router.get("/", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

module.exports = router;
