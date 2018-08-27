const { getOr, filter } = require('lodash/fp')

const party = [
    { name: 'Jesse', type: 'human' },
    { name: 'Brandy', type: 'human' },
    { name: 'Albus', type: 'dawg' }
]

const filterHumans = people =>
    filter(
        person => getOr('unknown', 'type', person) === 'human',
        people
    )

console.log(filterHumans(party))