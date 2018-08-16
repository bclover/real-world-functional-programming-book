# reduce: 3 things go in, what you've accumulated comes out

The `reduce` function takes an Array, a function to modify the data, and a starting value. The function gets each item in the Array and the current value of the accumulator. Whatever you return in the function will update the accumulator value. You don't have to update the accumulator at all if you don't want to.

## Old Sk00l for

Let's accumulate using the traditional `for` loop. We want to iterate over a list of party members and create a formatted `String` summarizing what is in the list.

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

const len = party.length
let summary = ''
for(i = 0; i < len; i++) {
    const member = party[i]
    summary += `${member.name} \t- ${member.hitPoints}/${member.maxHitPoints}\n`
}
console.log(summary)
```

The `summary` ends up looking like:

```
Jesse   - 20/22
Brandy  - 14/14
Albus   - 5/9
```

# reduce

We can purify that by using `reduce`:

```javascript
const addMemberToSummary = (summary, member) =>
    `${summary}${member.name} \t- ${member.hitPoints}/${member.maxHitPoints}\n`

const partyToString = party =>
    reduce(
        party,
        addMemberToSummary,
        ''
    )
partyToString(party)
```

Gives us:

```
Jesse   - 20/22
Brandy  - 14/14
Albus   - 5/9
```

The `addMemberToSummary` will be called for each item of the Array. The `reduce` function will give the accumulator as the first argument, and the item in the Array as the 2nd. Since it returns a String, the accumulator will be set to that string. Notice while we're returning a new String each time, we ensure it's appended to the accumulator by injecting it in the front; whatever we add always goes at the end.

What was `summary` in the `for` loop example is our 3rd argument to the `reduce` function. The key difference is in our `for` loop:
- it was a variable
- it was mutated each loop
- we had to store it

Using `reduce`:
- it's an immutable constant
- your function returns a new value to set it to for the next function call
- `reduce` stores it

## Conclusions

Reduce: Take an Array of things in as well as an accumulator, give the current value of the accumulator and the current item in the Array to the reduce function, whatever that function returns will be set as the new value for the accumulator. Whatever the accumulator value is after the last item in the Array has been iterated over, that's what is returned from the function. The `reduce` function expects a pure reducer function, and is itself a pure function.

Unlike `map` and `filter`, the `reduce` function can take long while to wrap your head around. Additionally, you can still struggle to remember exactly how it works for a long time, and continually look up the documentation on parameter order, and the reducer function parameter order. Also, the accumulator can be anything (a `Number` for adding numbers, another `Array` for doing a more complicated `map`, etc) so it can take time to find creative uses from your own exploration. Give yourself some slack; this is the hardest of The Big 3 list comprehensions to memorize, use, and get proficient with.

For those familiar with the [Redux](https://redux.js.org/) framework, the function `reduce` takes is called a reducer function, and that's basically the core of how Redux works. 




