const authorization = require('./authorization')
const todo = require('./todo')
const user = require('./user')
module.exports = {
    ...authorization,
    ...todo,
    ...user
}
