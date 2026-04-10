const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Home route (test)
app.get("/", (req, res) => {
  res.send("✅ Server is running successfully!");
});

// ✅ Fetch US News directly (NO DATABASE)
app.get("/news", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );

    if (!response.data.articles) {
      return res.status(404).json({ message: "No news found" });
    }

    res.json(response.data.articles);

  } catch (error) {
    console.error("❌ Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// ✅ Start server (IMPORTANT for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {+
  console.log(`🚀 Server running on port ${PORT}`);
});