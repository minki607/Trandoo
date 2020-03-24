
//figure out set of credential to return
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod')
} else {
    // return the development keys
    module.exports = require('./dev')
}