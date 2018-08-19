const { reduce, toArray } = require('lodash')

const party = [
    {
        name: 'Jesse',
        clazz: 'Swashbuckler'
    }
]

function addFriendOrFriendsToParty(party) {
    const membersToAdd = toArray(arguments)
    membersToAdd.shift()
    return reduce(
        membersToAdd, 
        (currentParty, member) => {
            return [...currentParty, member]
        },
        party
    )
}

// console.log(addFriendOrFriendsToParty(party, { name: 'Brandy', clazz: 'Cleric' }))

console.log(
    addFriendOrFriendsToParty(
        party, 
        { name: 'Brandy', clazz: 'Cleric' },
        { name: 'Albus', clazz: 'War Dog' },
        { name: 'Robo', clazz: 'Bard' },
        { name: 'Sydney', clazz: 'Mage' }
    )
)