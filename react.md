# This is the markdown for all that I am learning in React (like a cheatsheet)

# Describing the UI

https://react.dev/learn/describing-the-ui

```
function Profile() {
  return (
    <img
      src="https://i.imgur.com/MK3eW3As.jpg"
      alt="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}

```

- Lessson\* components need to be in caps Card not card
- components are not all the same img vs image, there's react specific, e.g. button which is not a default html element

## JSX

- Wrapping is important

```
<>
<h1>Hedy Lamarr's Todos</h1>
.......
</>
```

### Keeping components pure

Some JavaScript functions are pure. A pure function:

Minds its own business. It does not change any objects or variables that existed before it was called.
Same inputs, same output. Given the same inputs, a pure function should always return the same result.
**bad**

```
function Cup() {
// Bad: changing a preexisting variable!
guest = guest + 1;
return <h2>Tea cup for guest #{guest}</h2>;
}
```

## My First Component

https://react.dev/learn/your-first-component

You can use as much—or as little—React as you need! normal html with some pages with react

- Component names always begin with a capital letter.
- They return JSX markup.

## Importing and Exporting Components

https://react.dev/learn/importing-and-exporting-components

## Writing Markup with JSX

https://react.dev/learn/writing-markup-with-jsx

This empty tag is called a Fragment. Fragments let you group things without leaving any trace in the browser HTML tree.
<br>
<> </><br>
**_JSX requires tags to be explicitly closed_**<br>
<> </>

For historical reasons, aria-_ and data-_ attributes are written as in HTML with dashes.

## JavaScript in JSX with Curly Braces

https://react.dev/learn/javascript-in-jsx-with-curly-braces

- Curly braces let you bring JavaScript logic and variables into your markup.
- They work inside the JSX tag content or immediately after = in attributes.
- {{ and }} is not special syntax: it’s a JavaScript object tucked inside JSX curly braces.

## Passing Props to a Component

https://react.dev/learn/passing-props-to-a-component

React component functions accept a single argument, a props object:

```

function Avatar(props) {
let person = props.person;
let size = props.size;
// ...
}

```

`function Avatar({ person, size = 100 })`
But if you pass **size={null}** or size={0}, the default value will not be used.

However, props are immutable—a term from computer science meaning “unchangeable”.
They get recreated, they don't get updated (so chucked away)

- You can forward all props with <Avatar {...props} /> JSX spread syntax, but don’t overuse it!
- Nested JSX like <Card><Avatar /></Card> will appear as Card component’s children prop.
- Props are read-only snapshots in time: every render receives a new version of props.
- You can’t change props. When you need interactivity, you’ll need to set state.

## Conditional Rendering

https://react.dev/learn/conditional-rendering

- Conditional (ternary) operator (? :)
- Logical AND operator (&&)
- Don’t put numbers on the left side of &&.
- messageCount > 0 && <p>New messages</p>

`For example, a common mistake is to write code like messageCount && <p>New messages</p>. It’s easy to assume that it renders nothing when messageCount is 0, but it really renders the 0 itself!`

## Rendering Lists

https://react.dev/learn/rendering-lists

- **filter()** method takes an array of items, passes them through a “test” (a function that returns true or false),
- _Rather than generating keys on the fly, you should include them in your data_
- The short <>...</> Fragment syntax won’t let you pass a key
  `
  import { Fragment } from 'react';
  <Fragment key={person.id}>

`

`{recipes.map(recipe =>
        <Recipe key={recipe.id} id={recipe.id} `

#3 Keeping Components Pure

https://react.dev/learn/keeping-components-pure

a pure function is a function with the following characteristics:

- It minds its own business. It does not change any objects or variables that existed before it was called.
- Same inputs, same output. Given the same inputs, a pure function should always return the same result. No - mutation

- only return their JSX, and not change any objects or variables that existed before rendering
  "each component should only “think for itself”"
- This is called “local mutation”—it’s like your component’s little secret.

React offers a “Strict Mode” in which it calls each component’s function twice during development. By calling the component functions twice, Strict Mode helps find components that break these rules.

To opt into Strict Mode, you can wrap your root component into <React.StrictMode>

#### **_Where you can cause side effects_**

<p>While functional programming relies heavily on purity, at some point, somewhere, something has to change. That’s kind of the point of programming! These changes—updating the screen, starting an animation, changing the data—are called side effects. They’re things that happen “on the side”, not during rendering.

In React, side effects usually belong inside event handlers. Event handlers are functions that React runs when you perform some action—for example, when you click a button. Even though event handlers are defined inside your component, they don’t run during rendering! So event handlers don’t need to be pure.

If you’ve exhausted all other options and can’t find the right event handler for your side effect, you can still attach it to your returned JSX with a useEffect call in your component. This tells React to execute it later, after rendering, when side effects are allowed. However, this approach should be your last resort.</p>

---

# Adding interactivity

## Responding to Events

https://react.dev/learn/responding-to-events

### Event handler functions:

- Are usually defined inside your components.\* **_WE SHOULD NOT JUST NAME IT WHATEVER _** <br>
- Have names that start with handle, followed by the name of the event.\*

### Naming event handler props

<p> Built-in components like button and div only support browser event names like onClick. However, when you’re building your own components, you can name their event handler props any way that you like.

By convention, event handler props should start with on, followed by a capital letter.

- onSmash
- onFirstHover
- onDoubleClick
- onHover5s
- onHover10s

</p>

### Event propagation

- an event “bubbles” or “propagates” up the tree
- All events propagate in React except onScroll, which only works on the JSX tag you attach it to.

```
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}

```

### Stopping propagation

- implemented at the child

````
onClick={e => {
      e.stopPropagation();
      onClick();
    }}
    ```
````

### Passing handlers as alternative to propagation

- By passing handlers explicitly and controlling their invocation, you gain more control and clarity over the event handling process in your React applications.
- I stop what was autotmatic and then repeat the behaviour manually. pass all the parents handle props to the children and let the children trigger

### Preventing default behavior

`e.preventDefault();`

## State: A Component's Memory

https://react.dev/learn/state-a-components-memory

To update a component with new data, two things need to happen:

- Retain the data between renders.
- Trigger React to render the component with new data (re-rendering).

`[ and ] syntax here is called array destructuring`

- **any other function starting with “use”, is called a Hook.**
- Hooks—functions starting with use—can only be called at the top level of your components or your own Hooks.
- You can’t call Hooks inside conditions, loops, or other nested functions. (They are like imports)

### State is isolated and private

- Unlike props, state is fully private to the component declaring it.

#### Recap

- Use a state variable when a component needs to “remember” some information between renders.
- State variables are declared by calling the useState Hook.
- Hooks are special functions that start with use. They let you “hook into” React features like state.
- Hooks might remind you of imports: they need to be called unconditionally. Calling Hooks, including useState, is only valid at the top level of a component or another Hook.
- The useState Hook returns a pair of values: the current state and the function to update it.
- You can have more than one state variable. Internally, React matches them up by their order.
- State is private to the component. If you render it in two places, each copy gets its own state.
</p>

## Render and Commit

https://react.dev/learn/render-and-commit

Optimizing performance

- If you run into a performance issue, there are several opt-in ways to solve it described in the Performance section. Don’t optimize prematurely!

- Triggering a render (delivering the guest’s order to the kitchen)
- Rendering the component (preparing the order in the kitchen)
- Committing to the DOM (placing the order on the table)

## State as a Snapshot

https://react.dev/learn/state-as-a-snapshot

- Setting state requests a new render.
- React stores state outside of your component, as if on a shelf.
- When you call useState, React gives you a snapshot of the state for that render.
- Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers.
- Every render (and functions inside it) will always “see” the snapshot of the state that React gave to that render.
- You can mentally substitute state in event handlers, similarly to how you think about the rendered JSX.
- Event handlers created in the past have the state values from the render in which they were created.

## Queueing a Series of State Updates

https://react.dev/learn/queueing-a-series-of-state-updates

- **React waits until all code in the event handlers has run before processing your state updates.**
- React does not batch across multiple intentional events like clicks—each click is handled separately

Updater Function

```
   setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
```

- Setting state does not change the variable in the existing render, but it requests a new render.
- React processes state updates after event handlers have finished running. This is called batching.
- To update some state multiple times in one event, you can use setNumber(n => n + 1) updater function.

## Updating Objects in State

https://react.dev/learn/updating-objects-in-state

- You can use the ... object spread syntax so that you don’t need to copy every property separately.

```
setPerson({
  ...person, // Copy the old fields
  firstName: e.target.value // But override this one
});
```

Objects are not really nested

```
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};

let obj3 = {
  name: 'Copycat',
  artwork: obj1
};
```

- Immer is a popular library that lets you write using the convenient but mutating syntax and takes care of producing the copies for you.

- Treat all state in React as immutable.
- When you store objects in state, mutating them will not trigger renders and will change the state in previous render “snapshots”.
- Instead of mutating an object, create a new version of it, and trigger a re-render by setting state to it.
- You can use the {...obj, something: 'newValue'} object spread syntax to create copies of objects.
- Spread syntax is shallow: it only copies one level deep.
- To update a nested object, you need to create copies all the way up from the place you’re updating.
- To reduce repetitive copying code, use Immer.

## Updating Arrays in State

https://react.dev/learn/updating-arrays-in-state

### Removing from an array

- The easiest way to remove an item from an array is to filter it out. In other words, you will produce a new array that will not contain that item

## Transforming an array

- If you want to change some or all items of the array, you can use map() to create a new array.

## Replacing items in an array

## Inseting items in an array

````
function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = [
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      { id: nextId++, name: name },
      // Items after the insertion point:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
}
    ```
````

## Updatin Objects Inside Arrays

- When updating nested state, you need to create copies from the point where you want to update, and all the way up to the top level.
- you should only mutate objects that you have just created

- You can put arrays into state, but you can’t change them.
- Instead of mutating an array, create a new version of it, and update the state to it.
- You can use the [...arr, newItem] array spread syntax to create arrays with new items.
- You can use filter() and map() to create new arrays with filtered or transformed items.
- You can use Immer to keep your code concise.

# Managing State

## Reacting to Input with State

Instead of manipulating individual pieces of the UI directly, you describe the different states that your component can be in, and switch between them in response to the user input.

- imperative vs declarative

  - giving exact directions turn by turn vs indicating where you want to go (destination)
  - https://react.dev/images/docs/illustrations/i_imperative-ui-programming.png
  - destination vs specific direction
  - In React, you don’t directly manipulate the UI—meaning you don’t enable, disable, show, or hide components directly. Instead, you declare what you want to show,

  ```
  element 1 : el1.disabled = true; el1.disabled = false; el2.style.display = ''; el2.style.display = none;
  vs
  <el1 disabled={state} /> ; state && <el1 />

  ```

- Declarative programming means describing the UI for each visual state rather than micromanaging the UI (imperative).
- When developing a component:
  - Identify all its visual states.
  - Determine the human and computer triggers for state changes.
  - Model the state with useState.
  - Remove non-essential state to avoid bugs and paradoxes.
  - Connect the event handlers to set state.

## Choosing the State Structure

- Group related state.
- Avoid contradictions in state.
- Avoid redundant state.
- Avoid duplication in state.
- Avoid deeply nested state.

### Recap

- If two state variables always update together, consider merging them into one.

```
const [x, setX] = useState(0);
const [y, setY] = useState(0);
```

- Choose your state variables carefully to avoid creating “impossible” states.
  - forgeting to call setIsSent and setIsSending together, could create situation where isSending and isSent are true at the same time. #Impossible State

```
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
```

- Structure your state in a way that reduces the chances that you’ll make a mistake updating it.
- Avoid redundant and duplicate state so that you don’t need to keep it in sync.

```
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
```

- Don’t put props into state unless you specifically want to prevent updates.

```
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor); // avoid this because the prop will no longer be updated
}
```

- For UI patterns like selection, keep ID or index in state instead of the object itself.

```
const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(
    items[0]
  );
```

- If updating deeply nested state is complicated, try flattening it.

### Note!

I don't need to place constants in a function because they reload every time anyway (Snapshot):

```
function countPacked(){
    const packed = items.filter(item => item.packed)
    return packed.length
  }

  vs

   const packed = items
    .filter(item => item.packed)
    .length;

```

One minor downside of using an array is that for each item, you’re calling `selectedIds.includes(letter.id)`. If the array is very large, this can become a performance problem because array search with `includes()` takes linear time, and you’re doing this search for each individual item.
To fix this, you can hold a `Set` in state instead, which provides a fast `has()` operation:

```
  const [selectedIds, setSelectedIds] = useState(
    new Set()
  );

```

## Sharing State Between Components

- lifting state up
- For each unique piece of state, you will choose the component that “owns” it. This principle is also known as having a “single source of truth”.

Recap

- When you want to coordinate two components, move their state to their common parent.
- Then pass the information down through props from their common parent.
- Finally, pass the event handlers down so that the children can change the parent’s state.
- It’s useful to consider components as “controlled” (driven by props) or “uncontrolled” (driven by state).

## Preserving and Resetting State

- React will keep the state around for as long as you render the same component at the same position in the tree.
  - it is essentially being indexed by the tree placement the moment it disappears and reappers then it will "reset"
  - That’s because when React removes a component, it destroys its state. When the state is housed within the component.
- Same component at the same position preserves state
  - https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fpreserving_state_same_component.dark.png&w=640&q=75
- when you render a different component in the same position, it resets the state of its entire subtree.

```
 {isFancy ? (
        <div>
          <Counter isFancy={true} />
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
```

- As a rule of thumb, if you want to preserve the state between re-renders, the structure of your tree needs to “match up” from one render to another

### Resetting state at the same position

- Render components in different positions
- Give each component an explicit identity with key

```
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
```

Recap

- React keeps state for as long as the same component is rendered at the same position.
- State is not kept in JSX tags. It’s associated with the tree position in which you put that JSX.
- You can force a subtree to reset its state by giving it a different key.
- Don’t nest component definitions, or you’ll reset state by accident.

Give a key to both `<Field>` components in both if and else branches. This tells React how to “match up” the correct state for either `<Field>` even if their order within the parent changes:

```
{isPlayerA ? (<>
        <Counter key="Taylor" person="Taylor" />
      <Counter key="Sarah" person="Sarah" />
        </>
      ) : (<>
        <Counter key="Sarah" person="Sarah" />
        <Counter key="Taylor" person="Taylor" />
      </>

      )}
```

!important variable to reset the state `key={item.id}`
