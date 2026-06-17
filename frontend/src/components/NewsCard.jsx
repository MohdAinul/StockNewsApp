function NewsCard({ title, description, source, published, link, darkMode }) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
        darkMode ? "bg-slate-800" : "bg-white"
      }`}
    >
      <div className="mb-3">
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {source}
        </span>
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
        <span className="text-sm text-slate-500">
          {new Date(published).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
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
