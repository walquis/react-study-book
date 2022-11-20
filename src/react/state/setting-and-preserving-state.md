# Setting and Preserving State

From https://beta.reactjs.org/learn/preserving-and-resetting-state

## Same component at the same position preserves state

React associates each piece of state it’s holding with the correct component by where that component sits in the UI tree.

React preserves a component’s state for as long as the same component is being rendered at the same position in the UI tree.

When a component gets removed, or a different component gets rendered at the same position, React destroys its state.

```
...
// The Counter's state is preserved, whether fancy or not.
// In React's UI tree, it sits just under <div> in both cases
return (
  <div>
    {isFancy ? (
      <Counter isFancy={true} />
    ) : (
      <Counter isFancy={false} />
    )}
  </div>
)
...
```

```
...
// The Counter's state is NOT preserved!
// 2nd instance is at different place in the UI tree
return (
  <div>
    {isFancy ? (
      <Counter isFancy={true} />
    ) : (
      <div>
        <Counter isFancy={false} />
      </div>
    )}
  </div>
)
...
```
One can think of them as having the same “address”, e.g., "the first child of the first child of the root". This is how React matches them up between the previous and next renders, regardless of how you structure your logic.  React doesn’t know where you place the conditions in your function. All it “sees” is the tree you return.

Also, the same component rendered under a different UI element\--even though it's in same position under the UI element\--resets the state of the component's entire subtree:

```
...
// The Counter's state is destroyed if isFancy changes.
// In React's UI tree, sitting just under <div> is a different
// position than sitting just under <section>
return (
    {isFancy ? (
      <div>
        <Counter />
      </div>
    ) : (
      <section>
        <Counter />
      </section>
    )}
)
...
```
This is why you should not nest component function definitions:
```
export default function MyComponent() {
  const [counter, setCounter] = useState(0);

  // Every time MyComponent renders, a *different*
  // MyTextField() function is being created, which
  // means its state is lost.

  function MyTextField() {
    const [text, setText] = useState('');

    return (
      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
    );
  }

  return (
    <>
      <MyTextField />
      <button onClick={() => {
        setCounter(counter + 1)
      }}>Clicked {counter} times</button>
    </>
  );
}
```

## What if you want state to change on re-render?

Two approaches:
1. Put component in different position
1. Give each component an explicit identity with `key`


### Putting same component in different position resets state
This example illustrates a very tricky behavior. React creates positions for TWO `<Counter />` components *even though one position is empty* due to the isFancy condition.  Therefore, state is destroyed when isFancy changes and the component is removed from one position and added to the other\--but the **position** is there regardless.

NOTE: A ternary operator can live inside a JSX expression, but an `if` statement cannot; the `if` must go outside the `return()`.
```
export default function Example() {
  const [isFancy, setIsFancy] = useState(false);
    return (
      <div>
        { isFancy && <Counter isFancy={isFancy} /> }
        {!isFancy && <Counter isFancy={isFancy} /> }
        <label>
          <input
            type="checkbox"
            checked={isFancy}
            onChange={e => { setIsFancy(e.target.checked) } }
          />
          Use fancy styling
        </label>
      </div>
    );
}
```
### Giving same component different identity with `key` resets state
```
// Resets state
...
return (
  <div>
    {isFancy ?
      <Counter isFancy={isFancy} key="A" /> :
      <Counter isFancy={isFancy} key="B" />
    }
  </div>
)
...
```
```
// Does NOT reset state.  (The `id` prop does not differentiate components)
...
return (
  <div>
    {isFancy ?
      <Counter isFancy={isFancy} id="a"/> :
      <Counter isFancy={isFancy} id="b"/>
    }
  </div>
)
...
```
Specifying a key tells React to use the key itself as part of the position, instead of their order within the parent.

Remember that keys are not globally unique. They only specify the position *within* the parent.

Also note that the above examples are working with drawing one component versus another; if BOTH components are being drawn, then a `key` field will serve to assign state to the correct component...see next example.


# For multiple component instances, `key` field helps React assign correct state across re-renders
```
export default function App() {
  const [reverse, setReverse] = useState(false);

  // Cool, assigning a component to a variable!
  let checkbox = (
    <label>
      <input type="checkbox" checked={reverse}
        onChange={e => setReverse(e.target.checked)} />
      Reverse order
    </label>
  );

  if (reverse) {
    return (
      <>
        <Field label="Last name"  key="L" />
        <Field label="First name" key="F" />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field label="First name" key="F" />
        <Field label="Last name"  key="L" />
        {checkbox}
      </>
    );
  }
}

function Field({ label }) {
  const [text, setText] = useState('');
  return (
    <div>
      {label}:
      <input type="text" value={text} placeholder={label}
        onChange={e => setText(e.target.value)} />
    </div>
  );
}
```
State is associated with the tree position. A `key` lets you specify a named position instead of relying on order.

## Summary
- React keeps state for as long as the same component is rendered at the same position.
- State is not kept in JSX tags. It’s associated with the tree position in which you put that JSX.
- You can force a subtree to reset its state by giving it a different key.
- Don’t nest component definitions, or you’ll reset state by accident.
