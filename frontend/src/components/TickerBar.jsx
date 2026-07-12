import { useEffect, useState } from "react";

function TickerBar({
  darkMode,
  apiUrl,
  searchTerm,
  setSearchTerm,
  sources,
  selectedSource,
  setSelectedSource,
  showBookmarks,
  setShowBookmarks,
}) {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`${apiUrl}/ticker`);
      const data = await response.json();

      setQuotes(data);
    } catch (error) {
      console.log("Ticker Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();

    const timer = setInterval(fetchQuotes, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`border-y ${
        darkMode
          ? "bg-slate-900 border-slate-800"
          : "bg-slate-100 border-slate-200"
      }`}
    >
      {/* Ticker */}
      <div className="max-w-7xl mx-auto flex items-center gap-5 px-4 py-2 overflow-x-auto whitespace-nowrap">
        {loading ? (
          <p className="text-xs text-slate-500">Fetching market data...</p>
        ) : (
          quotes.map((item) => (
            <div key={item.symbol} className="flex items-center gap-2 shrink-0">
              <span
                className={`text-xs ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {item.label}
              </span>

              <span
                className={`text-sm font-semibold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {Number(item.price).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </span>

              <span
                className={`text-xs font-semibold ${
                  item.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.change >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(item.change).toFixed(2)}%
              </span>
            </div>
          ))
        )}
      </div>

      {/* Search + Filter */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-3 px-4 py-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title, company or source..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full h-11 rounded-lg border px-4 py-2 outline-none transition ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
            }`}
          />
        </div>
        <div className="flex gap-3">
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className={`w-full lg:w-60 h-11 rounded-xl border px-4 text-sm outline-none transition ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-white"
                : "bg-white border-slate-300 text-slate-900"
            }`}
          >
            {sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowBookmarks((prev) => !prev)}
            className={`h-11 px-5 rounded-xl border text-sm font-medium transition-all duration-300 ${
              showBookmarks
                ? "border-yellow-500 bg-yellow-500/15 text-yellow-400"
                : darkMode
                  ? "border-slate-700 bg-slate-800 text-slate-300 hover:border-yellow-500 hover:text-yellow-400"
                  : "border-slate-300 bg-white text-slate-700 hover:border-yellow-500 hover:text-yellow-600"
            }`}
          >
            {showBookmarks ? " Bookmarks" : "Bookmarks"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TickerBar;
