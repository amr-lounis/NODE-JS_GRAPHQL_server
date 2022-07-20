const authorization_controller= require('./controller/authorization_controller');
const todo_controller = require('./controller/todo_controller');
const user_controller = require('./controller/user_controller');
const cnf = require('./config/cnf')


module.exports = {
    authorization_controller,
    todo_controller,
    user_controller,
    cnf
}