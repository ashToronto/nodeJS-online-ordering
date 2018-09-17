const express = require("express");
const PORT = 8080;
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
