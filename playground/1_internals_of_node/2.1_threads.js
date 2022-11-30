const crypto = require("crypto");

/* We're using this function just to do 
  some expensive work.

  Notice that both functions are executed at the
  almost exact same time. The 2nd one does not wait
  for the 1st one to be finished.
*/
const start = Date.now();
crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("1: ", Date.now() - start + "ms");
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log("2: ", Date.now() - start + "ms");
});
