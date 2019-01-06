# Warning

Learning Functional Programming will change your life, but not necessarily for the better. I'm happy I continue to learn more about it, and feel is has drastically improved my ability to write reliable code. Unit tests are easier to write. It is a different way of thinking about code, and will change the way you look at code once you learn it. There is no going back.

Like the time I learned Object Oriented Programming, or Design Patterns, or Model View Controller frameworks, you see the world in a new way. You have a new hammer and everything becomes a nail. You know the "one true way" and you struggle to reconcile the new way with the ways of old.

Except it's different this time. Once you learn FP, you'll struggle to explain it to other coders and friends who may be entrenched in Imperative or OOP, but are curious about FP. Your code will start to look alien to non-FP'ers. Unless you're around other FP'ers, or those wishing to learn FP, you'll feel alone.

I feel it's worth it. Just be aware the above will happen and prepare yourself mentally.

# The Elevator Pitch

What if I told you you could write JavaScript that doesn't throw errors, requires no mocks for unit testing, and you never have to memorize a `this` rule again? No `undefined is not a function`, no [Sinon spies](https://sinonjs.org/releases/v4.0.0/spies/), and never using `class` or `bind` again, just building functions that work. You can instead focus on testing if your code is correct vs. if it mostly works and hopefully doesn't explode.

What's the catch? In JavaScript, most of the code you use isn't yours and comes from the [Node Package Manager](http://npmjs.com/) called `npm`. The library most likely uses `throw` intentionally, uses classes and inheritance, and isn't written in FP style. Front-end web development frameworks like [React](https://reactjs.org/) & [Angular](https://angular.io/) are not 100% functional. You'll have to not only write your own functional style code, but learn how to deal with non-functional code, in a functional way. While the 100% black box unit test coverage is easier to attain in FP code, you'll still have bugs or code that isn't correctly working.

Beyond that, no catch.

# What Does "Real-World" Mean?

Languages like JavaScript, Python, and Java are languages you can get a job using at the time of this writing. They're all used in web development, data science & machine learning, and building REST API's. You can use them and work with non-functional programmers in the same code base and library ecosystem. While it's slowly changing, it currently is hard to get a job using functional languages. Tech industry interviews are broken hiring for what someone perceives you know with their bias vs hiring for helping someone learn. Companies hire for someone knowing a particular language or framework vs. ability to learn new ones. Many managers are afraid to use non-standard languages because they don't think they can hire people to maintain the code base if you or your FP co-workers leave. Not everyone wants to learn FP just like I'm currently suffering at my job learning and using [Go](https://golang.org/) #datEntitlement.

This guide is meant to teach you concepts you can use to benefit your current work in "normal" programming languages as well as ensuring you still can get a job "using Java" if you wish. Part of the skill, and challenge, of using FP in the current climate is co-existing with non-functional programmers in non-functional programming languages. The good news is that JavaScript, Python, and other dynamic languages have all you need built into the language to start programming FP while co-existing with code that isn't FP. Even strongly typed class ones like Java and C# do as well.

# Real-World Functional Programming

This book will teach you all you need to know to start using Functional Programming in the code you write in your day to day job. We will cover all the basics, what to practice to get better, and how to compose entire programs. Lastly, we'll give you various strategies for easing it into existing codebases and teams. We'll cover it from both back-end and front end perspectives.

While our examples are in dynamic, interpreted languages like [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [Python](https://www.python.org/), and [Lua](https://www.lua.org/), you can use in any language that has functions with inputs, outputs, and higher order functions. We'll show examples from other languages that help corroborate existing concepts such as [Go](https://golang.org/) error handling and [Elixir](https://elixir-lang.org/) matching syntax.

## Assumed Knowledge

This book assumes you know the basics of programming. You know what procedural/imperative line by line code is like such as `bash`, you're at least familiar with Object Oriented Programming like C# or Java, and have written some unit tests at least once in your life. We also assume you know how functions, scope, and closures work in JavaScript, Python, or Lua, although we'll do a refresher on closures since they are extremely important.

## Using This Book

You are welcome to skip around the sections. However, we encourage you to read the pure function section at least once. The most important concept, and implementation details of Functional Programming are based on pure functions.

## What We're Not Going To Cover

To keep things simple, we're not going to cover anything with strong types, nor Category Theory. While you'll reap some of the benefits of Category Theory in what you'll learn here, we're not covering Functors or Monads for example.  If you wish to learn more about Category Theory in a pragmatic way, check out [Dr Boolean's Mostly Adequate Guide](https://drboolean.gitbooks.io/mostly-adequate-guide-old/content/). If you wish to learn more about strong types, check out language documentation that supports functional programming with strong typing such as [Elm](http://elm-lang.org/), [PureScript](http://www.purescript.org/),[TypeScript](https://www.typescriptlang.org/), or [Flow](https://flow.org/).

We're also not going to cover effect handling such as [Algebraic Effects](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/08/algeff-tr-2016-v2.pdf) which is what [React Hooks](https://reactjs.org/docs/hooks-intro.html) are based on. For JavaScript, we'll just use Promises. However, frameworks like [Redux](https://redux.js.org/), [Saga](https://redux-saga.js.org/), [Calmm](https://github.com/calmm-js/documentation/blob/master/introduction-to-calmm.md), or even [the architecture of Elm](https://guide.elm-lang.org/architecture/) handle it in a more pure way if you're interested.

## Nomenclature

Coming from an art background and not a computer science one, I tend to abuse terms or use many interchangeably. Below are definitions of commonly used ones throughout the book that while may make sense in context, can possibly be confusing if not clear exactly what one means.

### arguments / parameters

Functions take in arguments and sometimes return values. The arguments are the named variables between the paranethesis:

```javascript
function gimmeDat(bass) {
    ...
}
```

In this case, the function `gimmeDat` takes 1 argument, `bass`. I'll often call that "arguments" or "parameters" which both effectively mean the same thing as far as this book is concerned.

### shell / bash

When you open a terminal, such as a Command Prompt on Windows or a Terminal in Mac or Linux, you typically write "shell code" in a "bash window". When we refer to "shell" or "bash", we're talking about writing commands in that terminal window.

> Just run `npm install`

Means open a Terminal, `cd` to the directory of where your code is, and type `npm install` and press <kbd>Enter</kbd> to execute that command.

## Formatting Assumptions

Below are explanations around how certain code is formatted through this book.

### Code

When referring to code specific things like a function, we'll write the `function` like that. This implys it is code.

### Bash, Shell, and Terminal

When referering to shell/bash/terminal, we'll wrap commands with similiar syntax like running `npm install` or `cd`'ing (change directory).

### Operation or NOOP

An operation that takes inputs and that may return an output is called a function. However, some languages distuinguish between them. They'll say an operation is a function that takes an input but operates on the data and doesn't return anything. In that sense, `console.log` would be an operation whereas a function would be `Math.abs`.

However, there is something called a "Noop" or "No Opt" which is slang for "No operation". This is a function that takes an input, but doesn't return a value. In that sense, `console.log` would be a Noop. Completely backwards, I know.

Whatever you call them, we try to avoid using Noops in Functional Programming: functions that do not return values. Typically Noops have side effects which is what we try to avoid or push to the sides of our code.

## Code Foramtting

When writing code, we'll either do it short form like `const yoDog = () => console.log('sup!')` or long form like:

```javascript
const yoDog = () => console.log('sup!')
```

### Strings

We use single `'` and double `"` quotes interchangeably and each one has the same meaning: it's a `String`. We only whip out the template strings when building larger strings through dynamic data:

```javascript
const you = "You are "
const amaze = "awesome!"
const bigOleMessage = `${you}${amaze}`
```

### Logging

We'll vary between 3 forms of logging to show you the values of variables and return values of functions. Sometimes we'll be explicit via `console.log` and the value commented out to the right of the `console.log`:

```javascript
const MAX_TREBLE = 100
const maxTheTreble () => MAX_TREBLE
console.log(maxTheTreble) // 100
```

Other times we'll just use `log`:

```javascript
const log = console.log
const MAX_TREBLE = 100
const maxTheTreble () => MAX_TREBLE
log(maxTheTreble) // 100
```

Other times, we'll just write the commented result next to the function itself:

```javascript
const maxTheTreble () => MAX_TREBLE // 100
```

But often below it:

```javascript
const maxTheTreble () => MAX_TREBLE
// 100
```

### Repeating Code

In order to reduce how much code you have to look at and so we can focus on core ideas, we'll often imply "the code we already covered, but I'm not writing again" or "code is here, but we don't care about it for what we're currently talking about".

For example, in the above, we'll write:

```javascript
const MAX_TREBLE = 100
const maxTheTreble () => MAX_TREBLE
```

And then later, talking about the same code, but 1 addition to it, we'll replace the stuff we already saw with ellipsis (3 dots):

```javascript
...
console.log(maxTheTreble()) // 100
```

This includes function bodies. The below function, we don't care about the implementation, so we just put an ellispsis in there to imply "there is code in here, but it's not important to focus on right now": 

```javascript
const someComplicatedFunction = () => {
    ...
}
```

### Arguments No One Cares About vs. Catch All

Some functions will give arguments that we'll never use. Some [linters](https://eslint.org/) in JavaScript don't allow you to define variables and parameters that aren't used, whereas some Type systems like TypeScript don't allow you to define callbacks that don't follow the type signature thus requiring you define the variable to satisfy the type signature even though you're not going to use it.

For us, we just follow the `Elixir` and `Elm` way of doing things using an underscore `_`:

```javascript
const validateAlotOfData = data =>
    validate(data)
    .matchWith({
        Success: _ => coolDoOtherThings()
        , Failure: error => reportError(error)
    })
```

Note in the above, we don't care about the details of a successful validation. If it validated, that's good enough for us, no need to care about the value so we just use `_` to imply it's there.

For [Underscore](https://underscorejs.org/) or [Lodash](https://lodash.com/) fans, this can be confusing and imply you're passing the Lodash object as a parameter. We're not, we simply are saying there is an argument here, but we don't care about it.

In `Elixir` and `Elm`, it can have double meanings such as "I don't care" or "everything else, catch all, the default". For example, here is an Elixir case statement interpreting some commandline input:  

```elixir
case input do
    "sup" ->
        "sup yo!"
    "dude" ->
        "duuuude...."
    "humor me" ->
        "Two guys walk into bar, the 3rd one ducks."
    _ ->
        "Unknown input."
```

The `_` in this case operates just like a `default` would in a JavaScript `switch` statement:

```javascript
switch(input) {
    case "sup":
        return "sup yo!"
    case "dude":
        return "duuuude...."
    case "humor me":
        return "Two guys walk into bar, the 3rd one ducks."
    default:
        return "Unknown input."
}
```

### Function Alignment

For small functions, we'll write them like this, `const yo = () => 'sup'` inline in the setence. However, you'll sometimes see those 1 line functions on 2 lines:

```javascript
const yo = () =>
    'sup'
```

vs. how it was shown inline:

```javascript
const yo = () => 'sup'
```

We try to follow the [Elm styling](https://elm-lang.org/docs/style-guide) around functions where you put the function definition on the first line, then the function body on the second. This includes manually curried functions like:

```javascript
const ping = request => url =>
    request.get(url)
```

### What the heck is wrong with your comma placement?

For lists or manual function arguments, you'll see the commas placed in in front of the items like this:

```javascript
const peeps =
    [
        "Jesse"
        , "Brandy"
        , "Sydney"
        , "Rowan"
        , "Albus"
    ]
```

Instead of how it's normally shown in JavaScript / Python / Lua:
```javascript
const peeps =
    [
        "Jesse",
        "Brandy",
        "Sydney",
        "Rowan",
        "Albus"
    ]
```

Putting that on the same line allows you to comment things out when you want to play with data:

```javascript
const peeps =
    [
        "Jesse"
        , "Brandy"
        // , "Sydney"
        , "Rowan"
        // , "Albus"
    ]
```

