const express = require("express");
const Parser = require("rss-parser");
const cors = require("cors");

const app = express();
const parser = new Parser();

const PORT = 3000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Stock News API Running");
});
app.get("/news", async (req, res) => {
  try {
    const feed = await parser.parseURL(
      "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
    );
    const news = feed.items.slice(0, 5).map((item, index) => ({
      id: index + 1,
      title: item.title,
      source: "Economic Times",
      published: item.pubDate,
    }));

    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch news",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
