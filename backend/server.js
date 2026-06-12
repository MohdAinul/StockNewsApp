const express = require("express");
const Parser = require("rss-parser");
const cors = require("cors");

const app = express();
const parser = new Parser();

const PORT = process.env.PORT || 3000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Stock News API Running");
});
app.get("/news", async (req, res) => {
  const feeds = [
    {
      name: "Economic Times",
      url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
    },
    {
      name: "LiveMint",
      url: "https://www.livemint.com/rss/markets",
    },
    {
      name: "Moneycontrol",
      url: "https://www.moneycontrol.com/rss/marketreports.xml",
    },
    {
      name: "Economic TImes",
      url: "https://economictimes.indiatimes.com/markets/stocks/rssfeeds/2146842.cms",
    },
    {
      name: "Trade Brains",
      url: "https://tradebrains.in/feed/",
    },
  ];

  try {
    const allNews = [];

    for (const feedSource of feeds) {
      try {
        const feed = await parser.parseURL(feedSource.url);

        const news = feed.items.slice(0, 5).map((item, index) => ({
          id: `${feedSource.name}-${index}`,
          title: item.title || "No Title",
          source: feedSource.name,
          published: item.pubDate || item.isoDate || new Date().toISOString(),
          link: item.link || "#",
        }));

        console.log(`Fetched ${news.length} news from ${feedSource.name}`);

        allNews.push(...news);
      } catch (error) {
        console.log(`Failed to fetch ${feedSource.name}`);
      }
    }

    // Remove duplicate titles
    const uniqueNews = [];
    const seenTitles = new Set();

    for (const article of allNews) {
      if (!seenTitles.has(article.title)) {
        seenTitles.add(article.title);
        uniqueNews.push(article);
      }
    }

    // Latest news first
    uniqueNews.sort((a, b) => new Date(b.published) - new Date(a.published));

    res.json(uniqueNews);
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
