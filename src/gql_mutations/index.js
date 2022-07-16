const todo = require('./todo')
const user = require('./user')
const setting = require('./setting')
module.exports = {
    ...todo,
    ...user,
    ...setting
}
