import { useEffect, useState } from "react";

const TICKERS = [
  { symbol: "%5ENSEI", label: "NIFTY 50" },
  { symbol: "%5EBSESN", label: "SENSEX" },
  { symbol: "%5ENSEBANK", label: "BANK NIFTY" },
  { symbol: "RELIANCE.NS", label: "RELIANCE" },
  { symbol: "TCS.NS", label: "TCS" },
  { symbol: "HDFCBANK.NS", label: "HDFC BANK" },
  { symbol: "INFY.NS", label: "INFOSYS" },
  { symbol: "SBIN.NS", label: "SBI" },
];

export default function TickerBar({ darkMode, apiUrl }) {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadQuotes() {
    try {
      const res = await fetch(`${apiUrl}/ticker`);
      const data = await res.json();
      setQuotes(data);
    } catch (e) {
      console.error("Ticker error:", e);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadQuotes();
    const id = setInterval(loadQuotes, 60000);
    return () => clearInterval(id);
  }, []);

  const bg = darkMode ? "#111827" : "#f1f5f9";
  const border = darkMode ? "#1e293b" : "#e2e8f0";
  const div = darkMode ? "#334155" : "#cbd5e1";

  return (
    <div
      style={{
        background: bg,
        borderTop: `0.5px solid ${border}`,
        borderBottom: `0.5px solid ${border}`,
        padding: "7px 20px",
        display: "flex",
        alignItems: "center",
        gap: 20,
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      {/* LIVE dot */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#22c55e",
            display: "inline-block",
            animation: "pulse 1.5s infinite",
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "#22c55e",
            letterSpacing: "0.05em",
          }}
        >
          LIVE
        </span>
      </div>

      <div style={{ width: 1, height: 14, background: div, flexShrink: 0 }} />

      {loading ? (
        <span style={{ fontSize: 11, color: "#64748b" }}>
          Fetching market data...
        </span>
      ) : quotes.length === 0 ? (
        <span style={{ fontSize: 11, color: "#64748b" }}>
          Market data unavailable
        </span>
      ) : (
        quotes.map((q, i) => (
          <div
            key={q.symbol}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexShrink: 0,
            }}
          >
            {i > 0 && <div style={{ width: 1, height: 14, background: div }} />}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontSize: 11,
                  color: darkMode ? "#94a3b8" : "#64748b",
                  fontWeight: 500,
                }}
              >
                {q.label}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: darkMode ? "#f1f5f9" : "#1e293b",
                }}
              >
                {Number(q.price).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: q.change >= 0 ? "#22c55e" : "#ef4444",
                }}
              >
                {q.change >= 0 ? "▲" : "▼"} {Math.abs(q.change).toFixed(2)}%
              </span>
            </div>
          </div>
        ))
      )}

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );
}
