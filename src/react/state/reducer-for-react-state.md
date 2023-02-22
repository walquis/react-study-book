# Consolidate State with a Reducer
From [beta.reactjs.org, extracting state logic into a reducer](https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer).

As a component grows in complexity, it gets harder to see how its state gets updated.

A **React reducer** is a single function outside your component that consolidates all the state update logic into one place. 

The reducer function takes state as an argument; hence, you can declare it outside of your component, and even move it to a different file and import it, which simplifies your component and makes your code easier to read.

Reducers allow the component logic to separate concerns: 
1. The event handlers only specify *what happened* by dispatching actions, and
1. the reducer function determines *how the state updates* in response to those actions.

## Why is it called a "reducer"?

The function you pass to `reduce()` is called a “reducer”, because it takes the result so far and the current item, and then returns the next result.  This behavior is reminiscent of the `reduce()` operation on arrays, which takes an array and "reduces" many values down to one:


```
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce(
  //  The reducer accumulates its work in the "result" variable:
  (result, number) => result + number
); // 1 + 2 + 3 + 4 + 5
```
React reducers embody the same idea: they take the state so far (analogous to the `result` variable above) and the action (analogous to the current iteration's `number`), and return the next state.

> In this way, reducers transform sequential actions into sequential state changes.

You can migrate from `useState` to `useReducer` in three steps:

1. Move from setting state to **dispatching actions**.
1. **Write a reducer function.**
1. Wire up the reducer to your component.

## Event handers call `dispatch(action)`

Managing state with reducers differs from directly setting state: Instead of telling React “what to do” by setting state, you specify “what the user just did” by dispatching “actions” from your event handlers.  This is more expressive of the user’s intent.

So instead of “setting state” via an event handler, event handlers dispatch an action\--e.g. “added/changed/deleted"\--on some state  (the state update logic still happens, but lives elsewhere).

An action object can have any shape.  It is conventional to give it a string `type` that describes what happened, and pass any additional info in other fields. The value of `type` is specific to a component, so in this example either `'added'` or `'added_task'` would be fine.

```
export default function TaskApp() {
  const [state, dispatch] = useReducer(myReducer, initialState);

  function handleSomeEvent(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }
  ...
}
```

## Write a reducer function

A reducer function is where the state logic lives. It accepts current state and action object as args, and returns the next state.  For instance...

```
function myReducer(state, action) {
  if (action.type === 'added') {
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        done: false,
      },
    ];
  } else if (
  ...
}
```
NOTE: `myReducer()` doesn't actually **store** the updated state\--it merely returns it.  Storing state is the job of the `dispatch()` function returned by `useReducer()`.

By the way: Instead of if/else statements, it’s a convention to use `switch` statements inside your reducers. The result is the same, but it can be easier to read `switch` statements at a glance.

Reactjs.org recommends wrapping each case block with curly braces so that variables declared inside of different cases don’t clash with each other. Also, a case should usually end with a return. If you forget to return, the code will “fall through” to the next case, which can lead to mistakes!

Or just use if/else.

## 3. Wire up the reducer to your component

```
import {useReducer} from 'react';
```
Replace useState:
```
const [tasks, setState] = useState(initialState);
```
with useReducer like so:

```
const [tasks, dispatch] = useReducer(myReducer, initialState);
```
You're basically collecting `setState()` and other state-handling logic all into the `myReducer()` reducer you've written.  Now you call `dispatch()` everywhere, which invokes your reducer for all the state-handling.  To put it another way:  All the state-setting that an event handler requires will now be done by myReducer, called via the `dispatch()` function returned from `useReducer()`.

## `useState` versus `useReducer` 
- **Code size**: Generally, `useState` requires less code upfront. `useReducer` means writing both a reducer function and dispatch actions. However, `useReducer` can DRY out code if many event handlers modify state in a similar way.
- **Readability**: `useState` is easy to read when the state updates are simple. When they get more complex, they can bloat your component’s code and make it difficult to scan. In this case, `useReducer` lets you cleanly separate the how of update logic from the what happened of event handlers.
- **Debugging**: When you have a bug with `useState,` it can be difficult to tell where the state was set incorrectly, and why. With `useReducer`, you can add a console log into your reducer to see every state update, and why it happened (due to which action). If each action is correct, you’ll know that the mistake is in the reducer logic itself. However, you have to step through more code than with `useState`.
- **Testing**: A reducer is a pure function that doesn’t depend on your component. This means that you can export and test it separately in isolation. For complex state update logic it can be useful to assert that your reducer returns a particular state for a particular initial state and action.
- **Personal preference**: You can always convert between `useState` and `useReducer`: they are equivalent.

## Writing reducers well 
1. **Reducers must be pure.** Similar to state updater functions, reducers run during rendering! (Actions are queued until the next render.) This means that reducers must be pure—same inputs always result in the same output. They should not send requests, schedule timeouts, or perform any side effects (operations that impact things outside the component). They should update objects and arrays without mutations.
2. **Each action describes a single user interaction**, even if that leads to multiple changes in the data. For example, if a user presses “Reset” on a form with five fields managed by a reducer, it makes more sense to dispatch one reset_form action rather than five separate set_field actions. If you log every action in a reducer, that log should be clear enough for you to reconstruct what interactions or responses happened in what order. This helps with debugging!
