# Spot The Impurities

We're going to show a series of functions that are pure and impure. You'll see the various ways they break the pure function rules, and how to fix them. The strength of dynamic languages is that they have a wide variety of developers from different backgrounds such as Imperative, Object Oriented, and Declarative (Functional Programming).

Declarative is in the minority.

As such, you'll be navigating a lot of impure code and will have to decide what to make pure and what not too based on your experience, deadlines, and team norms. Knowing the nuanced ways one can break function purity will help you navigate non-pure code. You'll also start to develop a Spidey Sense about the signs of impurity, both in the code you read and in the code you write. As you develop this 6th sense, it'll help you on your journey to function purity and in code reviews of peers.

## Prior Art

But first, let's look at the various pure and impure functions built into JavaScript itself.

```javascript
Math.round(1.034) // 1
Math.round(1.034) // 1
Math.round(1.034) // 1
```

Same input, same output. There is no side effects, either; you're just operating on the `Number` you passed in. Since the `Number` you passed is pass "by val", it'll create a clone, so the output is a completely different `Number` than the one you passed in.

However, even `Math` can be impure:

```javascript
Math.random() // 0.9746597969597086
Math.random() // 0.58324610344788
Math.random() // 0.8089727088931593
```

Same input, different output. Now cryptologists, those who work in software security, will tell you that technically `Math.random()` isn't random and thus deterministic. While true, the function still breaks function purity rules.

Arrays, which are passed "by ref", different variable pointing to the same data, also have their share of pure and impure functions.

If we want to combine 2 Arrays together we can use `concat`:

```javascript
const parents = [ 'Jesse', 'Brandy' ]
const kids = [ 'Sydney', 'Rowan' ]
const family = parents.concat(kids)
console.log(family) // [ 'Jesse', 'Brandy', 'Sydney', 'Rowan' ]
console.log(parents) // [ 'Jesse', 'Brandy' ]
console.log(kids) // [ 'Sydney', 'Rowan' ]
```

Same input, same output, no side effects.

However, `reverse` doesn't create a new Array, and instead mutates the original.

```javascript
console.log(parents) // [ 'Jesse', 'Brandy' ]
const reversed = parents.reverse()
console.log(reversed) // [ 'Brandy', 'Jesse' ]
console.log(parents) // [ 'Brandy', 'Jesse' ]
```

Same input, same output, but it has side effects. The world changes after it runs because it doesn't utilize immutability.

Libraries like [Ramda](https://ramdajs.com/docs/#reverse) are built using pure functions. This makes it so you can use the same method names like Array's `reverse`, but not worry about side effects as all return values are immutable.

## Closures

Closures, whether Node or Browser, are a common way to utilizes imported modules and classes.

```javascript
import request from 'request-promise'

const getUsers = () => {
    return request.get('/api/users/all', {json: true})
}
```

This breaks the pure function rules in 2 ways: it's affected by the outside world, and it has side effects after it runs. The `getUsers` won't always return the same output because the `request` doesn't come in from the function arguments. You'll also end up having to mutate your code using mocking/stubbing libraries like [Sinon](https://sinonjs.org/) or [TestDouble](https://github.com/testdouble/testdouble.js/) to test it. The side effects is from the `request.get` making an HTTP call.

**Partial Solution**: Declare your dependencies in your arguments.

You make it pure by passing in the `request` module.

```javascript
import request from 'request-promise'

const getUsers = request => {
    return request.get('/api/users/all', {json: true})
}
```

While you could turn your internet off, and the Promise that the `request` returns fails, the `getUsers` function is still returning a Promise every time from the same module. To unit test it, all you need is a simple stub:

```javascript
const requestStub = { get: (url, options) => Promise.resolve(['user'])}
it('should return a Promise', ()=> {
    const result = getUsers(requestStub)
    const isAPromise = isPromise(result)
    expect(isAPromise).to.equal(true)
})
// using chai-as-promised
it('should resolve with a good stub', ()=> {
    return expect(getUsers(requestStub)).to.be.fulfilled
})
it('should resolve with a user', ()=> {
    return expect(getUsers(requestStub)).to.become(['user'])
})
```

## HTTP Call Fix?

Fixing the HTTP call that is made, affecting the outside world after the function runs, is beyond the scope of this book. That level of purity is only gained through creating your own class/Object to contain those side effects, like [Elm](http://elm-lang.org/) does, or using strict state containers like [Redux](https://redux.js.org/), [Calmm](https://github.com/calmm-js/documentation/blob/master/introduction-to-calmm.md), or even more advanced methods. Many think it isn't worth it given it's such a common thing to do in browser applications and Node API's.

In JavaScript, the simple solution is to return a `Promise`. It'll resolve when the operation is successful or not through `.then` and `.catch`. As long as the function you send to the `Promise` is a pure function, you're good "enough".

## React Components

// TODO