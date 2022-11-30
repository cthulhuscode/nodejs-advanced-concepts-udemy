const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(`HTTP Request: ${Date.now() - start}ms`);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log(`Hash: ${Date.now() - start}ms`);
  });
}

doRequest();

fs.readFile("multitask.js", "utf8", () => {
  console.log(`FS: ${Date.now() - start}ms`);
});

doHash();
doHash();
doHash();
doHash();

/* Good question for an interview:

  What order are the console.logs appear?

  Answer, they're gonna appear depending on the time 
  that each function takes to be finished. As soon as a
  functions finishes, the console.log will appear. 

  So we can't predict the order. But we know that 
  the fs module and the pbkdf2 function make use of the
  threadpool, that means they'll have some delay because 
  in total they're 5 functions to be executed by only 4 threads 
  (default in threadpool). Whereas the request is gonna be handled
  completely by the OS, because HTTPS module doesn't make use 
  of the threadpool. 
*/
