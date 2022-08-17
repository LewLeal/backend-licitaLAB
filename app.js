const express = require("express");
const routes = require("app/routes");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

app.use((req, res) => {
  console.log(routes)
  res.status(404).json({ error: "page not found"});
})

app.use(cors());

module.exports = app;
