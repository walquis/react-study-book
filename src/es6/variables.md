## Variables

From [W3Schools](https://www.w3schools.com/Js/js_variables.asp).

Declare with `var`, `let`, and `const` (or nothing)

- The `var` keyword was used in all JavaScript code from 1995 to 2015.
- The `let` and `const` keywords were added to JavaScript in 2015.
- You cannot re-declare a variable declared with `let` or `const`.
- You cannot re-assign a variable declared with `const`.
- Variables defined with `let` must be declared before use.
- Variables defined with `let` have Block Scope.
```
let person = "John Doe", carName = "Volvo", price = 200;
let carName;  // Will have undefined as value
```
- $ is a valid character in a variable name.  Programmers often use it as an alias for the main function in a JavaScript library.
- "_" is a valid character in a variable name.  A convention among programmers is to prefix private/hidden variables with "_".

### Block Scope and variables
- Before ES6 (2015), JavaScript had only Global Scope and Function Scope.
- let and const provide Block Scope in JavaScript.

Variables declared inside a { } block cannot be accessed from outside the block:
{
  let x = 2;
}
// x can NOT be used here
//

