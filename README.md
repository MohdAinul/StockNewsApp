# StockPe

StockPe is a full-stack web application that aggregates Indian stock market news from multiple financial RSS feeds into a single dashboard. The goal of the project is to provide a clean and lightweight interface for reading market news without visiting multiple websites.

The application fetches news from different financial publications, filters market-related articles, removes duplicates, and displays the latest updates in chronological order.

## Features

- Aggregates news from multiple RSS feeds
- Filters only stock market related articles
- Removes duplicate news from different publishers
- Live Nifty 50 and Sensex widget
- Dark and Light theme
- Theme persistence using Local Storage
- Manual news refresh
- Last updated timestamp
- Responsive design
- Custom SVG logo and favicon

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js

### Libraries

- rss-parser
- cors

## Project Structure

```
StockPe
│
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server
│   ├── index.js
│   └── package.json
│
└── README.md
```

## Getting Started

Clone the repository

```bash
git clone https://github.com/MohdAinul/StockPe.git
```

Go to the project directory

```bash
cd StockPe
```

Install frontend dependencies

```bash
cd client
npm install
```

Start the frontend

```bash
npm run dev
```

Install backend dependencies

```bash
cd ../server
npm install
```

Start the backend

```bash
npm start
```

## Environment Variables

Create a `.env` file inside the frontend directory.

```env
VITE_API_URL=http://localhost:3000
```

For production:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## Data Sources

The application aggregates RSS feeds from several financial publications, including:

- Economic Times
- Moneycontrol
- LiveMint
- Hindu BusinessLine
- The Hindu
- NDTV Profit

Some feeds may occasionally become unavailable or block automated requests, so the available articles may vary over time.

## How It Works

1. The Express server fetches RSS feeds.
2. Each feed is parsed using `rss-parser`.
3. Articles are filtered using market-specific keywords.
4. Duplicate headlines are removed.
5. Articles are sorted by publication time.
6. The backend returns a JSON response.
7. The React frontend renders the news cards.

## Challenges

While building the project, I encountered several practical issues:

- Handling CORS between frontend and backend
- RSS feeds returning 400 or 403 responses
- Different RSS feeds exposing different fields
- Removing duplicate articles
- Filtering only stock market related news
- Deploying frontend and backend separately
- Persisting application theme across sessions

These issues provided practical experience working with external data sources and production deployment.

## What I Learned

This project helped me gain practical experience with:

- React Components
- Props
- useState
- useEffect
- Conditional Rendering
- Local Storage
- REST APIs
- Express.js
- RSS Parsing
- Environment Variables
- Responsive Design
- Git and GitHub
- Frontend and Backend Deployment

## Future Improvements

- Search functionality
- Filter news by source
- Bookmark articles
- AI-generated news summaries
- Auto refresh
- Company-specific news pages
- Market heatmap
- Watchlist

## 📸 Screenshots

### 🏠 Home

![Home](screenshots/home.png)

## License

This project is licensed under the MIT License.

## Author

Mohd Ainul

Computer Science Engineering Student

GitHub: https://github.com/MohdAinul
