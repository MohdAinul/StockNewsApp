import Logo from "./Logo";

function Navbar({ darkMode, toggleTheme, onRefresh, refreshing, lastUpdated }) {
  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        darkMode
          ? "bg-slate-950/80 border-slate-800"
          : "bg-white/80 border-slate-200"
      }`}
    >
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <Logo size={32} />

          <div className="flex items-center gap-2">
            <span
              className={`text-xl font-extrabold tracking-tight ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Stock<span className="text-blue-500">Pe</span>
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              LIVE
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={refreshing}
            title={refreshing ? "Refreshing..." : "Refresh News"}
            className={`p-2 rounded-lg transition-all duration-200 disabled:opacity-50 ${
              darkMode
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            <span className={refreshing ? "animate-spin inline-block" : ""}>
              🔄
            </span>
          </button>

          <button
            onClick={toggleTheme}
            title={darkMode ? "Light Mode" : "Dark Mode"}
            className={`p-2 rounded-lg transition-all duration-200 ${
              darkMode
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className={`border-t ${
          darkMode
            ? "border-slate-800 bg-slate-900 text-slate-400"
            : "border-slate-200 bg-slate-100 text-slate-600"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2 text-center text-xs">
          Updated:{" "}
          {lastUpdated
            ? new Date(lastUpdated).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Loading..."}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
