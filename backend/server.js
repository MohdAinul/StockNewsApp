const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Stock News API Running");
});

app.get("/news", (req, res) => {
  res.send("stock Market news");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
