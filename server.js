require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base URL
const BASE_URL = "https://newsapi.org/v2";

// ✅ Home route (test)
app.get("/", (req, res) => {
  res.send("✅ News API Server Running Successfully");
});

/* =========================
   🔥 ALL NEWS (Everything)
========================= */
app.get("/all-news", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 20;
    let search = req.query.q || "india";

    const url = `${BASE_URL}/everything?q=${search}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;

    const response = await axios.get(url);

    res.json({
      status: 200,
      success: true,
      message: "News fetched successfully",
      totalResults: response.data.totalResults,
      articles: response.data.articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch news",
      error: error.message,
    });
  }
});

/* =========================
   🔥 TOP HEADLINES
========================= */
app.get("/top-headlines", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 20;
    let category = req.query.category || "business";
    let country = req.query.country || "in";

    const url = `${BASE_URL}/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;

    const response = await axios.get(url);

    res.json({
      status: 200,
      success: true,
      message: "Top headlines fetched successfully",
      totalResults: response.data.totalResults,
      articles: response.data.articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch headlines",
      error: error.message,
    });
  }
});

/* =========================
   🌍 COUNTRY NEWS
========================= */
app.get("/country/:iso", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.pageSize) || 20;
    const country = req.params.iso;

    const url = `${BASE_URL}/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;

    const response = await axios.get(url);

    res.json({
      status: 200,
      success: true,
      message: `News for country: ${country}`,
      totalResults: response.data.totalResults,
      articles: response.data.articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch country news",
      error: error.message,
    });
  }
});

/* =========================
   🚀 START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});