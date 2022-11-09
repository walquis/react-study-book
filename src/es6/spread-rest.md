### Spread operator

```
var variablename1 = [...value];
```

#### Spread syntax can be used to expand an array.
```
let arr1 = [1, 2, 3]
let arr2 = ['a', 'b', 'c']
let arr3 = [...arr1, ...arr2]

console.log(arr3) // [1, 2, 3, "a", "b", "c"]
```

### Rest parameter 

Similar to the "splat" in Ruby

https://www.javatpoint.com/es6-rest-parameter

### A short notation for assigning properties to variables of the same name...
From https://www.taniarascia.com/es6-syntax-and-feature-overview/

```
let obj = {
  a,
  b,
}
```
Results in this structure:
```
{
  a: a,
  b: b
}
```
