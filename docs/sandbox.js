const { startCase } = require('lodash')

class NamesParser {
    
    constructor(names) {
        this._names = names
        this.parsedNames = []
    }

    parseName(name) {
        return name.split(' ').reverse().map(startCase).join(', ')
    }

    parseNames() {
        this.parsedNames = []
        for(let i = 0; i < this._names.length; i++) {
            this.parsedNames[i] = this.parseName(this._names[i])
        }
    }
}

a = new NamesParser(['jesse warden'])
a.parseNames()
console.log(a)