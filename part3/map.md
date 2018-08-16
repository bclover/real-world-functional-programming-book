# map: 3 things go in, 3 new things come out

The `map` function is often used for parsing operations. You have a list of data, and you want all items in it modified the same way, and put back in the same spot they currently are.

## Old Sk00l for

Let's do that using the native `for` loop. We'll take an Array of strings and convert it to people objects.

```javascript
const peopleFields = [
    ["jesse warden", "123 Cow Ville", ["123-555-1234", "999-555-8234"], "human"],
    ["brandy fortune", "123 Cow Ville", ["123-867-5309"], "human"],
    ["albus dumbledog", "92 Dog Down", ["123-555-1234"], "dawg"]
]

const len = peopleFields.length
for(i = 0; i < len; i++) {
    const fields = peopleFields[i]
    peopleFields[i] = {
        name: fields[0],
        address: {
            street: fields[1],
            phone: fields[2]
        },
        type: fields[3]
    }
}
```

Printing it, you see it's replaced the Arrays of Strings with Arrays of people Objects:

```javascript
console.log(peopleFields)
[ { name: 'jesse warden',
    address: { street: '123 Cow Ville', phone: [Array] },
    type: 'human' },
  { name: 'brandy fortune',
    address: { street: '123 Cow Ville', phone: [Array] },
    type: 'human' },
  { name: 'albus dumbledog',
    address: { street: '92 Dog Down', phone: [Array] },
    type: 'dawg' } ]
```

## New School forEach

Cool, let's use the same code, but using the native `forEach` Array method:

```javascript
const mutateArrayToPerson = (fields, index, array) => {
    array[index] = {
        name: fields[0],
        address: {
            street: fields[1],
            phone: fields[2]
        },
        type: fields[3]
    }
}
peopleFields.forEach(mutateArrayToPerson)
```

Logging it out we get the same result:

```javascript
[ { name: 'jesse warden',
    address: { street: '123 Cow Ville', phone: [Array] },
    type: 'human' },
  { name: 'brandy fortune',
    address: { street: '123 Cow Ville', phone: [Array] },
    type: 'human' },
  { name: 'albus dumbledog',
    address: { street: '92 Dog Down', phone: [Array] },
    type: 'dawg' } ]
```

Tighter code, but risky with the dot, and mutates data.

## map

Let' s crate a pure function to parse the Array:

```javascript
const arrayToPerson = array =>
    ({
        name: array[0],
        address: {
            street: array[1],
            phone: array[2]
        },
        type: array[3]
    })
```

Note, you could write `arrayToPerson` using `return` if that's more comfortable for you. Arrow functions, if no curly braces are used, will `return` for you:

```javascript
const arrayToPerson = array => {
    return {
        name: array[0],
        address: {
            street: array[1],
            phone: array[2]
        },
        type: array[3]
    }
}
```

Take an Array and return a Person object. Let's test it out:

```javascript
console.log(arrayToPerson(peopleFields[0]))
{ name: 'jesse warden',
  address:
   { street: '123 Cow Ville',
     phone: [ '123-555-1234', '999-555-8234' ] },
  type: 'human' }
```

Great, now `map` can use that function on the entire list:

```javascript
import { map } from 'lodash'

console.log(map(peopleFields, arrayToPerson))
[ { name: 'jesse warden',
    address: { street: '123 Cow Ville', phone: [Array] },
    type: 'human' },
  { name: 'brandy fortune',
    address: { street: '123 Cow Ville', phone: [Array] },
    type: 'human' },
  { name: 'albus dumbledog',
    address: { street: '92 Dog Down', phone: [Array] },
    type: 'dawg' } ]
```

While we defined the function separately for unit testing purposes, you can write anonymous functions inline as well:

```javascript
const names = ['jesse warden', 'brandy fortune', 'albus dumbledog']

map(names, name => name.toUpperCase())

["JESSE WARDEN", "BRANDY FORTUNE", "ALBUS DUMBLEDOG"]
```

Instead of:

```javascript
const uppercaseName = name => name.toUpperCase()
map(names, uppercaseName)
```

# map: pure

Array comprehensions are assumed to take pure functions. That means even if they are super simple, they're still expected to be strict about following the purity rules.

That means the `arrayToPerson` can be slightly improved to be more pure. If you read the Trouble with Array Bracket Access, then you understand that errors can occur in this function.

There is a pure function Lodash offers called [nth](https://lodash.com/docs/4.17.10#nth) and [Ramda has as nth well](https://ramdajs.com/docs/#nth) that we can use to fix this.

While accessing `undefined` using bracket access will throw an `Error`:

```javascript
undefined[3]
// TypeError: Cannot read property '3' of undefined
```

The `nth` function just returns `undefined`:

```javascript
nth(undefined, 3)
// undefined
```

Using that, we can make our `map`'s conversion function:

```javascript
const arrayToPerson = array =>
    ({
        name: array[0],
        address: {
            street: array[1],
            phone: array[2]
        },
        type: array[3]
    })
```

Into a more pure version using `nth`:

```javascript
const arrayToPerson = array =>
    ({
        name: nth(array, 0),
        address: {
            street: nth(array, 1),
            phone: nth(array, 2),
        },
        type: nth(array, 3)
    })
```

## Conclusions

Map: Take an Array of things in, give each thing to a function, store whatever that function gives you back in a new Array in the same position, then return that new Array back. The `map` function expects a pure function, and is itself a pure function.
