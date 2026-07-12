import { useEffect, useState } from "react";
import NewsCard from "./components/NewsCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import TickerBar from "./components/TickerBar";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [visibleNews, setVisibleNews] = useState(20);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
    else if (savedTheme === "light") setDarkMode(false);
  }, []);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(savedBookmarks);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const sources = [
    "All Sources",
    ...new Set(news.map((article) => article.source)),
  ];
  const filteredNews = news.filter((article) => {
    return (
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.source.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sourceFilteredNews = filteredNews.filter((article) => {
    if (selectedSource === "All Sources") {
      return true;
    }

    return article.source === selectedSource;
  });

  const bookmarkFilteredNews = sourceFilteredNews.filter((article) =>
    bookmarks.includes(article.id),
  );

  const displayNews = showBookmarks
    ? bookmarkFilteredNews
    : sourceFilteredNews.slice(0, visibleNews);

  const fetchNews = () => {
    setRefreshing(true);
    fetch(`${API_URL}/news`)
      .then((response) => response.json())
      .then((data) => {
        const articles = Array.isArray(data) ? data : data.news || [];
        const updated = Array.isArray(data)
          ? new Date().toISOString()
          : data.lastUpdated || "";
        setNews(articles);
        setLastUpdated(updated);
        setLoading(false);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load news");
        setLoading(false);
        setRefreshing(false);
      });
  };
  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks((prev) => prev.filter((item) => item !== id));
    } else {
      setBookmarks((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center gap-4 ${
          darkMode
            ? "bg-linear-to-br from-slate-950 via-slate-900 to-slate-800"
            : "bg-slate-100"
        }`}
      >
        <div className="animate-pulse">
          <Logo size={48} />
        </div>
        <h2
          className={`text-xl font-semibold ${darkMode ? "text-slate-300" : "text-slate-600"}`}
        >
          Loading Market News...
        </h2>
      </div>
    );
  }
  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-slate-950" : "bg-slate-100"
        }`}
      >
        <div className="text-center max-w-md px-6">
          <div className="text-5xl mb-4">⚠️</div>

          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Unable to load market news
          </h2>

          <p
            className={`mt-3 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            Please check your internet connection or try again.
          </p>

          <button
            onClick={fetchNews}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-linear-to-br from-slate-950 via-slate-900 to-slate-800"
          : "bg-slate-100"
      }`}
    >
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        onRefresh={fetchNews}
        refreshing={refreshing}
        lastUpdated={lastUpdated}
      />
      <TickerBar
        darkMode={darkMode}
        apiUrl={API_URL}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sources={sources}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        showBookmarks={showBookmarks}
        setShowBookmarks={setShowBookmarks}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayNews.map((item) => (
            <NewsCard
              key={item.id}
              id={item.id}
              title={item.title}
              source={item.source}
              published={item.published}
              description={item.description}
              bookmarked={bookmarks.includes(item.id)}
              toggleBookmark={toggleBookmark}
              link={item.link}
              darkMode={darkMode}
            />
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mb-5 mt-4">
          Showing {displayNews.length} of{" "}
          {showBookmarks
            ? bookmarkFilteredNews.length
            : sourceFilteredNews.length}{" "}
          articles
        </p>

        {!showBookmarks && displayNews.length < sourceFilteredNews.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleNews((prev) => prev + 20)}
              className="px-6 py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Load More News
            </button>
          </div>
        )}
      </div>

      <Footer darkMode={darkMode} newsCount={sourceFilteredNews.length} />
    </div>
  );
}

export default App;
