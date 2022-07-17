const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {user_controller} = require('../../local_library');

module.exports = {
    type: GraphQLString,
    args: {
        id: {type: GraphQLID }
    },
    resolve: (
        root,
        args,
        { decoded, attributes },
        info
    ) => {
         return user_controller.delete(args,attributes); 
        }
}