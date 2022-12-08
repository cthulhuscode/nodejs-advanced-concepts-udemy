/* This code doesn't work because now Node supports
  worker thread natively.

  2_worker_threads.js is the working version.
*/
const express = require("express");
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
  const worker = new Worker(function () {
    /* 'this' is equal to the thread itself, 
      an object that represents the thread.
      Inside it, we add the CPU intensive task
    */
    this.onmessage = function () {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    };
  });

  /* whenever our worker sends a message 
    back to our application, this function 
    will be called, usually after the worker 
    finishes the task
    */
  worker.onmessage = function (message) {
    console.log(message.data);
    res.send(message.data.toString());
  };

  worker.postMessage();
});

app.get("/fast", (req, res) => {
  res.send("This was fast!");
});

app.listen(3000, () => {
  console.log("Server running!");
});
