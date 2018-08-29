# Union

A Union is a bunch of types in one value. You use them to represent many possible types. A String  is a scalar type; `"cow"` is always `"cow"` and completely different from `"goat"`. An Object is a product type; it's the combination of many types into one like `{ name: 'Dat Moo Moo', age: 2, type: '🐮', food: ['hay', 'grass'] }`. That `Object` contains 2 `String`s, a `Number`, and an `Array`. A Union combines those products together.

If you've read this book in order, you've already seen 3 Union types: `Maybe`, `Validation` and `Result`. A `Maybe` is either a `Just` or `Nothing`. Both are distinct types like `Array`, and they have similar methods, but represent completely different things. The `Maybe` marries the 2 into 1 type.

```javascript
const union = require('folktale/adt/union/union')

const Maybe = union('Maybe', {
    Just( value ) { return { value } }
    Nothing() {}
})
```

## Basic Custom Example

Below, we're searching a list of users by ID. If we find one, we want the user it found. If it didn't find one, we want a clear message saying so, and what ID we used to search for:

```javascript
const { find } = require('lodash/fp')
const { union, derivations} = require('folktale/adt/union')

const FindUserResult = union('FindUserResult', {
    User(user) { return { user } },
    IDNotFound(userID) { return { userID } }
}).derive(derivations.debugRepresentation)

const { User, IDNotFound } = FindUserResult

const findUserByID = (users, userID) =>
    find(
        user => user.id === userID,
        users
    )

const findUser = (users, userID) =>
    findUserByID(users, userID)
    ? User(findUserByID(users, userID))
    : IDNotFound(userID)

const users = [
    { name: 'Jesse', id: 1 },
    { name: 'Brandy', id: 2 }
]

const result1 = findUser(users, 2)
console.log(result1)
// FindUserResult.User({ user: { name: "Brandy", id: 2 } })

const result2 = findUser(users, 5)
console.log(result2)
// FindUserResult.IDNotFound({ userID: 5 })
```

Similar to `Maybe`, just more specific. Note the `.derive(derivations.debugRepresentation)` is so when we `console.log` it out, it doesn't just print as a normal looking `Object`.

## More Than 2

However, not all sub-types have to have 2 like `Maybe`, `Validation`, `Result`, and `FindUserResult`:

For example, if you're using Kafka or Amazon Kinesis to build a log monitoring application, you'll often be a stream processor. You'll listen to a series of input streams, parse and aggregate the data, and then output it on another stream. Given it's from a multitude of applications, you'll be getting many different types of messages, and each one contains different information, and in turn requires a separate parsing operation.

```javascript
const Message = union('Message', {
    Log(log) { return { log } },
    DatadogMetric(metric) { return { metric } },
    ManualAlert(alert) { return { alert } },
    NetworkInfo(source, info) { return { source, info } }
})
```

## What Could Possibly Go Wrong?

Union types are great for modeling errors. They help you know more clearly what went wrong, embed debug information for future you, while keeping things pure and composable.

For example, if you want to upload an Excel file in this application we built at work, there are a lot of things to go wrong. You wouldn't know that, though, from reading this code:

```javascript
const uploadFile = request => form =>
    new Promise((success, failure) =>
        request.post('/upload', {form}, (err, res, data) =>
            err
            ? failure(err)
            : success(data)
    )
```

If you give it a `request` and some multi-part form data, she'll attempt to upload. If it works, great, you'll get the server response in the `Promise.then`. If it fails, you'll get an what went wrong in the `Promise.catch`. Cool right?

Well, no. This is an application for users who aren't always tech savvy and manage a lot of money. Any visual indication as to what went wrong can help in customer support calls and various escalations to higher level support, like the developers who wrote the code. If the developers use good error handling and the designer on the team creates a good error screen with well written copy, the developers hopefully won't ever get a support call. Additionally, any information a user might do to help fix the problem themselves can stop those calls from even happening.

So what can go wrong? There are known knowns, and known unknowns:

- your session can expire if you login and leave the web application open for 20 minutes without doing anything. Either the http status is 302, OR it's 200 but the URL is not the URL you posted too because you have a proxy in front of your API layer that makes strange decisions.
- we can't figure out who you are from the session
- you attempt to upload a file that isn't an Excel file
- you attempt to upload an Excel file that has macros in it
- you attempt to upload a virus
- you upload more than 1 file, and the first file is fine, but the other one(s) have 1 of the problems listed above
- the email took too long to send a successful email response or failed
- the messaging service that lets you know the status of your file either failed or couldn't be reached in time

Let's model that into a custom Union type:

```javascript
const FileUploadResult = union('FileUploadResult', {
    SessionExpired(error, httpStatusCode) { return { error, httpStatusCode } },
    NotLoggedIn(error, httpStatusCode) { return { error, httpStatusCode } },
    UnsupportedFileType(error, file, reason) { return { error, file, reason } },
    ExcelMacros(error, file, reason) { return { error, file, reason } },
    Virus(error, file, reason) { return { error, file, reason } },
    EmailFailed(error, file) { return { error, file } },
    MessageFailed(error) { return { error} }
    Success(file) { return { file } }
})
```

Notice all are errors, and many hold more information about the error, like the http status code vs. just looking around in the message String. The last one indicates a successful file upload and contains the file it uploaded.

Now that we have our type, we can use it to be more clear as to what went wrong or right by returning that from the `Promise`. We won't ever fail the `Promise`, though, we'll just let the caller decide, so we remove the typically success/failure, and just put resolve: 

```javascript
const uploadFile = request => form =>
    new Promise(resolve =>
        request.post('/upload', {form}, (err, res, data) =>
            resolve(getFileUploadResult(err, res, data))
    )
)
```

Calling it, we can build up String for each error to be clear what went wrong or right:

```javascript
const uploadResult = await uploadFile(require('request'))(fileForm)

uploadResult.matchWith({
    SessionExpired: ({error, httpStatusCode}) =>
        `You've been logged out. http code: ${httpStatusCode}, error: ${error.message}`,
    NotLoggedIn: _ => window.location.reload(true), // let Proxy redirect to login
    UnsupportedFileType: ({ error, file, reason }) =>
        `An unsupported file type was uploaded. We only support Excel files with no macros.
file: ${file}`,
    ExcelMacros: ({ file }) =>
        `The Excel file you uploaded contained macros. Please remove them and Save As to create a new Excel with the macros removed.
File: ${file}`,
    Virus: ({ file }) =>
        `The Excel file you uploaded was identified as a virus.
virus file: ${file}`,
    EmailFailed: ({ error }) =>
        `We failed to email your file successful. Error received: ${error}`,
    MessageFailed: _ =>
        `We emailed your file successfully, but failed to send a confirmation message. Please manually check your inbox.`,
    Success: ({ file }) =>
        `Successfully uploaded and emailed your file: ${file}`
})
```

## Did it Work or Not?

If you just want to know if it worked or not, you can simply return a `Boolean`. The `stubTrue` and `stubFalse` functions from lodash & lodash/fp are functions that always return true `() => true`, and always return false `() => false`:

```javascript
const { stubTrue, stubFalse } = 
const didUploadWork = result => result.matchWith({
    SessionExpired: stubFalse,
    NotLoggedIn: stubFalse,
    UnsupportedFileType: stubFalse,
    ExcelMacros: stubFalse,
    Virus: stubFalse,
    EmailFailed: stubFalse,
    MessageFailed: stubFalse,
    Success: stubTrue
})

console.log(didUploadWork(Success('some file'))) // true
console.log(didUploadWork(NotLoggedIn(new Error('boom', 400)))) // false
```

## Conclusions

Union types are great for modeling errors, or when you have multiple return types. They can represent data or `null` more specifically than a simple `Maybe`, and give you more insight into what we wrong than a simple `Result.Error`.
