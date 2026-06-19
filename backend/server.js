const express = require("express");
const Parser = require("rss-parser");
const cors = require("cors");

const app = express();
const parser = new Parser();
const PORT = process.env.PORT || 3000;

app.use(cors());

// ─── Share Market RSS Feeds ───────────────────────────
const feeds = [
  {
    name: "Economic Times Markets",
    url: "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
  },
  {
    name: "Economic Times Stocks",
    url: "https://economictimes.indiatimes.com/markets/stocks/rssfeeds/2146842.cms",
  },
  {
    name: "Economic Times IPO",
    url: "https://economictimes.indiatimes.com/markets/ipos/fpos/rssfeeds/2143429.cms",
  },

  {
    name: "Moneycontrol Markets",
    url: "https://www.moneycontrol.com/rss/marketreports.xml",
  },
  {
    name: "Moneycontrol Latest News",
    url: "https://www.moneycontrol.com/rss/latestnews.xml",
  },

  {
    name: "LiveMint Markets",
    url: "https://www.livemint.com/rss/markets",
  },

  {
    name: "Business Standard Markets",
    url: "https://www.business-standard.com/rss/markets-106.rss",
  },

  {
    name: "CNBC TV18 Markets",
    url: "https://www.cnbctv18.com/commonfeeds/v1/eng/rss/market.xml",
  },

  {
    name: "Hindu BusinessLine Markets",
    url: "https://www.thehindubusinessline.com/markets/feeder/default.rss",
  },

  {
    name: "The Hindu Markets",
    url: "https://www.thehindu.com/business/markets/feeder/default.rss",
  },
  {
    name: "Zee Business",
    url: "https://www.zeebiz.com/latest.xml",
  },
  {
    name: "NDTV Profit",
    url: "https://feeds.feedburner.com/ndtvprofit-latest",
  },
];

// ─── Share Market Keyword Filter ─────────────────────────────────────────────
const MARKET_KEYWORDS = [
  "nifty",
  "sensex",
  "bse",
  "nse",
  "stock",
  "share",
  "equity",
  "market",
  "trading",
  "ipo",
  "listing",
  "fii",
  "dii",
  "fpi",
  "mutual fund",
  "etf",
  "smallcap",
  "midcap",
  "largecap",
  "bull",
  "bear",
  "rally",
  "selloff",
  "sell-off",
  "surges",
  "jumps",
  "rises",
  "falls",
  "drops",
  "slips",
  "gains",
  "plunges",
  "52-week",
  "all-time high",
  "all-time low",
  "quarterly results",
  "earnings",
  "net profit",
  "revenue",
  "dividend",
  "buyback",
  "bonus share",
  "rights issue",
  "split",
  "futures",
  "options",
  "derivatives",
  "f&o",
  "intraday",
  "open interest",
  "gold price",
  "crude oil",
  "silver price",
  "rupee",
  "sebi",
  "repo rate",
  "rbi rate",
  "monetary policy",
  "interest rate",
  "reliance",
  "tcs",
  "infosys",
  "hdfc",
  "icici bank",
  "sbi",
  "adani",
  "tata motors",
  "wipro",
  "bajaj finance",
  "kotak",
  "axis bank",
  "maruti",
  "ongc",
  "ntpc",
  "itc",
  "zomato",
  "paytm",
  "nykaa",
  "dmart",
  "irfc",
  "ireda",
  "nhpc",
];

const BLOCK_KEYWORDS = [
  "bollywood",
  "cricket score",
  "ipl score",
  "movie review",
  "recipe",
  "fashion",
  "travel",
  "lifestyle",
  "health tips",
  "election result",
  "crime",
  "weather forecast",
];

function isMarketNews(title) {
  const text = title.toLowerCase();
  if (BLOCK_KEYWORDS.some((w) => text.includes(w))) return false;
  return MARKET_KEYWORDS.some((w) => text.includes(w));
}

// ─── Routes ──────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.send("Stock News API Running — 11 feeds active");
});

app.get("/news", async (req, res) => {
  try {
    const allNews = [];

    for (const feedSource of feeds) {
      try {
        const feed = await parser.parseURL(feedSource.url);
        const news = feed.items
          .slice(0, 10)
          .filter((item) => isMarketNews(item.title || ""))
          .map((item, index) => ({
            id: item.guid || `${feedSource.name}-${index}`,
            title: item.title || "No Title",
            source: feedSource.name,
            description: item.contentSnippet || item.content || "",
            published: item.pubDate || item.isoDate || new Date().toISOString(),
            link: item.link || "#",
          }));

        console.log(`✓ ${feedSource.name}: ${news.length} items`);
        allNews.push(...news);
      } catch (error) {
        console.log(`✗ Failed: ${feedSource.name} — ${error.message}`);
      }
    }

    // Remove duplicate titles (exact match)
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

    console.log(`\nTotal unique market news: ${uniqueNews.length}\n`);
    res.json({
      totalNews: uniqueNews.length,
      lastUpdated: new Date().toISOString(),
      news: uniqueNews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`\nServer running on port ${PORT}`);
});
