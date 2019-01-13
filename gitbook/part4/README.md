# Why vs. How Curry Works

If you're more interested in how currying can help you in your current work vs the how it works, skip this and the following 5 sections and go to the [Lodash FP](lodash_fp.md) section. It compares and contrasts the 2 libraries giving you insights into how function currying and partial applications can be useful in your work.

# Curry and Partial Application

Currying, or function currying, is when you make all functions take 1 argument, even those that normal need more. This means if you have a function that takes 2 arguments to do something useful, if you call it with 1 argument, it'll return a function. If you call that returned function with 1 argument, it'll then return the result. It's named after the guy who invented the technique, Haskell Brooks Curry.

Why in the world would you ever do this bizarre practice?

When you start using pure functions, you'll notice that your functions start to have a lot of arguments. Features like default arguments, variable number of arguments, or referencing class variables that significantly reduce how many arguments your functions need are discouraged. If a pure function must declare it's dependencies to the outside world in its function parameters, then if it starts to compose other functions who have needs, then those are all added together into a lot of function arguments needed to run the function.

Dynamic languages also have pure abstractions to ensure no runtime errors. Things like `get`, `set`, `lenses` to safely access and set data, try/catch for ensuring no errors as side effects, and using the Factory design pattern for creating complex Objects many JavaScript libraries need to initialize themselves. All of this adds verbosity you don't have in type compiled languages.

## Entropy of Simplicity

To determine if something is a `String` only requires 1 argument: 

```javascript
const isString = o => typeof o === 'string'
```

Making an HTTP call requires both the http module and the URL:

```javascript
const getDataFromServer = (request, url) => {
    ...
}
```

Logging customer financial transactions to your audit logging server for safe keeping requires... well... a lot:

```javascript
const getAuditLogger = (
    kafkaClient, 
    kafkaOptions, 
    sslOptions, 
    environment,
    region,
    schemaID,
    dataVerificationID
) => {
    ...
}
```

Pure to be sure, but wow... is this what it's like in the real world?

The solution is to use function currying, partial applications as arguments, and good old examining your requirements and code to ensure your functions are as simple as possible.


