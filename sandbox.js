const { flow, map, filter, getOr, set, startCase, get } = require('lodash/fp')

const peopleString = `[
    ["jesse warden", "swasbuckler", 18, 21, "human"],
    ["brandy fortune", "cleric", 11, 11, "human"],
    ["albus dumbledog", "war dog", 7, 9, "dawg"]
    ]`

const listToPeople = map( ([name, clazz, hitPoints, maxHitPoints, type]) =>
    ({ name, clazz, hitPoints, maxHitPoints, type })
)

const filterHumans =
    filter(
        person => getOr('unknown', 'type', person) === 'human'
    )

const formatNames =
    map(
        list => set('name', startCase(get('name', list)), list)
    )

const showHumans = flow([
    JSON.parse,
    listToPeople,
    filterHumans,
    formatNames
])


console.log(showHumans(peopleString))