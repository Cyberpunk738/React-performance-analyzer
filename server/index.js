const createApp = require("./app");
const { PORT } = require("./config");

const app = createApp();

app.listen(PORT, () => {
  console.log(`⚡ Performance Analyzer API running on http://localhost:${PORT}`);
});
