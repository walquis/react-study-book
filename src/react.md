# React

From https://beta.reactjs.org/learn

React components are JavaScript functions that return markup:

```
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

// The export default keywords specify the main component in the file.
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```
React component names must always start with a capital letter, while HTML tags must be lowercase.

## JSX

NOTE, the above is JSX--a mix of Javascript and Markup. 

Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a \<div>...\</div> or an empty \<>...\</> wrapper:

```
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

In React, you specify a CSS class with `className`. It works the same way as the HTML class attribute:
```
<img className="avatar" />
```

JSX lets you put markup into JavaScript. Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user. For example, this will display user.name:

```
return (
  <h1>
    {user.name}
    <img
      className="avatar"
      src={user.imageUrl}
      style={{
        width: user.imageSize,
        height: user.imageSize
      }}
    />
  </h1>
);
```
NOTE the above: where Javascript supplies a JSX attribute value, quotes are not used.

NOTE also, `style={{}}` is not a special syntax, but a regular `{}` object inside the `style={ }` JSX curly braces.


### The ternary operator works inside JSX (unlike `if`)
```
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

### React map() and keys
Inside a component, use map() to transform a JS array into an array of \<li> items:
```
const listItems = products.map(product =>
  <li key={product.id}>
    {product.title}
  </li>
);

return (
  <ul>{listItems}</ul>
);
```
Notice how \<li> has a key attribute. Each item in a list needs a string or number (e.g. a DB id) that is unique w.r.t. its siblings. React relies on those keys to track later inserts, deletes , or reorders of the items.

### Event handlers
Respond to events by declaring event handler functions inside components:

```
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```
Notice how `onClick={handleClick}` has no parentheses at the end. This is because we do not want to _call_ the event handler function yet, but only pass it down (it's a "callback").  React will call your event handler when the user clicks the button.

### How Components share data and update together
To make both MyButton components display the same count and update together, you need to move the state from the individual buttons “upwards” to the closest component containing all of them.



## Component Lifecycle
1. Mount - create component
  - Before: `ComponentWillMount()`
  - After: `ComponentDidMount()`
2. Update - change state
  - TODO from here...
3. Unmount - destroy component
