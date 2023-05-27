require("dotenv").config();
const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.send("Running!");
});

app.get("/", (req, res) => {
  axios;
  res.send("Hello World!");
});

function keepAlive() {
  app.listen(3000, () => {
    console.log(new Date(), `| server.js | Server is Ready!`);
  });
}

module.exports = keepAlive;
