import { useEffect, useState } from "react";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/news")
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load news");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading latest market news...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📈 Stock News App</h1>

      {news.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.source}</p>
          <p>{item.published}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
