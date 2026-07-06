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

  const sourceFilteredNews = news.filter((article) => {
    if (selectedSource === "All Sources") {
      return true;
    }

    return article.source === selectedSource;
  });

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
        className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-slate-950" : "bg-slate-100"}`}
      >
        <div className="text-center">
          <p className="text-red-400 mb-3">{error}</p>
          <button
            onClick={fetchNews}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Try again
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
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sourceFilteredNews.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              source={item.source}
              published={item.published}
              description={item.description}
              link={item.link}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>

      <Footer darkMode={darkMode} newsCount={filteredNews.length} />
    </div>
  );
}

export default App;
