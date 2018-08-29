const Result = require('folktale/result')
const { Ok, Error } = Result
const { startCase } = require('lodash/fp')

const safeSplit = name => {
    try {
        const result = name.split(' ')
        return Ok(result)
    } catch(error) {
        return Error(error.message)
    }
}


// console.log(
//     Ok(undefined)
//     .chain(name => safeSplit(name))
//     .chain(name => Ok(name.reverse()))
//     .chain(name => Ok(startCase(name)))
// )

// const castSpellResult = Error('Failed, not enough mana.')
// const didSpellWork = castSpellResult.getOrElse('Spell casting failed.')

// console.log(didSpellWork)
// // Spell casting failed

// const attackResult = Ok('Success, 4 points of damage!')
// const didAttackWork = attackResult.getOrElse('Attack failed.')
// console.log(didAttackWork)

// const attackResult = Ok( { hit: true, attacker: 'Jesse', target: 'Bad Guy', weapon: 'Boomerang' } )
// const printedResult = attackResult.matchWith({
//     Ok: ( { value } ) =>
//         value.hit
//         ? `${value.attacker} successfully hit ${value.target} with ${value.weapon}!`
//         : `${value.attacker} missed ${value.target} with ${value.weapon}...`
// })

// console.log(printedResult)

const result = Result.try(() => JSON.parse(undefined))

console.log(result)
// folktale:Result.Error({ value: SyntaxError: Unexpected token u in JSON at position 0 })