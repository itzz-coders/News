async function loadNews() {
  const container = document.getElementById("news-container");

  // Show loading message
  container.innerHTML = "<p>Loading news...</p>";

  try {
    const API_URL = "https://news-backend-2m1w.onrender.com/news";

    // ✅ Fetch data from backend
    const res = await fetch(API_URL);

    // ✅ Handle HTTP errors (like 404, 500)
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    container.innerHTML = "";

    // ✅ Check if data exists
    if (!data || data.length === 0) {
      container.innerHTML = "<p>No news available</p>";
      return;
    }

    // ✅ Render news cards
    data.forEach(article => {
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        ${article.urlToImage ? `<img src="${article.urlToImage}" alt="news image">` : ""}
        <h3>${article.title}</h3>
        <p>${article.description || "No description available"}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error("❌ Error:", error);

    container.innerHTML = `
      <p style="color:red;">
        ❌ Error loading news<br>
        Check backend or API
      </p>
    `;
  }
}

// ✅ Run function
loadNews();