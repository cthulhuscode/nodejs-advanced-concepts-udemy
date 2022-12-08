const express = require("express");
const { Worker } = require("worker_threads");

const app = express();

app.get("/", (req, res) => {
  const worker = new Worker("./worker.js");
  worker.on("message", (data) => {
    res.json(data);
  });

  worker.postMessage("start!");
});

app.listen(3000, () => {
  console.log(`Server running at localhost:3000`);
});
