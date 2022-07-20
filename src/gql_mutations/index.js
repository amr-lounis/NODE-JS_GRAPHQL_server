const authorization = require('./authorization')
const todo = require('./todo')
const user = require('./user')
const setting = require('./setting')
module.exports = {
    ...authorization,
    ...todo,
    ...user,
    ...setting
}
