https://testdriven.io/blog/react-hooks-primer/ - February 27th, 2019

React hooks help ease the aggravation of using complex higher order components to re-use stateful logic and relying on lifecycle methods that trigger unrelated logic.

Outline:
- What are hooks?
- Why were they implemented in React?
- How are hooks used?
- Are there rules to using hooks?
- What is a custom hook?
- When should I use custom hooks?
- What are the benefits of using custom hooks?

## What are hooks?
Hooks let you “hook into” a component’s render cycle.

With state hooks, you can re-use stateful logic between components, which simplifies component logic and lets you skip writing classes.

Add state to the component with the `useState()` Hook.

## Why were hooks implemented in React?

### Hooks simplify component logic.
When the inevitable exponential growth of logic appears in your application, simple components become a dizzying abyss of stateful logic and side effects. Lifecycle methods become cluttered with unrelated methods. A component's responsibilities grow and become inseparable.

### Skip [writing/using] classes
Classes are a huge part of React's architecture.  Classes have many benefits, but form a barrier to entry for beginners. With classes, you also have to remember to bind "this" to event handlers, and so code can become lengthy and a bit redundant.


## How are hooks used?
Add state variables at the top of the component function that "owns" the state, and specify the initial state of your application.


### The useState() hook method
The `useState()` function that you use to add the state variable will give you back a function to subsequently modify that variable.
```
// Bring in these two hooks (these methods ARE the 'hooks' of which we speak)...

import { useState, useEffect } from 'react';
```

The best way to use the state hook is to [destructure](/es6/destructuring.html) it and set the original value. The first parameter will be used to store the state, the second to update the state.

For example:

```
const [weight, setWeight] = useState(150);

onClick={() => setWeight(weight + 15)}
```

- `weight` is the state
- `setWeight` is a method used to update the state
- `useState(150)` is the method used to set the initial value (any primitive type)
- It's worth noting that you can destructure the state hook many times in a single component:

```
const [age, setAge] = useState(42);
const [month, setMonth] = useState('February');
const [todos, setTodos] = useState([{ text: 'Eat pie' }]);
```

So, the component might look something like:

```
import React, { useState } from 'react';

export default function App() {
  const [weight, setWeight] = useState(150);
  const [age] = useState(42);
  const [month] = useState('February');
  const [todos] = useState([{ text: 'Eat pie' }]);

  return (
    <div className="App">
      <p>Current Weight: {weight}</p>
      <p>Age: {age}</p>
      <p>Month: {month}</p>
      <button onClick={() => setWeight(weight + 15)}>
        {todos[0].text}
      </button>
    </div>
  );
}
```

## The useEffect() hook method
Without `useEffect()`, state only flows one way: from the top down.  But to change the state according to user input, you'll need to support data flowing the other way: the form components deep in the hierarchy need to update the state in the topmost common component.

Use the `useEffect()` hook as you would common lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`:  Bind a function to the state variable that modifies pieces of the display that depend on that state variable.

```
// check out the variable count in the array at the end...
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [ count ]);
```

Any time the component updates, `useEffect` will be called after render.

## Rules to using React hooks
The rules for React hooks may seem unconventional at first glance, but once you understand the basics of how React hooks are initiated the rules are quite easy to follow.

Plus, React has a linter to keep you from breaking the rules.

### (1) Hooks must be called in the same order, at the top level
Hooks create an array of hook calls to keep order. This order helps React tell the difference, for example, between multiple useState and useEffect method calls in a single component or across an application.

1. On first render, the values -- 42, February, [{ text: 'Eat pie'}] -- are all pushed into a state array.
2. When the component re-renders (NOTE: a re-render is NOT a page-refresh!), the useState method arguments are ignored.
3. The values for age, month, and todos are retrieved from the component's state, which is the aforementioned state array.


### (2) Hooks cannot be called within conditional statements or loops
Because of the way that hooks are initiated, they are not allowed to be used within conditional statements or loops. For hooks, if the order of the initializations changes during a re-render, there is a good chance your application will not function properly. You can still use conditional statements and loops in your components, but not with hooks inside the code blocks.

For example:

```
// DON'T DO THIS!!
const [DNAMatch, setDNAMatch] = useState(false)

if (name) {
  setDNAMatch(true)
  const [name, setName] = useState(name)

  useEffect(function persistFamily() {
    localStorage.setItem('dad', name);
  }, []);
}
```

```
// DO THIS!!
const [DNAMatch, setDNAMatch] = useState(false)
const [name, setName] = useState(null)

useEffect(() => {
  if (name) {
    setDNAMatch(true)
    setName(name)
    localStorage.setItem('dad', name);
  }
}, []);
```

### (3) Hooks cannot be used in class components
Hooks must be initialized in either a functional component or in a custom hook function. Custom hook functions can only be called within a functional component and must follow the same rules as non-custom hooks.

