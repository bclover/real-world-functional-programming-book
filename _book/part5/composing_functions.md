# Composing Functions

Composing functions is when you combine a bunch of functions together to form a new function. When you build applications using Functional Programming, you'll be building new functions from existing functions. Flow in Lodash, Compose in Ramda, Folktale, and Sanctuary, allow you to pipe functions together in JavaScript. We briefly showed an example of this in the [Tacit Programming](tacit_programming.md) section using `flow`. Python and Lua make this a lot easier since both synchronous things like adding numbers and asynchronous things like loading data from websites work the exact the same way if you use the basics of the language.

JavaScript, however, handles asynchronous completely differently through `Promises`, Python optionally through their various concurrency options, and Lua through coroutines. We'll cover both below so you'll be deadly no matter which language you choose to wield.

## Prior Art

A lot of languages and libraries already do some form of composition where you'll "dot chain" functions together to string together the output of one into the arguments of another.

String and Array in plain JavaScript:

```javascript
'Jesse,Brandy'
.split(',')
.map(name => `${name} is crunk on vacay, urrrkaaayy!`)
.sort()
.join('\n')
.toUpperCase()
// BRANDY IS CRUNK ON VACAY, URRRKAAAYY!
// JESSE IS CRUNK ON VACAY, URRRKAAAYY!
```

Chaining selectors in [JQuery](https://jquery.com/):

```javascript
$(document).ready(() => {
    $('#dvContent')
    .addClass('dummy')
    .css('color', 'red')
    .fadeIn('slow');    
})
```

And straddling both the sync and async worlds of JavaScript using RxJS:

```javascript
const { fromPromise, from } = require('rx')

const getLambdaFunctions = functions => 
    fromPromise(listAWSFunctions(functions))
    .pluck('Functions')
    .selectMany(from)
    .filter(lambda => get('Runtime', lambda) === 'nodejs')
    .filter(containsBasicRole)
    .toArray()
```

## Sync With Flow




