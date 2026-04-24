import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

/**
 * Analyze one or two code versions.
 * @param {string} codeA - Version A source code
 * @param {string} [codeB] - Version B source code (optional)
 * @returns {Promise<Object>} Analysis results
 */
export async function analyzeCode(codeA, codeB) {
  const payload = { codeA };
  if (codeB && codeB.trim().length > 0) {
    payload.codeB = codeB;
  }
  const { data } = await api.post("/analyze", payload);
  return data;
}

export default api;
