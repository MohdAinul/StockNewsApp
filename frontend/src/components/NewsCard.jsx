function NewsCard({ title, description, source, published, link }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="mb-3">
        <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {source}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-slate-800 leading-relaxed mb-4">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
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
