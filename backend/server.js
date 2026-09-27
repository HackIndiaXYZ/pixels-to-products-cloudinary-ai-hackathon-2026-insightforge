const express = require("express");
const cors = require("cors");
require("dotenv").config();

const creativeRoutes = require("./routes/creativeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/creatives", creativeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "InsightForge backend is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`InsightForge backend running on port ${PORT}`);
});