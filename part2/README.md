# Getting and Setting Data

A lot of functional programming revolves around functions. Getting and setting data is a crucial part in programming. It's also how you easily violate pure function rules by mutating data or creating null pointer exceptions.

Let's cover getting data first.

## The Trouble with Dots

In many dynamic languages, you can access parts of structures like Objects, Arrays, and class instances through `.`, the dot operator. Normally that works great:

```javascript
const person = {
    firstName: 'Jesse',
    lastName: 'Warden',
    age: 39,
    address: {
        home: {
            street: '007 Cow Lane',
            phone: ['123-456-7890']
        },
        work: {
            street: '123 Work Blvd'
        }
    }
}
console.log(person.firstName) // Jesse
```

If you misspell a property, no worries:

```javascript
console.log(person.fistName) // undefined
```

If you misspell the object, though:

```javascript
console.log(persn.fistName) // ReferenceError: persn is not defined
```

The second comes from accessing a sub property you THINK exists, but doesn't:

```javascript
console.log(person.address.hom.street) // TypeError: Cannot read property 'street' of undefined
```

You spelled street right. However, you could of spelled it wrong. Either way, what the error MEANT to say was: "There is no `hom` property on `person.address`, perhaps you meant `home`?".

As you see, reading data through dots is dangerous. These errors are with a known Object. Often you're dealing with data coming from external sources like REST calls, text files, databases, etc. These are side effects that you can't control.

## get or prop

The safe way is to create a get function. For objects you know the shape of, meaning you know what properties and value types they typically have, you can create these yourself.

```javascript
const getFirstName = person => {
    if(person) {
        return person.firstName
    }
    return undefined
}
```

Then you can test it to verify it's safe:

```javascript
expect(getFirstName(person)).to.equal('Jesse')
expect(getFirstName(undefined)).to.equal(undefined)
```

This is such a common thing to do that [Lodash](https://lodash.com/docs/4.17.10#get) has a `get` function, [Ramda](https://ramdajs.com/docs/#prop) and Sanctuary have [prop](https://sanctuary.js.org/#prop).

```javascript
import { get } from 'lodash'

console.log(get(person, 'firstName')) // Jesse
console.log(get(person, 'fistName')) // undefined
console.log(get(undefined, 'firstName')) // undefined
```

## Dem Deep Gets

Deeply nested properties, however, require null or [null operators](https://github.com/tc39/proposal-nullish-coalescing):

```javascript
const getStreetAddress = person => {
    if(person && person.address && person.address.home) {
        return person.address.home.street
    }
    return undefined
}
```

It's less code and safer just to use `get` with the path:

```javascript
const getStreetAddress = person => get(person, 'person.address.home.street')
```

Now those are just Objects. Arrays require you to do runtime type checking:

```javascript
const getFirstHomePhone = person => {
    if(
        person 
        && person.address 
        && person.address.home 
        && Array.isArray(person.address.home.phone)
        ) {
        return person.address.home.phone[0]
    }
    return undefined
}
```

... or you could just use `get`:

```javascript
const getFirstHomePhone = person => get(person, 'person.address.home.phone[0]')
```

This also works great for deeply nested JSON data structures you often get back from REST API's as well as SOAP and XML you've parsed to JSON.

## Default Values

You'll often configure your Node API using the [config](https://github.com/lorenwest/node-config) library. One thing you'll run into when configuring for different development environments like dev, qa, and prod is default values in case the configuration intentionally doesn't exist. In the browser, if you run into configuration erorrs, you just fall back to the defaults so the application still works. 

You can do that using `get` or [Ramda's propOr](https://ramdajs.com/docs/#propOr):

```javascript
const url = get(configuration, 'services.emailURL', 'http://dev.server.com/email')
```

If it can't find the `services.emailURL` path on `configuration`, or if `configuration` is `undefined`, it'll just default to that dev url, 'http://dev.server.com/email'.

## Set

Now that you know how to get data, setting is very similar. To update the `firstName`, you can write your own pure setter:

```javascript
const setFirstName = (person, newFirstName) => {
    return {...person, firstName: newFirstName}
}
```

And if you manually test it to ensure it's pure:

```javascript
console.log(person.firstName) // Jesse
setFirstName(person, 'Cow').firstName // Cow
console.log(person.firstName) // Jesse
```

But same problem as before with deeply nested properties. For that, use Lodash' `set`:

```javascript
const setFirstPhoneNumber = (person, newPhoneNumber) => {
    return set(person, 'address.home.phone[0]', newPhoneNumber)
}
```

Pure. Immutable data. Same input, same output, and no side effects.