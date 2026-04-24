/**
 * Validates the POST /api/analyze request body.
 * Ensures codeA is a non-empty string, codeB is optional.
 */
function validateAnalysis(req, res, next) {
  const { codeA, codeB } = req.body;

  if (!codeA || typeof codeA !== "string" || codeA.trim().length === 0) {
    return res.status(400).json({
      error: "Version A code is required and must be a non-empty string.",
    });
  }

  // Normalize — attach cleaned inputs to req for downstream use
  req.cleanBody = {
    codeA: codeA,
    codeB: codeB && typeof codeB === "string" && codeB.trim().length > 0
      ? codeB
      : null,
  };

  next();
}

module.exports = validateAnalysis;
