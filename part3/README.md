# List Comprehensions

A list comprehension is a function that takes in an Array, and outputs a different Array. Whereas predicates are pure functions that return `true` or `false`, list comprehensions are very similar, with the goal to help reduce the amount of code required to write loops such as the `for` loop. The term popularized in Python, so if you're in JavaScript, you'd say "Array Comprehensions".

Pure loops with less code.

Many people sell list comprehensions coming from the Ruby or Python background as a way to do loops with less code. That misses the fundamental goal is to ensure purity. You can create pure functions using regular `for` and `while` loops, just like you can use `var` and `let`, yet still ensure the function is pure. However, they are quite imperative, and you can make mistakes easier. It also has "mutation mindset" such as mutating a list index or keeping track of a current value, which is ok but isn't how pure functions work.

## The Big 3

In weight lifting, there is the concept of [The Big 3](https://rippedbody.com/the-big-3-routine/). The Squat, Bench Press, and Deadlift. They are the core exercises to become strong.

List comprehensions are no different. The Big 3 for them is `map`, `filter`, and `reduce`. We'll cover those 3 today as well as using 3 additional functions they are used to build, `every`, `some`, and `zip`. Using these with predicates and other pure functions, you'll start to learn the basics of composing, and start to glimpse at how pure functions work well together in a more predictable fashion.

Finally, you'll gain a re-appreciation for an old friend, the Array, and how powerful she is.

# Note on Browser / Node Support

Many array comprehensions are being added to the core [JavaScript Array class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). That said, many will mutate the Array instead of returning a new Array. Even [Lodash](https://lodash.com/docs/4.17.10) will occasionally do this. That said, for things like `map`, `filter`, etc. we'll be using Lodash merely because those particular functions are safe and immutable, and it's an extremely battle tested library. Additionally, the syntax for Lodash and Ramda is based on pure functions taking inputs whereas most Array methods are based on class methods which are subject to being impure because of them being defined on the mutable `Array.prototype`. Remember the [Trouble With Dots](part1/trouble_with_dots.md). Modifying class prototypes has fallen out of fashion, and most modern browsers including Node have good parity on ensure `map` works the same in all browsers and engines. Thus you are welcome to use the native ones if you're so inclined.