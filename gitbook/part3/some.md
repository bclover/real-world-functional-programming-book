# some: 3 things go in, true comes out if the predicate says at least one thing is true

The `some` functions an Array and a predicate function, and returns `true` if the predicate function returns true for at least 1 of the Array items. Like `every`, it's another Array comprehension built atop The Big 3.

## Old Sk00l for

Let's every our party has at least one person who can act as a Doctor for the other party members in case they get hurt.


```javascript
const party = [
    {
        name: 'Jesse',
        clazz: 'Swashbuckler',
        hitPoints: 20,
        maxHitPoints: 22
    },
    {
        name: 'Brandy',
        clazz: 'Cleric',
        hitPoints: 14,
        maxHitPoints: 14
    },
    {
        name: 'Albus',
        clazz: 'War Dog',
        hitPoints: 5,
        maxHitPoints: 9
    }
]

let atLeast1Healer = false
for(i = 0; i < party.length; i++) {
    const member = party[i]
    if(member.clazz === 'Cleric') {
        atLeast1Healer = true
    }
}
console.log(atLeast1Healer) // true
```

It's `true` because Brandy is a Cleric even though Jesse and Albus are not.

## some

We can purify that by using `some`:

```javascript
const { some } = require('lodash')

const isCleric = member =>
    member.clazz === 'Cleric'

const partyHasAtLeastOneDoctor = party =>
    some(party, isCleric)
```

Because Brandy is a Cleric, the `isCleric` function will return `true` at least once while `some` is looping through all 3 party members.

## Type Detection

With `every`, we ensured that a party member was exactly as we expected it to be. Some types in dynamic languages, however, we can be more flexible with. For example, while interfaces aren't natively supported, can we test for that. An example is detecting if something is a `Promise`. While `Promise` is a native `class` in JavaScript, a lot of implementations of Promise have cropped up in the past decade while waiting for the API be officially implemented by browsers.

Instead of being strict like we were with `every` around a party member, we'll see if it has the `then` of a Promise or Promise like library, or JQuery's `done`:

```javascript
const { isFunction, get } = require('lodash')

const hasThen = o =>
    isFunction(get(o, 'then'))

const hasDone = o =>
    isFunction(get(o, 'done'))

const isPromiseLike = o =>
    hasThen(o) && hasDone(o)


