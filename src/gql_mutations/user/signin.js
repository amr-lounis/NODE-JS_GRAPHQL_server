const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {user_controller} = require('../../local_library');

module.exports = {
    type: GraphQLString,
    args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: (
        root,
        args,
        { decoded, attributes },
        info
    ) => { return user_controller.signin(args,attributes) }
}
/*
mutation Mutation($name: String, $password: String) {
    user_signin(name: $name, password: $password)
}
{
  "name": "admin",
  "password": "admin"
}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlciI6ImFkbWluIiwicm9sZSI6bnVsbCwiaWF0IjoxNjU3NTc3NzAxLCJleHAiOjE2NTgxODI1MDF9.QM6U6YO6O3FiRiYTG20wU90fH574Nrx_R2Yd5M-FIL8
*/