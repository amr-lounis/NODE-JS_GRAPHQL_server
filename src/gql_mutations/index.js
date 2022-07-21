const authorization_gql = require('./authorization_gql')
const todo_gql = require('./todo_gql')
const user_gql = require('./user_gql')
const setting_gql = require('./setting_gql')
module.exports = {
    ...authorization_gql,
    ...todo_gql,
    ...user_gql,
    ...setting_gql
}
