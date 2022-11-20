# Context - Passing State deeply

From [https://beta.reactjs.org/learn/passing-data-deeply-with-context](https://beta.reactjs.org/learn/passing-data-deeply-with-context).

The nearest common ancestor Component could be far removed from the components that need data, and lifting state up that high can lead to a situation sometimes called “prop drilling”.

Wouldn’t it be great if there were a way to “teleport” data to the components in the tree that need it without passing props all the way down to it? With React’s context feature, there is!

Context lets a parent component provide data to the entire UI tree below it.

Instead of getting the state from its parent Component's props, a Component can call `useContext(MyContext)` to ask for the state.

## Implementing Context
Three steps:

1. Create a context for storing state. (E.g., LevelContext, if providing a heading level.)
1. Use that context from the component that needs the data. (Heading will use LevelContext.)
1. Provide that context from the component that specifies the data. (Section will provide LevelContext.)

## Create a context
```
import { createContext } from 'react';

export const ImageContext = createContext(100);
```
## Provide the context at the level of the component where the state lives
```
import { ImageContext } from './Context.js'

export default function App() {
  const imageSize = isLarge ? 150 : 100;
  return (
    <>
      <ImageContext.Provider value={imageSize}>
        <List />
      </ImageContext.Provider>
    </>
  )
}

```
## Use the context at the component that needs it
```
import { useContext } from 'react';

function PlaceImage({ place }) {
  const imageSize = useContext(ImageContext);
  return (
    <img src={getImageUrl(place)}
      alt={place.name}
      width={imageSize}
      height={imageSize}
    />
  );
}
```

How context works might remind you of CSS property inheritance. In CSS, you can specify color: blue for a `<div>`, and any DOM node inside of it, no matter how deep, will inherit that color unless some other DOM node in the middle overrides it with color: green. Similarly, in React, the only way to override some context coming from above is to wrap children into a context provider with a different value.

In CSS, different properties like color and background-color don’t override each other. You can set all `<div>`’s color to red without impacting background-color. Similarly, different React contexts don’t override each other. Each context that you make with `createContext()` is completely separate from other ones, and ties together components using and providing that particular context. One component may use or provide many different contexts without a problem.

## A few alternatives to consider before using context

- **Start by passing props**. If your components are not trivial, it’s not unusual to pass a dozen props down through a dozen components. It may feel like a slog, but it makes it very clear which components use which data! The person maintaining your code will be glad you’ve made the data flow explicit with props.
- **Extract components and pass JSX as children to them**. If you pass some data through many layers of intermediate components that don’t use that data (and only pass it further down), this often means that you forgot to extract some components along the way. For example, maybe you pass data props like posts to visual components that don’t use them directly, like `<Layout posts={posts} />`. Instead, make Layout take children as a prop, and render `<Layout><Posts posts={posts} /></Layout>`. This reduces the number of layers between the component specifying the data and the one that needs it.

## Use cases for context 
**Theming**: If your app lets the user change its appearance (e.g. dark mode), you can put a context provider at the top of your app, and use that context in components that need to adjust their visual look.
**Current user**: Many components might need to know the currently logged in user. Putting it in context makes it convenient to read it anywhere in the tree. Some apps also let you operate multiple accounts at the same time (e.g. to leave a comment as a different user). In those cases, it can be convenient to wrap a part of the UI into a nested provider with a different current account value.
**Routing**: Most routing solutions use context internally to hold the current route. This is how every link “knows” whether it’s active or not. If you build your own router, you might want to do it too.
**Managing state**: As your app grows, you might end up with a lot of state closer to the top of your app. Many distant components below may want to change it. **It is common to use a reducer together with context** to manage complex state and pass it down to distant components without too much hassle.

Context is not limited to static values. If you pass a different value on the next render, React will update all the components reading it below!

