const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "HRG_@#02072005",
  database: "News"
});

db.connect(err => {
  if (err) {
    console.error("MySQL Error:", err);
    return;
  }
  console.log("✅ MySQL Connected");
});

// ✅ Fetch US News & Store in DB
app.get("/fetch-news", async (req, res) => {
  try {
    const apiKey = "af5e1c06003c4654b571d2952c2b3702";

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );

    if (!response.data.articles) {
      return res.send("No articles found");
    }

    const articles = response.data.articles;

    // ✅ Clear old data
    db.query("DELETE FROM articles", (err) => {
      if (err) console.error("Delete Error:", err);
    });

    // ✅ Insert new data
    articles.forEach(article => {
      db.query(
        "INSERT INTO articles (title, description, url, urlToImage) VALUES (?, ?, ?, ?)",
        [
          article.title || "No title",
          article.description || "No description",
          article.url || "#",
          article.urlToImage || ""
        ],
        (err) => {
          if (err) console.error("Insert Error:", err);
        }
      );
    });

    res.send("✅ US News fetched and stored!");

  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).send("❌ Error fetching news");
  }
});

// ✅ Send data to frontend
app.get("/news", (req, res) => {
  db.query("SELECT * FROM articles", (err, results) => {
    if (err) {
      console.error("DB Fetch Error:", err);
      return res.status(500).send("Database error");
    }
    res.json(results);
  });
});

// ✅ Test route (IMPORTANT for debugging)
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// ✅ Start server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});