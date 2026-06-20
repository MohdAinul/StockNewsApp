import Logo from "./Logo";

function Navbar({ darkMode, toggleTheme, onRefresh, refreshing, lastUpdated }) {
  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950/80 border-slate-800"
          : "bg-white/80 border-slate-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center gap-2.5">
          <Logo size={32} />
          <div className="flex items-center gap-2">
            <span
              className={`text-xl font-extrabold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Stock<span className="text-blue-500">Pe</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block"></span>
              LIVE
            </span>
          </div>
        </div>

        {/* Center — last updated */}
        <p
          className={`hidden md:block text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}
        >
          {lastUpdated
            ? `Updated ${new Date(lastUpdated).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`
            : "Indian Stock Market News"}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={refreshing}
            title="Refresh"
            className={`p-2 rounded-lg text-sm transition-colors disabled:opacity-40 ${
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
            className={`p-2 rounded-lg text-sm transition-colors ${
              darkMode
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
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
