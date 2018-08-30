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