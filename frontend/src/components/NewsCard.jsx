function NewsCard({ title, description, source, published, link, darkMode }) {
  const now = new Date();
  const publishedDate = new Date(published);
  const difference = now - publishedDate;
  const hoursDifference = difference / (1000 * 60 * 60);
  const isBreaking = hoursDifference >= 0 && hoursDifference <= 2;
  return (
    <div
      className={`rounded-2xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
        darkMode
          ? "bg-slate-800/70 border border-slate-700 backdrop-blur-sm"
          : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            darkMode
              ? "bg-blue-500/20 text-blue-300"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {source}
        </span>
        {isBreaking && (
          <span className="inline-block bg-red-600 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-md mb-2">
            Breaking
          </span>
        )}{" "}
      </div>
      <h3
        className={`text-lg font-semibold leading-relaxed mb-4 ${
          darkMode ? "text-white" : "text-slate-800"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed mb-4 ${
          darkMode ? "text-slate-300" : "text-gray-600"
        }`}
      >
        {description?.length > 120
          ? description.slice(0, 120) + "..."
          : description}
      </p>
      <div className="flex justify-between items-center">
        <span
          className={`text-xs ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {new Date(published).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}

          {"  "}

          {new Date(published).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 font-semibold hover:text-blue-800"
        >
          Read →
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
