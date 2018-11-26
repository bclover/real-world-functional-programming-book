# Using vs Enforcing Immutability

In [The Case for var and let](var_and_let.md), we showed Array destructuring as a way to support immutability instead of relaying on `const` to ensure you cannot modify an Array. There is a subtle, but important, attitude there not be missed. We want to encourage a normal way of returning immutable data instead of enforcing immutable data.

Enforcing immutable data would be using things like `Object.freeze`, the [Immutable.js](https://facebook.github.io/immutable-js/) library, or heavy handed clone methods such as:
```javascript
const clone = object => JSON.parse(JSON.stringify(object))
```

This is not what Functional Programming is about. It's about using and composing pure functions, not ensuring someone cannot mutate data. If you use pure functions and compose them, you end up not mutating data, and thus there is no reason to enforce it.

... however, in the real world, you will be working with non-FP programmers, writing non-FP code, using non-FP libraries. Sometimes knowing how to suss out the mutation, prevent it, or benefit from performance techniques are helpful to support immutability.

For atomics like `String`, `Boolean`, and `Number`, they are copied by value, and are easy to clone; by making a new variable/constant or function return value, they give you a new clone.

For Arrays and Objects, however, favor [Destructuring Assignment in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). Python and Lua are more complicated.

# Object.freeze

Frameworks like [Redux](https://redux.js.org/) ensure there is only 1 variable in your application. You never mutate the data yourself, instead asking the `store` to hide the access, and provide functions that allow the data to be changed internally using pure functions.

If you're dealing with a legacy system, or with code not written in using pure functions, using `Object.freeze` can help probe where the mutation is ocurring in a heavy handed way by triggering an exception wherever the mutation exists. Functional Programming is about returning values, not causing side effects, and throwing errors is just that: intentional side effects.

However, it can be a powerful tool to help find the impurity, fix it, and move forward.

First, ensure your code is in strict mode, typically writing `"use strict"` at the top of the file(s). Second, wrap your data in `Object.freeze`:

```javascript
Object.freeze(myObjectOrArray)
```

Anytime code attempts to modify it, it'll throw a `TypeError`, and you should be able to glean where the offending non-FP code is from the stack trace.

The bad news is, if you leave this code in your program, you're intentionally leaving a side effect (code that can throw an error) in your coe. Once you've found the offending mutation, you should remove it if you wish to be pure.

The good news is, if you don't, as long as you don't have any mutation, it'll work just fine with Object destructuring.

# Immutable.js

The [Immutable.js](https://facebook.github.io/immutable-js/) library allows you to use common data types, but in an immutable way. For exampe, `Array` and `Object` in JavaScript can easily be used in immutable ways by using Object/Array [Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), but things like [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) cannot. Also, only some methods of `Array` are immutable. Immutable gives you all these data types with methods that are pure, and the data is immutable. They've also added many performance enhancements beyond just memoize (caching) that you may benefit from.

To be clear, you do not need Immutable to write pure functions with immutable data in JavaScript. However, their API is nice, having extra data types is helpful, and gleaning some of the performance benefits is massive icing. For some, having the enforced immutability gives them confidence in their code.
