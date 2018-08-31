
const {isString, some, get, hasIn, isFunction } = require('lodash')
const Validation = require('folktale/validation')
const { Success, Failure } = Validation

// -- Predicates ---------------------

const hasGetFunction = o => isFunction(get(o, 'get'))
const hasPostFunction = o => isFunction(get(o, 'post'))
const hasInitParams = o => hasIn(o, 'initParams')

const legitString = o => isString(o) && o.length > 0
const hasHTTP = o => isString(o) && o.toLowerCase().indexOf('http') > -1
const hasHTTPS = o => isString(o) && o.toLowerCase().indexOf('https') > -1
const hasLocalhost = o => isString(o) && o.toLowerCase().indexOf('localhost') > -1
const hasDots = o => isString(o) && o.indexOf('.') > -1

const legitURL = o =>
    legitString(o)
    && some(
        [
            hasHTTP,
            hasHTTPS,
            hasLocalhost,
            hasDots
        ],
        predicate => predicate(o)
    )

// -- Validations ---------------------

const validRequestGet = o =>
    hasGetFunction(o)
    ? Success(o)
    : Failure([`Your request doesn't have a get function, you sent: ${o}`])

const validRequestPost = o =>
    hasPostFunction(o)
    ? Success(o)
    : Failure([`Your request doesn't have a post function, you sent: ${o}`])

const validRequestInitParams = o =>
    hasInitParams(o)
    ? Success(o)
    : Failure([`Your request doesn't have an initParams function, you sent: ${o}`])

const validRequest = o =>
    validRequestGet(o)
    .concat(validRequestPost(o))
    .concat(validRequestInitParams(o))

const validURL = o =>
    legitURL(o)
    ? Success(o)
    : Failure([`The URL doesn't appear to be a valid url containing http, https, localhost, or dots for an IP Address. You sent: ${o}`])


const loadWebsite = (request, url) =>
    new Promise((success, failure) =>
        validRequest(request)
        .concat(validURL(url))
        .matchWith({
            Failure: ({ value }) => failure(new Error(value.join(', '))),
            Success: _ =>
                request.get(url, (err, res, body) =>
                    err
                    ? failure(err)
                    : success({res, body})
                )
        })
    )

const r = require('request').get
loadWebsite(r, 'http://jessewarden.com')
.then( ({ body }) => console.log("html:", body.substring(0, 21)))
.catch(error => console.log("error:", error))
// html: <!DOCTYPE html>
// <html
