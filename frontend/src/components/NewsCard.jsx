function NewsCard({ title, source, published, link }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        marginBottom: "16px",
        borderRadius: "10px",
      }}
    >
      <h3>{title}</h3>

      <p>{source}</p>

      <p>{new Date(published).toLocaleString()}</p>

      <a href={link} target="_blank" rel="noreferrer">
        Read More →
      </a>
    </div>
  );
}

export default NewsCard;
