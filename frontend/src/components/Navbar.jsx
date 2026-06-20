function Navbar({ darkMode, toggleTheme, fetchNews, refreshing }) {
  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md border-b ${
        darkMode
          ? "bg-slate-900/80 border-slate-700"
          : "bg-white/80 border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📈</span>

          <h1
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-slate-800"
            }`}
          >
            StockPe
          </h1>
        </div>

        <div
          className={`hidden md:block text-sm ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Real-Time Indian Market News
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchNews}
            disabled={refreshing}
            className={`px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-slate-700 text-white"
                : "bg-slate-100 text-slate-800"
            }`}
          >
            {refreshing ? "⏳" : "🔄"}
          </button>

          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-slate-700 text-white"
                : "bg-slate-100 text-slate-800"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
