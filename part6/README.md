# Algebraic Data Types

Algebraic Data Types are Objects in Functional Programming that give you a common interfaces to work with data. While I promised I wouldn't cover Category Theory in this book, it does hold one compelling reason to learn Functional Programming:

> What if everything had the same interface?

While dynamic programming languages don't have strong typing, they still have native types like Array and Promise that hold data and have conventions on how you use them. An Array is a list, I can add data to it, get data out using numbers or methods, and construction methods like Array destructuring `[...original, "new data to add"]. Promise also wraps data in itself, you can get data out using `then`, and like Array, you can chain Promises together by returning a Promise in the `then` callback.

Algebraic Data Types, or ADT's for short, are useful just like Array and Promise are useful: Hold data, you can get data out, and depending on which library you use, all can be chained together in known ways.

This is also where dynamic languages start to become painful. Creating an Array or Promise is fine, but once you start chaining things together, it's hard to know "what comes out" without a compiler or intellisense in your IDE to help you. Algebraic Data Types have this problem as well once you start composing them together. You only really know if it works by running the code. Still, they can add clarity of intent, help in data validation, and make it easier to work with data and errors.