import Logo from "./Logo";

function Footer({ darkMode, newsCount }) {
  const sources = [
    "Economic Times",
    "Moneycontrol",
    "LiveMint",
    "BusinessLine",
    "The Hindu",
    "NDTV Profit",
    "Zee Business",
  ];

  return (
    <footer
      className={`mt-20 border-t transition-colors duration-300 ${
        darkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Logo size={28} />
              <span
                className={`font-extrabold text-lg ${darkMode ? "text-white" : "text-slate-900"}`}
              >
                Stock<span className="text-blue-500">Pe</span>
              </span>
            </div>
            <p
              className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-500"}`}
            >
              Aggregating Indian stock market news from leading financial
              publications and market feeds. Filtered to focus on stocks, IPOs,
              markets, and investing.
            </p>
          </div>

          {/* Sources */}
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-4 ${darkMode ? "text-slate-500" : "text-slate-400"}`}
            >
              News Sources
            </p>
            <ul className="space-y-1.5">
              {sources.map((s) => (
                <li
                  key={s}
                  className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-4 ${darkMode ? "text-slate-500" : "text-slate-400"}`}
            >
              Live Stats
            </p>
            <div className="space-y-4">
              <div>
                <p
                  className={`text-3xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  {newsCount}
                </p>
                <p
                  className={`text-xs mt-0.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                >
                  articles right now
                </p>
              </div>
              <div>
                <p
                  className={`text-3xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  {sources.length}+
                </p>
                <p
                  className={`text-xs mt-0.5 ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                >
                  trusted sources
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-500">Live</p>
                <p
                  className={`text-xs mt-0.5 ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  RSS-powered updates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-3 text-xs ${
            darkMode
              ? "border-slate-800 text-slate-600"
              : "border-slate-200 text-slate-400"
          }`}
        >
          <p>© {new Date().getFullYear()} StockPe</p>

          <p>News sourced from public RSS feeds</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
