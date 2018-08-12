# Pure Functions

This is the **most important section** of the entire book. If you're in a hurry or don't have the attention span, only read this part.

Pure Functions are functions that given the same input, they'll give the same output, and have no side effects. A function that takes some arguments will always return the same value and no be affected by variables outside the function, nor will it change variables outside of it. They are the core foundation of all Functional Programming. They are the reason unit tests in FP don't need to use mocks.

They are also surprisingly flexible in their application despite their definition clearly stating that "1 plus 1 equals 2". Many programmers, even those who use FP languages and espouse the benefits, can be lax in how "pure" their code truly is. Making things too pure is where you'll often see criticism of FP.

Making your code knowingly less pure is **fine**. At first you won't have a choice because you won't know any better. Later once you're skilled, you'll recognize the pain and time it'll take to follow the rules and make the right call it's not worth it. Calling this technical debt in code review doesn't always fly, though, as sometimes the library author or team has their own level of purity they're willing to go.

# What We'll Cover

We'll first cover the 2 rules of same input, same output and the no side effects. In dynamic languages, these rules can be more easily and stealthily broken.

Once you learn function purity and immutability, you'll realize that you're only allowed to use constants instead of variables. We'll cover how you can use them safely.

We'll take an error quest and explore ways in which errors uniquely break function purity. A lot of programming is based around exceptions happening and inspecting the stack trace to debug. That's not how Functional Programming works. We'll show you why, how to avoid them, and what to do instead. 

JavaScript, Python, and Lua allow Procedural, Object Oriented, and Functional Programming styles. That's why they're so widely used; everyone can play. However, there are a lot of constructs that aren't allowed. We'll cover what isn't allowed, and strategies for using them if you must as well as caveats for unit testing around them. You're going to work with non-FP programmers, so this is a survival guide.

Finally we'll show you how to practice writing pure functions to get better at creating, and recognizing levels of purity. I started my Functional Programming learning journey by writing predicates for a security library. It helps understand the core parts of your language, see how they can affect purity, yet they are super simple functions so you don't overload your brain as you learn the secrets of the universe.

Another way to practice is to write unit tests for those predicates. If you have experience writing unit tests for non-FP code, this might be the most rewarding part for you to see how FP can make your life easier, and your test code smaller and easier to maintain.
