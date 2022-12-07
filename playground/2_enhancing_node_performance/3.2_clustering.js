process.env.UV_THREADPOOL_SIZE = 4;

const cluster = require("cluster");
cluster.schedulingPolicy = cluster.SCHED_RR;
const cpus = require("os").cpus;
const numCPUs = cpus().length;

console.log(`${process.pid} isPrimary: ${cluster.isPrimary}`);

if (cluster.isPrimary) {
  console.log(`Number of CPUs: ${numCPUs}`);
  /* Fork workers
    as many as the amount of cores the processor has
  */
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const express = require("express");
  const crypto = require("crypto");

  const app = express();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hi there");
    });
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000, () => {
    console.log("Server running!");
  });
}
