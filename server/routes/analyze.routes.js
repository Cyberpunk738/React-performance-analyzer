const { Router } = require("express");
const { analyzeVersion, compareResults } = require("../services/analyzer.service");
const validateAnalysis = require("../middleware/validateAnalysis");

const router = Router();

/**
 * POST /api/analyze
 * Accepts { codeA: string, codeB?: string }.
 * Returns analysis metrics for each version plus an optional comparison.
 */
router.post("/", validateAnalysis, async (req, res, next) => {
  try {
    const { codeA, codeB } = req.cleanBody;

    const resultA = await analyzeVersion(codeA, "versionA");

    const response = { A: resultA };

    if (codeB) {
      const resultB = await analyzeVersion(codeB, "versionB");
      response.B = resultB;
      response.comparison = compareResults(resultA, resultB);
    }

    return res.json(response);
  } catch (err) {
    next(err); // Delegates to centralized errorHandler
  }
});

module.exports = router;
