# Warning

Learning Functional Programming will change your life, but not necessarily for the better. I'm happy I continue to learn more about it, and feel is has drastically improved my ability to write reliable code. Unit tests are easier to write.

Like the time I learned Object Oriented Programming, or Design Patterns, or Model View Controller frameworks, you see the world in a new way. You have a new hammer and everything becomes a nail. You know the "one true way" and there is no going back and you struggle to reconcile the new way with the ways of old.

Except it's different this time. Once you learn FP, you'll struggle to explain it to other coders and friends. Your code will start to look alien to non-FP'ers. Unless you're around other FP'ers, or those wishing to learn FP, you'll feel alone.

I feel it's worth it. Just be aware the above will happen.

# The Elevator Pitch

What if I told you you could write JavaScript that doesn't throw errors, requires no mocks for unit testing, and you never have to memorize a `this` rule again? No `undefined is not a function`, no [Sinon spies](https://sinonjs.org/releases/v4.0.0/spies/), and never using `class` or `bind` again, just building functions that work.

What's the catch? In JavaScript, most of the code you use isn't yours and comes from npm. The library most likely uses `throw` intentionally, uses classes and inheritance, and isn't written in FP style. Frameworks like React & Angular are not 100% functional. You'll have to not only write your own functional style code, but learn how to deal with non-functional code, in a functional way.

Beyond that, no catch.

# What Does "Real-World" Mean?

Languages like JavaScript, Python, and Java are languages you can get a job using at the time of this writing. Web development, data science & machine learning, and REST API's. You can use them and work with non-functional programmers in the same code base. While it's slowly changing, it currently is hard to get a job using functional languages. Tech industry interviews are broken. Many managers are afraid to use non-standard languages because they don't think they can hire people to fix and maintain the code base. Companies hire for someone knowing a language or skill vs. ability to learn. This guide is meant to teach you concepts you can use to benefit your current work in "normal" programming languages as well as ensuring you still can get a job "using Java".

# Real-World Functional Programming

This book will teach you all you need to know to start using Functional Programming in the code you write in your day to day job. We will cover all the basics, what to practice to get better, and how to compose entire programs. Lastly, we'll give you various strategies for easing it into existing codebases and teams. We'll cover it from both back-end and front end perspectives.

While our examples are in dynamic, interpreted languages like [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [Python](https://www.python.org/), and [Lua](https://www.lua.org/), you can use in any language that has functions with inputs, outputs, and higher order functions. We'll show examples from other languages that help corroborate existing concepts such as [Go](https://golang.org/) error handling and [Elixir](https://elixir-lang.org/) matching syntax.

## Assumed Knowledge

This book assumes you know the basics of programming. You know what procedural/imperative line by line code is like bash, you're at least familiar with Object Oriented Programming like C# or Java, and have written some unit tests at least once in your life. We also assume you know how functions, scope, and closures work in JavaScript, Python, or Lua.

## Using This Book

You are welcome to skip around the sections. However, we encourage you to read the pure function section at least once. The most important concept, and implementation details of Functional Programming are based on pure functions.

## What We're Not Going To Cover

To keep things simple, we're not going to cover anything with strong types, nor Category Theory. While you'll reap some of the benefits of Category Theory in what you'll learn here, we're not covering Functors or Monads for example.  If you wish to learn more about Category Theory in a pragmatic way, check out [Dr Boolean's Mostly Adequate Guide](https://drboolean.gitbooks.io/mostly-adequate-guide-old/content/). If you wish to learn more about strong types, check out language documentation that supports functional programming with strong typing such as [Elm](http://elm-lang.org/), [PureScript](http://www.purescript.org/),[TypeScript](https://www.typescriptlang.org/), or [Flow](https://flow.org/).

We're also not going to cover effect handling. For JavaScript, we'll just use Promises. However, frameworks like [Redux](https://redux.js.org/), [Saga](https://redux-saga.js.org/), [Calmm](https://github.com/calmm-js/documentation/blob/master/introduction-to-calmm.md), or even [the architecture of Elm](https://guide.elm-lang.org/architecture/) handle it in a more pure way if you're interested.