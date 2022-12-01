# Async and Await

From [https://www.w3schools.com/Js/js_async.asp](https://www.w3schools.com/Js/js_async.asp)

> "async and await make promises easier to write"

## `async` makes a function return a Promise
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
