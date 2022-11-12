# Destructuring

Destructuring means to break down a complex structure into simpler parts. With the syntax of destructuring, one can extract fragments from objects and arrays. It can be used for assignments and declaration of a variable.

Destructuring is an efficient way to extract multiple values from data that is stored in arrays or objects.



<a id="array-destructuring"></a>
## Array destructuring
When destructuring an array, values are extracted by positions (or index) in an assignment.
From [JavaTpoint](https://www.javatpoint.com/es6-array-destructuring)

<a id="object-destructuring"></a>
## Object destructuring
In object destructuring, values are extracted by the keys.

```
const num = {x: 100, z: 300, y: 200};  
// Must use key names on LHS... {a,b} will not work!
const {x, y} = num;  
```

### Syntax shorthand: Use curly brackets to assign an object's properties to variables of the same name as the corresponding key.

```
var obj = {a: 1, b: 2, c: 3}
let {a, b, c} = obj
```

### Inline destructuring of function parameters, such as component props

I ran across this succinct notation when I neglected curlies around the `name` parameter in a component function def:
```
export default function ProductCategoryRow(name) {  // This is wrong!
  ...
  {name}
}
```
Although Webpack happily compiled it, a runtime error appeared on the console:
```
Uncaught Error: Objects are not valid as a React child
(found: object with keys {name}). If you meant to render
a collection of children, use an array instead
```
I called it from another component thusly:
```
<ProductCategoryRow name="Fruits" />
```
What happened?  The `name="Fruits"` syntax passed a `{name: "Fruits"}` prop object.  So without curlies around the function def, `name` was assigned `{name: "Fruits"}`, not "Fruits" as I intended.  Subsequently, `{name}` in the function body returned an object, not a string.  Indeed, it returned an "object with keys {name}", exactly as the error indicated.

So `{name}` in the function body returns `{name: "Fruits"}`--an object,
not a string.

One could dereference it, as `{name['name']}`, which is valid but odd.  Or use a `props` param, and say `{props['name']}`--decidedly more readable, but still wordy.

OR... **since ES6 syntax supports destructuring (and unpacking) inline in the parameter list, by means of the {} syntax in that context**, I could inline-destructure in the function params using {name}, which is 'way more elegant, assuming I speak ES6 destructuring.

Now the `{name}` reference in the function body evaluates to a string\--the value of the `name` key in props\--rather than the props object itself.

These two links help with understanding inline destructuring (and unpacking) of function parameters:

[https://bobbyhadz.com/blog/react-objects-are-not-valid-as-react-child](https://bobbyhadz.com/blog/react-objects-are-not-valid-as-react-child)
[https://stackoverflow.com/questions/58574905/destructured-object-as-function-parameter](https://stackoverflow.com/questions/58574905/destructured-object-as-function-parameter)

