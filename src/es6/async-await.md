# Async and Await

From [https://www.w3schools.com/Js/js_async.asp](https://www.w3schools.com/Js/js_async.asp)

> "async and await make promises easier to write"

## `async` makes a function return a Promise
When a method is marked as async, it automatically wraps the return value in a Promise.  This allows the function to pause execution at each await and resume when the awaited operation completes, without blocking the thread.
```
async function myFunction() {
  return "Hello";
}
```
...is the same as...
```
function myFunction() {
  return Promise.resolve("Hello");
}
```
NOTE: Just because a function is non-blocking, it doesn't mean another thread is running. By default, most asynchronous tasks do not run on separate threads; instead, they are non-blocking operations scheduled within the same thread (that is, the thread running the main event loop).  The event loop continuously checks the event queue for work, and prioritizes events like user input, timer completions, and async task completions.  When none of these hi-priority events are pending, the thread works on the non-blocking tasks that are scheduled. 

## `await` makes a function wait for a Promise
`await` can only be used inside an async function.

### Example
The `resolve` and `reject` args to the `new Promise()` are pre-defined by JavaScript.

Often we will not need `reject`.
```
async function myDisplay() {
  let myPromise = new Promise(function(resolve, reject) {
    resolve("I love You !!");
  });
  document.getElementById("demo").innerHTML = await myPromise;
}

myDisplay();
```
```
```
