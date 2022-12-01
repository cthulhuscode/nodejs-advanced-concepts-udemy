const cluster = require("cluster");
/* 
  Enable round-robin scheduling: an algorithm for assigning
  equal time-slices to different processes on a computer.

  On Windows it's disable by default.
*/
cluster.schedulingPolicy = cluster.SCHED_RR;

/* The Cluster Manager has that isMaster (deprecated)
  or isPrimary property always set to true 
 
  As soon as we start forking off aditional worker instances 
  that isPrimary flag is gonna be set to false for all 
  the worker instances. 

  Only for the cluster manager is gonna be true
 */

console.log(`${process.pid} isPrimary: ${cluster.isPrimary}`);

/* Is the file being executed in Primary mode? */
if (cluster.isPrimary) {
  /* 
    Cause index.js to be executed again
    but by child mode or a worker thread
  */
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  /* If the file is not being executed in Primary mode
    but by a child or worker thread, then execute 
    the following code. 

    All the child instances behave like a normal server
  */
  const express = require("express");
  const app = express();

  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get("/", (req, res) => {
    doWork(5000); // 5s.
    res.send("Hi there");
  });

  app.get("/fast", (req, res) => {
    res.send("This was fast!");
  });

  app.listen(3000, () => {
    console.log("Server running!");
  });
}
