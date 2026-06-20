import Logo from "./Logo";

function Footer({ darkMode, newsCount }) {
  return (
    <footer
      className={`mt-12 border-t transition-colors duration-300 ${
        darkMode ? "border-slate-800 bg-slate-950" : "border-slate-200 bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <Logo size={28} />

              <span
                className={`font-extrabold text-lg ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Stock<span className="text-blue-500">Pe</span>
              </span>
            </div>

            <p
              className={`text-sm leading-relaxed ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Aggregating Indian stock market news from trusted financial
              publications and RSS feeds. Focused on stocks, IPOs, markets and
              investing.
            </p>
          </div>

          {/* Stats */}
          <div>
            <p
              className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Live Stats
            </p>

            <div className="space-y-3">
              <div>
                <p
                  className={`text-3xl font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {newsCount}
                </p>

                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Articles Available
                </p>
              </div>

              <div>
                <p className="text-xl font-semibold text-blue-500">
                  Live RSS Updates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`mt-8 pt-5 border-t flex flex-col sm:flex-row justify-between items-center gap-2 text-xs ${
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
