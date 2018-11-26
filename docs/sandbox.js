// // const { lensProxy, view, preview, set } = require('focused')

// // const person = {
// //     firstName: "Jesse",
// //     address: {
// //         street: '9037 Annex Lane'
// //     }
// // }

// // const _ = lensProxy()

// // console.log(preview(_.$address.$street, person))
// // console.log("person:", person)

// const { over, prop, path, set, lensProp, pipe, map } = require('ramda')
// const { upperFirst } = require('lodash/fp')

// const people = [
//   {
//     name: 'jesse warden', 
//     address: { 
//         street: '123 Cow Ville', 
//         phone: ['1235551234']
//     }
//   }
//   , {
//     name: 'brandy fortune', 
//     address: { 
//         street: '123 Cow Ville', 
//         phone: ['1235555678']
//     }
//   }
//   , {
//     name: 'marge paradis', 
//     address: { 
//         street: '789 Farm Road', 
//         phone: ['5675550987']
//     }
//   }
// ]

// const person = {
//     name: 'marge paradis', 
//     address: { 
//         street: '789 Farm Road', 
//         phone: ['5675550987']
//     }
//   }

// const getPersonNameToFirstAndLastName = person => {
//   const firstName = prop('name', person).split(' ')[0]
//   const lastName = prop('name', person).split(' ')[1]
//   return {
//     ...person,
//     name: undefined,
//     firstName,
//     lastName
//   }
// }

// const fixPhoneNumber = person => {
//   const string = path(['address', 'phone', '0'], person) 
//   const areaCode = parseInt(string.substring(0, 3))
//   return {
//     ...person,
//     phone: {
//       formatted: `(${areaCode}) ${string.substring(3, 6)}-${string.substring(6, 10)}`,
//       areaCode,
//     }
//     , address: undefined
//   } 
// }

// const firstNameLens = lensProp('firstName')
// const lastNameLens = lensProp('lastName')

// const upperFirstName = person => over(firstNameLens, upperFirst, person)
// const upperLastName = person => over(lastNameLens, upperFirst, person)

// const parsePerson = person =>
//   pipe(
//     getPersonNameToFirstAndLastName,
//     fixPhoneNumber,
//     upperFirstName,
//     upperLastName
//   )
//   (person)
//   console.log(getPersonNameToFirstAndLastName(people[0]))
// // console.log(fixPhoneNumber(person))
// // console.log(
// //   upperLastName(
// //     getPersonNameToFirstAndLastName(person)
// //   )
// // )
// // console.log(parsePerson(person))
// // console.log(
// //   map(
// //     parsePerson,
// //     people
// //   )
// // )


// const { lensProxy, prop, set, iso, compose } = require('focused')

// const gameState = `{
//   "saveDate": "2018-11-24T18:27:08.950Z", 
//   "map": "overworld", 
//   "chapter": 3, 
//   "location": { 
//     "x": 323, "y": 422 
//   }, 
//   "characters": [
//     { 
//       "name": "Jesse", 
//       "level": 21, 
//       "attack": 510, 
//       "magic": 122, 
//       "inventory": [
//         { 
//           "name": "Scimitar", 
//           "power": 3 
//         }, 
//         { 
//           "name": "Mithral Glove", 
//           "defense": 21 
//         }
//       ] 
//     }, 
//     { 
//       "name": "Brandy", 
//       "level": 22, 
//       "attack": 501, 
//       "magic": 210, 
//       "inventory": [
//         { 
//           "name": "Green Rod", 
//           "magic": 19 
//         }, 
//         { 
//           "name": "White Cape", 
//           "defense": 11 
//         }
//       ] 
//     }
//   ] 
// }`

// const _ = lensProxy()
// const json = iso(JSON.parse, JSON.stringify)
// const result = set(_.$(json).saveDate, new Date(), gameState)
// // const result = set(
// //   compose(
// //     json,
// //     prop('saveDate'),
// //   ),
// //   new Date(),
// //   gameState
// // )
// console.log("result:", result)


// const gameState = {
//   saveDate: '2018-11-24T18:27:08.950Z',
//   map: 'overworld',
//   chapter: 3,
//   location: { x: 323, y: 422 },
//   characters: [
//       {
//           name: 'Jesse',
//           level: 21,
//           attack: 510,
//           magic: 122,
//           inventory: [
//               {
//                   name: 'Scimitar',
//                   power: 3
//               },
//               {
//                   name: 'Mithral Glove',
//                   defense: 21
//               }
//           ]
//       },
//       {
//           name: 'Brandy',
//           level: 22,
//           attack: 501,
//           magic: 210,
//           inventory: [
//               {
//                   name: 'Green Rod',
//                   magic: 19
//               },
//               {
//                   name: 'White Cape',
//                   defense: 11
//               }
//           ]
//       }
//   ]
// }


// const { lensProxy, set } = require('focused')
// const _ = lensProxy()
// const updated = set(_.saveDate, new Date(), gameState)
// console.log(updated)




const { readFileSync, writeFileSync } = require('fs')
const { lensProxy, set, iso, compose, lens, simplePrism, prism } = require('focused')
const _ = lensProxy()
const jsonISO = iso(JSON.parse, JSON.stringify)
const jsonISOMaybe = prism(
  string => {
      try {
          const value = JSON.parse(string)
          return { type: "RIGHT", value }
      } catch (error) {
          return { type: "LEFT", value: string }
      }
  }, 
  JSON.stringify
)
// const fileISO = iso(
//   () => readFileSync('savedgame.json'),
//   data => saveFileSync('savedgame.json', data)
// )
// const fileISO = iso(
//   readFileSync,
//   data => writeFileSync('savedgame.json', data) || data
// )
const uuidv4 = require('uuid/v4')
const fileISODate = lens(
  readFileSync,
  (data, originalData) => {
        const filename = 
            originalData
            .split('.json')
            .join('')
        const dataJSON = JSON.parse(data)
        const newFilename = `${filename}_${dataJSON.saveDate}_${uuidv4()}.json`
        writeFileSync(newFilename, data)
        return newFilename
    }
)
const readAndParseISO = compose(
  fileISODate,
  jsonISO
)
const savedGameString = readFileSync('savedgame.json')
// const updatedString = set(_.$(jsonISOMaybe).saveDate, new Date(), savedGameString)
const updatedString = set(_.$(readAndParseISO).saveDate, new Date(), 'savedgame.json')
console.log(updatedString)


// const { lensProxy, view } = require('focused')

// const _ = lensProxy()
// const name = view(_.characters[1].inventory[1].name, gameState)
// console.log(name) // White Cape