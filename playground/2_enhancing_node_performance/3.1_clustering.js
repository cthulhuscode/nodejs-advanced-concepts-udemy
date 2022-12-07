/* Every child in the cluster 
  will have only one thread available
 */
process.env.UV_THREADPOOL_SIZE = 1;

const cluster = require("cluster");
cluster.schedulingPolicy = cluster.SCHED_RR;

console.log(`${process.pid} isPrimary: ${cluster.isPrimary}`);

if (cluster.isPrimary) {
  cluster.fork();
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
