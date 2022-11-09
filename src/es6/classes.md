# Classes

## ES6 introducess the class syntax on top of the prototype-based constructor function.
```
class Func {
  constructor(a, b) {
    this.a = a
    this.b = b
  }

  getSum() {
    return this.a + this.b
  }
}

let x = new Func(3, 4)

x.getSum() // returns 7
```

# Inheritance

## The `extends` keyword creates a subclass.
```
class Inheritance extends Func {
  constructor(a, b, c) {
    super(a, b)  // Calls Func constructor

    this.c = c
  }

  getProduct() {
    return this.a * this.b * this.c
  }
}

let y = new Inheritance(3, 4, 5)

y.getProduct() // 60
```
