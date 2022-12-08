const { parentPort } = require("worker_threads");

/* Simulate a CPU intensive task and then
  send the result (or message) back to the parent
*/

parentPort.on("message", (msg) => {
  console.log(msg);
  const startTime = new Date();

  let counter = 0;

  while (counter < 1e9) {
    counter++;
  }

  const time = new Date() - startTime;
  parentPort.postMessage({ counter, time });
  console.log(`${time}ms`);
});
