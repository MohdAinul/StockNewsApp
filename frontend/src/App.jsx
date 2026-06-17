import { useEffect, useState } from "react";
import NewsCard from "./components/NewsCard";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load news");
        setLoading(false);
      });
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
        darkMode ? "bg-slate-900" : "bg-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1
            className={`text-5xl font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            Stock News Hub
          </h1>

          <p
            className={`mt-3 ${darkMode ? "text-slate-300" : "text-slate-500"}`}
          >
            Real-Time Indian Stock Market News
          </p>

          <p className="text-sm text-slate-400 mt-2">
            {news.length} Latest Market Updates
          </p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
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
