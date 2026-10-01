const express = require("express");
const cors = require("cors");
require("dotenv").config();

const creativeRoutes = require("./routes/creativeRoutes");
<<<<<<< HEAD
=======
const campaignRoutes = require("./routes/campaignRoutes");
>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/creatives", creativeRoutes);
<<<<<<< HEAD
=======
app.use("/api/campaigns", campaignRoutes);
>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)

app.get("/", (req, res) => {
  res.json({
    message: "InsightForge backend is running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
app.listen(PORT, () => {
  console.log(`InsightForge backend running on port ${PORT}`);
});
=======
const server = app.listen(PORT, () => {
  console.log(`InsightForge backend running on port ${PORT}`);
});

server.on("error", (error) => {
  console.error("SERVER ERROR:", error);
});

server.on("close", () => {
  console.log("SERVER CLOSED");
});

setInterval(() => {
  console.log("Backend still running...");
}, 10000);
>>>>>>> c177d63 (Connect campaign analytics and dashboard to backend)
