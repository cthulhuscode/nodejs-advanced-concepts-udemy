/* 
  The following code is fake and it's just to 
  understand the Event Loop. 

  See the lifecycle of a Node program.
  
*/

//> node myFile.js - START

// The tasks that node executes could be stored using arrays.
const pendingTimers = [];
const pendginOSTasks = [];
const pendingOperations = [];

/* 1. Before calling the Event Loop, the code is executed or read.

  Node detects if you use timers, OS Tasks, long operations, http server operations...
  Node will add those tasks to the arrays above.
*/
myFile.runContents();

// Helper Function
function shouldContinue() {
  /*
    In order to determine if the loop should
    continue, Node has 3 checks.  
    If the 3 arrays are empty, then the Event Loop will finish.
  */
  /*
    Check 1:
    Is there any pending setTimeout, setInterval, setImmediate?
  */
  /*
    Check 2:
    Check to see if there are any pending OS tasks. 
    Example: An HTTP server listening to requests on some port. 
             Tasks that need libuv threadpool operations. 
  */
  /*
    Check 3: 
    Any pending long running operations.
    Check to see if there are any long running operations that are
    still being executed inside of our program.
    Example: a function call inside the _fs_ module 
    to read some file off the hard drive
 */

  return (
    pendingTimers.length || pendginOSTasks.length || pendingOperations.length
  );
}

/* 2. After that, the Event Loop begins to work. 
  - We refer to every execution of the loop's body or iteration as a **tick**.
  - Every single time the **Event Loop** runs inside our Node application, 
    we refer to it as a **tick**. 
  - Entire body executes in one **tick**
  - As long as the shouldContinue function returns true
   the loop continues.
*/
while (shouldContinue()) {
  /* 1. Node looks at pendingTimers and sees 
    if any functions are ready to be called.

    Functions setTimeout and setInterval have callbacks, 
    if any of those timers have expired, then node
    calls the relevant callbacks associated with each one. 

    Only checks for setTimeout and setInterval.
  */
  /* 2. Node looks at pendingOSTasks and pendingOperations
      and executes the relevant callbacks.
    */
  /* 3. Pause execution
    Node waits for new events to ocurr. 
    Continues when:
    - a new pendingOSTask is done
    - a new pendingOperation is done
    - a timer is about to complete
  */
  /* 4. Look at pendingTimers. 
    Check only for setImmediate and call them. 
  */
  /* 5. Handle any _close_ events
    
  */
}

// exit back to terminal - END
