import { useEffect, useState } from "react";

function TickerBar({
  darkMode,
  apiUrl,
  searchTerm,
  setSearchTerm,
  sources,
  selectedSource,
  setSelectedSource,
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
      <div className="max-w-7xl mx-auto flex items-center gap-5 px-4 py-2 overflow-x-auto whitespace-nowrap">
        {/* Loading */}
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
        <div className="max-w-7xl mx-auto px-5 py-4">
          <input
            type="text"
            placeholder="search news"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className={`w-full rounded-lg border px-4 py-1 outline-none transition ${
              darkMode
                ? "bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                : "bg-white border-slate-300 text-slate-900 placeholder:text-slate-400"
            }`}
          />
        </div>
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className={`rounded-lg border px-3 py-2 text-sm outline-none ${
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
      </div>
    </div>
  );
}

export default TickerBar;
