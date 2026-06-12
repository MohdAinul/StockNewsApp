function NewsCard({ title, source, published, link }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: "10px",
        textAlign: "left",
      }}
    >
      <h3
        style={{
          marginBottom: "12px",
          lineHeight: "1.5",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#888",
          margin: "4px 0",
        }}
      >
        {source}
      </p>

      <p
        style={{
          color: "#888",
          margin: "4px 0 12px 0",
        }}
      >
        {new Date(published).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        style={{
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Read More →
      </a>
    </div>
  );
}

export default NewsCard;
