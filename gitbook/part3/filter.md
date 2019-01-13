# Filter: 3 things go in, only the things you want come out

The `filter` function is another array comprehension like `map` used when a user is filtering search results they want to see, and in parsing operations. You give it an Array and a predicate function (a function that only returns `true` or `false`). The `filter` function will give every item to the predicate, and whenever that function returns `true`, it'll put that item in the new Array, else if it's `false`, it won't include it.

## Old Sk00l for

Let's filter using the traditional `for` loop. We have our list of people and doggo's, and we're only wanting to keep the humans.

```javascript
const group = [
    {
        name: 'Jesse',
        type: 'human'
    },
    {
        name: 'Brandy',
        type: 'human'
    },
    {
        name: 'Albus',
        type: 'dog'
    }
]

const len = group.length
const filtered = []
for(i = 0; i < len; i++) {
    const current = group[i]
    if(current.type === 'human') {
        filtered.push(current)
    }
}
```

Logging it out, we can see our new `filtered` Array is:

```javascript
[ { name: 'Jesse', type: 'human' },
  { name: 'Brandy', type: 'human' } ]
```

## filter: raw

We can create a somewhat pure function using `filter`:

```javascript
import { filter } from 'lodash'

const typeIsHuman = item => item.type === 'human'
const filterHumans = group =>
    filter(
        group, 
        typeIsHuman
    )
```

If we pass `filterHumans` the group, it'll give us the same filtered, new Array back like the above `for` loop does:

```javascript
console.log(filterHumans(group))
[ { name: 'Jesse', type: 'human' },
  { name: 'Brandy', type: 'human' } ]
```

## filter: pure

While our `filterHumans` function is pure, it still has the Trouble With Dots. In [Part 3: map](part3/map.md) we fixed the dot problem there using `nth` function which solves the Trouble With Array Bracket Access problem. Our fix here is to use `get`.

Updating our `typeIsHuman` function above, we'll fix the predicate function we pass the `filter`:

```javascript
import { ..., get } from 'lodash'

const typeIsHuman = item => get(item, 'type') === 'human'
```

Now, if `item` is `undefined`, `get(undefined, 'type')` will return `undefined`, and the predicate will return `false`, ensuring the weird item isn't included in the filter.

## Conclusions

Filter: Take an Array of things in, give each thing to a function, if the function returns `true` when you give it an item, store it in an new Array to give back, else discard it. The `filter` function expects a pure predicate function, and is itself a pure function.

