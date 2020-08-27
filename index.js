const express = require("express");
const formidableMiddleware = require("express-formidable");
var cors = require("cors");

const app = express();

app.use(formidableMiddleware());
app.use(cors());

const marvelRoutes = require("./routes/marvel");

app.use(marvelRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome on Marvel API" });
});

app.all("*", (req, res) => {
  res.json({ message: "this page does not exist" });
});

app.listen(process.env.PORT, () => console.log("Server started"));
