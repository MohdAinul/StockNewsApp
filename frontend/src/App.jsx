import { useEffect, useState } from "react";

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/news")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNews(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Stock News App</h1>

      {news.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.source}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
