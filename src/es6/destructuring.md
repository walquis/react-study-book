# Destructuring

Destructuring is an efficient means of extracting multiple fragments from data stored in arrays or objects. 

The syntax of destructuring supports variable declaration and assignment.

<a id="array-destructuring"></a>
## Array destructuring
When destructuring an array, values are extracted by positions (or index) in an assignment.
From [JavaTpoint, array destructuting](https://www.javatpoint.com/es6-array-destructuring)

<a id="object-destructuring"></a>
## Object destructuring
In object destructuring, values are extracted by the keys.

> Syntax shorthand: Use curly brackets to assign an object's properties to variables of the same name as the corresponding key.

```
const num = {x: 100, z: 300, y: 200};  
// Must use key names on LHS... {a,b} will not work here!
const {x, y} = num;  
```

### Inline destructuring of function parameters, such as component props

I ran across this succinct notation when I neglected curlies around the `name` parameter in a component function def:
```
export default function ProductCategoryRow(name) {  // This is wrong!
  ...
  return <div>
    {name}
  </div>
}
```
Although Webpack happily compiled it, a runtime error appeared on the console:
```
Uncaught Error: Objects are not valid as a React child
(found: object with keys {name}). If you meant to render
a collection of children, use an array instead
```
I was calling it from another component thusly:
```
<ProductCategoryRow name="Fruits" />
```
What happened?  The `name="Fruits"` syntax passed a `{name: "Fruits"}` prop object.  So without curlies around the function def, `name` was assigned `{name: "Fruits"}`, not `"Fruits"` as I intended.  Subsequently, `name` in the function body returned an object, not a string.  Indeed, it returned an "object with keys {name}", exactly as the error indicated.  React can render a string like `Fruits`, but it has no way to render an object.

So `name` in the function body was returning `{name: "Fruits"}`--an object, not a string.  One could dereference it, as `{name.name}`, which is valid but odd.  Or use a `props` param, and say `{props.name}`--decidedly more readable, but still wordy.

OR... **since ES6 supports destructuring (and unpacking) inline in the parameter list, by means of the {} syntax in that context**, I could inline-destructure in the function params using `{name},` which is 'way more elegant, assuming I speak ES6 destructuring.

Now `name` in the function body is a string, because inline-destructuring `{...}` syntax extracted it from the `{name: "Fruits"}` props object passed from the component.

These two links help with understanding inline destructuring (and unpacking) of function parameters:

[https://bobbyhadz.com/blog/react-objects-are-not-valid-as-react-child](https://bobbyhadz.com/blog/react-objects-are-not-valid-as-react-child)
[https://stackoverflow.com/questions/58574905/destructured-object-as-function-parameter](https://stackoverflow.com/questions/58574905/destructured-object-as-function-parameter)

