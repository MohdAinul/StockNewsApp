import { useEffect, useState } from "react";
import NewsCard from "./components/NewsCard";

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
      <p style={{ color: "gray" }}>{news.length} Latest Market Updates</p>

      {news.map((item) => (
        <NewsCard
          key={item.id}
          title={item.title}
          source={item.source}
          published={item.published}
          link={item.link}
        />
      ))}
    </div>
  );
}

export default App;
