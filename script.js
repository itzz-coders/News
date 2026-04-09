async function loadNews() {
  const container = document.getElementById("news-container");

  container.innerHTML = "<p>Loading news...</p>";

  try {
    const res = await fetch("http://localhost:5000/news");
    const data = await res.json();

    container.innerHTML = "";

    if (!data || data.length === 0) {
      container.innerHTML = "<p>No news available</p>";
      return;
    }

    data.forEach(article => {
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        ${article.urlToImage ? `<img src="${article.urlToImage}">` : ""}
        <h3>${article.title}</h3>
        <p>${article.description || "No description available"}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Error loading news</p>";
  }
}

loadNews();