# Other Language Features

## Iteration
A more concise syntax has been introduced for iteration through arrays and other iterable objects.

```
var arr = ['a', 'b', 'c']
for (let i of arr) {
  console.log(i)
}
```

## Strict Mode
Add this to the very top of a function or a script:
```
"use strict";
```
Strict mode makes several changes to normal JavaScript semantics:
- Prohibits some syntax likely to be defined within future versions of ECMAScript.
- Removes some of JavaScript's silent errors by changing them to throw errors.
- Modifies code that makes it difficult for JavaScript engines to optimize, with the result that strict mode sometimes runs faster than non-strict.
- In React, it's not necessary to declare strict mode.

## ES6 and Hoisting
Hoisting is the default behavior of moving all declarations (but not initializations) to the top of the scope before executing the code. It applies to functions and variables. It allows JavaScript to use the component before its declaration.
- Hoisting does not apply to scripts that run in strict mode.
- JavaScript only hoists the variable declaration, not variable initialization.
- Variables declared with `let` cannot be hoisted.

