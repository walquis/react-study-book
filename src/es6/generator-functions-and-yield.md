# Generator Functions and Yield

From [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield).

The `function*` declaration defines a generator function, which returns a Generator object, which conforms to both the iterable protocol and the iterator protocol.

A generator function is a normal function, except that it uses the `yield` keyword rather than `return`. `yield` pauses the function and returns a value to the caller.  When called again, the generator function resumes execution from where it was last paused.

```
function* foo(index) {
  yield index;
  index++;
  yield index;
  index++;
}

const iterator = foo(0);

console.log(iterator.next().value);
// expected output: 0

console.log(iterator.next().value);
// expected output: 1

console.log(iterator.next().value);
// expected output: undefined

console.log(iterator.next().value);
// expected output: undefined
```
