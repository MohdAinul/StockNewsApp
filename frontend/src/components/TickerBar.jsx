import { useEffect, useState } from "react";

const TICKERS = [
  { symbol: "%5ENSEI", label: "NIFTY 50" },
  { symbol: "%5EBSESN", label: "SENSEX" },
  { symbol: "%5ENSEBANK", label: "BANK NIFTY" },
];

function TickerBar({ darkMode, apiUrl }) {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Market Data
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

  // Load once + Refresh every 1 minute
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
        {/* Live Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-green-500">LIVE</span>
        </div>

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
      </div>
    </div>
  );
}

export default TickerBar;
