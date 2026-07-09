import Logo from "./Logo";
import { RefreshCw, Sun, Moon } from "lucide-react";

function Navbar({ darkMode, toggleTheme, onRefresh, refreshing, lastUpdated }) {
  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950/95 border-slate-800"
          : "bg-white/95 border-slate-200"
      }`}
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <span
            className={`text-lg font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            Stock<span className="text-blue-500">Pe</span>
          </span>
        </div>

        {/* Last updated — center */}
        <p
          className={`text-xs tabular-nums ${darkMode ? "text-slate-500" : "text-slate-400"}`}
        >
          {lastUpdated
            ? `Updated ${new Date(lastUpdated).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`
            : "—"}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onRefresh}
            disabled={refreshing}
            title={refreshing ? "Refreshing..." : "Refresh"}
            className={`p-2 rounded-md transition-colors disabled:opacity-40 ${
              darkMode
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            }`}
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
          </button>

          <button
            onClick={toggleTheme}
            title={darkMode ? "Light mode" : "Dark mode"}
            className={`p-2 rounded-md transition-colors ${
              darkMode
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            }`}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
