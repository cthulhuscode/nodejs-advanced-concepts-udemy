const express = require("express");
const crypto = require("crypto");
const { Worker, workerData } = require("worker_threads");
const Worker = require("webworker-threads").Worker;

const app = express();

app.get("/", (req, res) => {
  /* The scope is different in the function, 
    we can't use a declared variable 
    outside the function 
    
    The function that we're gonna put inside
    will essentially be stringyfied and thrown out
    to a totally separate area of our computer
    */
  const Worker = new Worker(function(){
    this.onmessage = function(){

    }
  });

  /* whenever our worker sends a message 
    back to our application, this function 
    will be called
    */
  workerData.onmessage = function () {};

  workerData.postMessage();
});

app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

app.listen(3000, () => {
  console.log("Server running!");
});
