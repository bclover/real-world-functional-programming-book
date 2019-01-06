'use strict'
const log = console.log
const request = Object.freeze({ head: _ => Promise.resolve("It worked.") })
const ping = request => url =>
    request.head(url)
const headURL = ping(request)

headURL('http://google.com').then(log)

request.head =_ =>
    Promise.reject(new Error('heh, not immutable, dat boom'))

headURL('http://jessewarden.com').then(log)