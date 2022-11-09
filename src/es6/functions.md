# Functions

### Declaring functions

The function keyword can be omitted when assigning methods on an object.
```
let obj = {
  a(c, d) {},
  b(e, f) {},
}

obj.a() // call method a
```

## Functions can be initialized with default parameters, which will be used only if an argument is not invoked through the function.
```
let func = (a, b = 2) => {
  return a + b
}

func(10) // returns 12
func(10, 5) // returns 15
```

### Spread syntax can be used for function arguments.
```
let arr1 = [1, 2, 3]
let func = (a, b, c) => a + b + c

console.log(func(...arr1)) // 6
```

