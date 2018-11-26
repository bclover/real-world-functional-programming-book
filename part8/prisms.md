# Prisms

A prism is an isomorphism that is total. Meaning, if `JSON.parse` fails, it doesn't throw an Error in our lens. Let's update our `jsonISO` we created in [Part 7's Isomorphism](isomorphism.md) from a partial iso to a total iso. We take what we learned from [Part 7 on total functions](../part7/README.md) and make our Isomorphism total-ish. We don't have to worry, for now, about going back (i.e. the setter `JSON.stringify`), just the getter (`JSON.parse`).

This is also the only time it is ok to use `null` in JavaScript.

## From Partial To Total

We'll take the existing iso:

```javascript
const jsonISO = iso(JSON.parse, JSON.stringify)
```

Instead, we'll add basic erorr handling, and return `null` if it doesn't work:

```javascript
import { simplePrism } from 'focused'

const jsonISOMaybe = simplePrism(
    string => {
        try {
            return JSON.parse(string)
        } catch (error) {
            return null
        }
    }, 
    JSON.stringify
)
```

Testing it out with a good string:

```javascript
const savedGameString = readFileSync('savedgame.json')
const updatedString = set(_.$(jsonISOMaybe).saveDate, new Date(), savedGameString)
```

... iet works the same:

```json
{ "saveDate": "2018-11-25T23:32:41.887Z",
    "map": "overworld",
    "chapter": 3,
    ...
```

However, notice if you give bad JSON that would cause `JSON.parse` to fail:

```javascript
set(_.$(jsonISOMaybe).saveDate, new Date(), '🐮')
// 🐮
```

... it just acts like an `identity` function, and gives you back the source string.
