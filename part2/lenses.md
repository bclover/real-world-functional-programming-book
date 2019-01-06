# Optic Basics: Lenses

To use `get` and `set` together, Ramda use lenses. They are a bit lower-level and more specific API's. Lodash handles both Arrays and Objects, whereas you need to do that with separate functions in Ramda. Lenses combine `get` and `set` style functionality to navigate and modify large structures by composing smaller functions together.

If you hear the word "Optics", that's what a lot of the Functional people use to refer to lens functionality.

## Focus on a Property or Path, and View It in Ramda

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

Just like Ramda's `prop` or Lodash' `get`, we can see what that lens reveals by passing it to `view`:

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

In Lodash, the `set` will modify it with the value you give it. The `over` in this case will replace it with with whatever function you give it taking the current value as an input, and the output as the new value. Note that it's assumed the function you give it, in this case `toLower`, is a pure function.

// TODO: Do I take this out? Move to another section? Seems advanced with composition way too early.

## Composition With Lenses

// TODO: I hate this entire section.

Using our above example, we can combine it with other functions to iterate through Arrays of Objects in a pure way. We'll take a list of people:

```javascript
const people = [
  {
    name: 'jesse warden', 
    address: { 
        street: '123 Cow Ville', 
        phone: ['1235551234']
    }
  }
  , {
    name: 'brandy fortune', 
    address: { 
        street: '123 Cow Ville', 
        phone: ['1235555678']
    }
  }
  , {
    name: 'marge paradis', 
    address: { 
        street: '789 Farm Road', 
        phone: ['5675550987']
    }
  }
]
```

A function to clean up their name to 2 separate properties of `firstName` and `lastName` and remove the `name` property. We'll use a simple `prop`, much like a Lodash `get`: 

```javascript
import { ..., prop } from 'ramda'

const getPersonNameToFirstAndLastName = person => {
  const firstName = prop('name', person).split(' ')[0]
  const lastName = prop('name', person).split(' ')[1]
  return {
    ...person,
    name: undefined,
    firstName,
    lastName
  }
}
console.log(getPersonNameToFirstAndLastName(people[0]))
{ name: undefined,
  address: { street: '123 Cow Ville', phone: [ '1235551234' ] },
  firstName: 'jesse',
  lastName: 'warden' }
```

We'll also format the phone number to be a more useful data type and use Ramda's `path`, like a Lodash `get`, but requires each path item be an item in an Array:

```javascript
import { ..., path } from 'ramda'

const fixPhoneNumber = person => {
  const string = path(['address', 'phone', '0'], person) 
  const areaCode = parseInt(string.substring(0, 3))
  return {
    ...person,
    phone: {
      formatted: `(${areaCode}) ${string.substring(3, 6)}-${string.substring(6, 10)}`,
      areaCode,
    }
    , address: undefined
  } 
}
console.log(people[2])
{ name: 'marge paradis',
  address: undefined,
  phone: { formatted: '(567) 555-0987', areaCode: 567 } }
```

We'll also fix the case of the names using Lodash' `upperFirst`, which will change "jesse" into "Jesse", inside a Ramda `lensProp`, which is like `prop`, but is used in lens functions:

```javascript
import { ..., over, lensProp } from 'ramda'
import { upperFirst } from 'lodash'

const firstNameLens = lensProp('firstName')
const lastNameLens = lensProp('lastName')

const upperFirstName = person => over(firstNameLens, upperFirst, person)
const upperLastName = person => over(lastNameLens, upperFirst, person)
```

Using our above code we'll compose them together (we're using `pipe` below, I like it because it's left to right, whereas `compose` is right to left). Our person will go in the first function, `getPersonNameToFirstAndLastName`, and whatever comes out will be fed to `fixPhoneNumber`, and whatever comes out will be fed to `upperFirstName`, and whatever comes out will be fed to `upperLastName`, and whatever comes out will be your `parsePerson` return value. Similiar to a Promise `.then` chain, this one is synchronous.

```javascript
import { pipe } from 'ramda'

const parsePerson = person =>
  pipe(
    getPersonNameToFirstAndLastName,
    fixPhoneNumber,
    upperFirstName,
    upperLastName
  )
  (person)
```

One big ole pipe. Let's try it out on a single person:

```javascript
console.log(parsePerson(people[2]))
{ name: undefined,
  address: undefined,
  firstName: 'Marge',
  lastName: 'Paradis',
  phone: { formatted: '(567) 555-0987', areaCode: 567 } }
```

Cool, now let's throw that in a `map`, and use on the entire Array of people:

```javascript
import { ..., map } from 'ramda'
console.log(
  map(
    parsePerson,
    people
  )
)
[ { name: undefined,
    address: undefined,
    firstName: 'Jesse',
    lastName: 'Warden',
    phone: { formatted: '(123) 555-1234', areaCode: 123 } },
  { name: undefined,
    address: undefined,
    firstName: 'Brandy',
    lastName: 'Fortune',
    phone: { formatted: '(123) 555-5678', areaCode: 123 } },
  { name: undefined,
    address: undefined,
    firstName: 'Marge',
    lastName: 'Paradis',
    phone: { formatted: '(567) 555-0987', areaCode: 567 } } ]
```

As you can see, for simple parsing, either a Lodash `get` or a Ramda `prop` and `path` can quickly focus on a single value, safely. Using lens functions, we can compose them together to iterate over a list of Objects in a pure way.

// TOOD: remove undefined