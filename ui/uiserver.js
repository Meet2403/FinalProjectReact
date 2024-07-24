const express = require("express");
const path = require('path');

const app = express();

app.use(express.static('public'));

const port = 3002;

app.listen(port, function () {
  console.log(`App started on ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});
