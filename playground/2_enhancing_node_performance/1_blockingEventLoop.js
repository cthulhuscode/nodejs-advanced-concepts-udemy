const express = require("express");
const app = express();

/* 
  The purpose of this function is to
  use as much CPU processing power as 
  it possibly can for some set duration
*/
function doWork(duration) {
  const start = Date.now();
  while (Date.now() - start < duration) {}
}

app.get("/", (req, res) => {
  /* This code is gonna be executed
    inside the Event Loop. This doesn't get
    thrown out to an Event Pool, it doesn't get
    handled by the OS or anything like that.
  */

  /* While processing, our Event Loop 
    can do absolutely nothing else, i.e. 
    it cannot handle other requests, database queries
    write files, etc*/
  doWork(5000); // 5s.

  res.send("Hi there");
});

app.listen(3000, () => {
  console.log("Server running!");
});
