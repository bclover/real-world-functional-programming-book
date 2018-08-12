# Lenses

To use `get` and `set` together, Ramda uses lenses. They are a bit lower-level and more specific API's. Lodash handles both Arrays and Objects, whereas you need to do that with separate functions in Ramda. Lenses combine `get` and `set` style functionality to navigate and modify large structures with sometimes less code.

## Focus on a Property or Path, and View It

Just like there are 2 functions to get a property and get a deeply nested property, so too are there 2 lenses to do the same. Unlike Ramda's `prop` and `path` (Lodash `get` does what they both do), functions that return values, a lense is a Type. You call it like any other function to return a configured lens. We'll create some lenses, then use them to "focus" on certain properties and paths of our person Object.

To focus a lens on the `name` property, we need to create a prop lens via `lensProp`:

```javascript
import { lensProp } from 'ramda'

const person = {
  name: 'Jesse Warden', 
  address: { 
      street: '123 Cow Ville', 
      phone: ['123-456-7890']
  }
}
const nameLens = lensProp('name')
```

Just like Ramd's `prop` or Lodash' `get`, we can see what that lens reveals by passing it to `view`:

```javascript
import { ..., lensProp, view } from 'ramda'
...
console.log(view(nameLens, person)) // Jesse Warden
```

For the street, we'll need a path lens via `lensPath`, and pass that to `view` as well:

```javascript
import { ..., lensPath } from 'ramda'
...
const streetLens = lensPath(['address', 'street'])
console.log(view(streetLens, person)) // 123 Cow Ville
```

## Set With Lenses

Using our name lens, let's set the name via Ramda's `set`:

```javascript
import { ..., set } from 'ramda'

const result = set(nameLens, 'Cow', person)
console.log(result.name) // Cow
console.log(person.name) // Jesse Warden
```

Cool, just like Lodash' `set`!

Using the street lens should yield a similar result:

```javascript
const result = set(streetLens, '21 Jump Street', person)
console.log(result.address.street) // 21 Jump Street
console.log(person.address.street) // 123 Cow Ville
```

## Modification With Lenses

Now that we know how to view our data with our lenses, and use them to set things they're focused on, let's use them to modify data we're focused on in an immutable way using pure functions. Instead of "set it to this new value", we'll instead "take the value that's there, put it into this function, and whatever comes out, set the new value to that result". Below will use our lense to run a function on the property and replace it with the value that function returns. It'll then give us a cloned Object back with the modification:

```javascript
import { ..., over, toLower } from 'ramda'

const result = over(nameLens, toLower, person)
console.log(result.name) // jesse warden
console.log(person.name) // Jesse Warden
```

Not that in Lodash, the `set` will modify it with the value you give it. The `over` in this case will replace it with with whatever function you give it taking the current value as an input, and the output as the new value. Note that it's assumed the function you give it, in this case `toLower`, is a pure function.
