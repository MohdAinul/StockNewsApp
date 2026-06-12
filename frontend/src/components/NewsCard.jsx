function NewsCard({ title, source, published }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{source}</p>
      <p>{published}</p>
      <hr />
    </div>
  );
}

export default NewsCard;
