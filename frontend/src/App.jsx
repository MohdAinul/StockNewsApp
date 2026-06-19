import { useEffect, useState } from "react";
import NewsCard from "./components/NewsCard";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const toggleTheme = () => {
    setDarkMode(!darkMode);

    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    } else if (savedTheme === "light") {
      setDarkMode(false);
    }
  }, []);

  const fetchNews = () => {
    fetch(`${API_URL}/news`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.news);
        setLastUpdated(data.lastUpdated);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load news");
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-slate-600">
          Loading Market News...
        </h2>
      </div>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
          : "bg-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-14">
          <h1
            className={`text-5xl md:text-6xl font-extrabold tracking-tight ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Stock News Hub
          </h1>
          <div
            className={`inline-block px-4 py-1 rounded-full text-sm mt-4 ${
              darkMode
                ? "bg-slate-800 text-slate-300"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            Live News Aggregator 🚀
          </div>

          <p
            className={`mt-3 ${darkMode ? "text-slate-300" : "text-slate-500"}`}
          >
            Real-Time Indian Stock Market News
          </p>

          <p
            className={`text-sm mt-2 ${
              darkMode ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {news.length} Latest Market Updates
          </p>
          <p
            className={`text-sm mt-2 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Last Updated:{" "}
            {lastUpdated
              ? new Date(lastUpdated).toLocaleTimeString("en-IN")
              : "-"}
          </p>
          <button
            onClick={fetchNews}
            className="mt-4 ml-3 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            🔄 Refresh News
          </button>
          <button
            onClick={toggleTheme}
            className={`mt-6 px-5 py-3 rounded-full font-medium transition-all duration-300 ${
              darkMode
                ? "bg-slate-700 text-white hover:bg-slate-600"
                : "bg-white text-slate-800 shadow hover:bg-slate-200"
            }`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
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
    </div>
  );
}

export default App;
