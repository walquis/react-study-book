# Destructuring

Destructuring is an efficient means of extracting multiple fragments from data stored in arrays or objects. 

The syntax of destructuring supports variable declaration and assignment.

<a id="array-destructuring"></a>
## Array destructuring
When destructuring an array, values are extracted based on position (or index) in an assignment:
```
> const a = ['a','b','c','d','e'];
> let [f,g,h] = a
> f
'a'
> h
'c'
> let therest
> [f,g,...therest] = a
> therest
[ 'c', 'd', 'e' ]
```
For more examples, see [MDN web docs, destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

<a id="object-destructuring"></a>
## Object destructuring
In object destructuring, values are extracted based on the keys.

> Syntax shorthand: Use curly brackets on **left-hand side** to assign an object's properties to variables of the same name as the corresponding key.

```
> const num = {x: 100, y: 200, z: 300}
// Must use key names on LHS... {a,b} will not work here!
> const {x, z} = num
> z
300
```
This is an example of a "binding" pattern, in which the pattern starts with a declaration keyword (`let`, `var`, or `const`).  Here is another:
```
const obj = { a: 1, b: { c: 2 } };
const {
  a,
  b: { c: d },
} = obj;
// Two variables are bound: `a` and `d`
```
There are also "assignment" patterns, in which the pattern does NOT start with a declaration keyword.  For instance:
```
const numbers = [];
const obj = { a: 1, b: 2 };
({ a: numbers[0], b: numbers[1] } = obj);
// The properties `a` and `b` are assigned to properties of `numbers`
```
For more examples, see [MDN web docs, destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

### My encounter with inline destructuring of component props passed to a function

I ran across the above syntax shorthand notation when I neglected curlies around the `name` parameter in a component function definition:
```
export default function ProductCategoryRow(name) {  // This is wrong!
  ...
  return <div>
    {name}
  </div>
}
```
Webpack happily compiled it, but a runtime error appeared on the console:
```
Uncaught Error: Objects are not valid as a React child
(found: object with keys {name}). If you meant to render
a collection of children, use an array instead
```
I was calling it from another component thusly:
```
<ProductCategoryRow name="Fruits" />
```
What happened?  The `name="Fruits"` syntax passed a `{name: "Fruits"}` prop object.  So without curlies around the function definition, `name` was assigned `{name: "Fruits"}`, and not `"Fruits"` as I intended.  Subsequently, `name` in the function body returned an object, not a string.  Indeed, it returned an "object with keys {name}", exactly as the error indicated.  React can render a string like `Fruits`, but it has no way to render an object.

Were we to stick with `name` in the function body as the object `{name: "Fruits"}`, we could de-reference it, as `{name.name}`, which is valid but odd.  Or, we could call our param `props` instead of `name`, and say `{props.name}` -- more readable, but still wordy.

So, **since ES6 supports destructuring (and unpacking) inline in the parameter list, by means of the {} syntax in that context**, I can pick out just the `name` property from the passed object, using the `{name}` shorthand -- way more elegant, assuming I speak ES6 destructuring.
```
export default function ProductCategoryRow( {name} ) {  // Nice!
  ...
```

Now `name` in the function body is the string `"Fruits"`, because inline-destructuring `{...}` syntax extracted it from the `{name: "Fruits"}` props object passed from the component.

These two links help with understanding inline destructuring (and unpacking) of function parameters:

[https://bobbyhadz.com/blog/react-objects-are-not-valid-as-react-child](https://bobbyhadz.com/blog/react-objects-are-not-valid-as-react-child)
[https://stackoverflow.com/questions/58574905/destructured-object-as-function-parameter](https://stackoverflow.com/questions/58574905/destructured-object-as-function-parameter)

## 'Destructuring' with import statements
What do these curlies mean?
```
import React, { useState } from 'react';
```

The curly braces `{}` are used to import named bindings from a module, using syntax that looks and acts a lot like destructuring (but [isn't actually](https://qntm.org/snippets)).

There is a good answer here (even though they mistakenly call it 'destructuring'): [https://stackoverflow.com/questions/51701042/when-do-we-use-in-javascript-imports/51701099#51701099](https://stackoverflow.com/questions/51701042/when-do-we-use-in-javascript-imports/51701099#51701099).
