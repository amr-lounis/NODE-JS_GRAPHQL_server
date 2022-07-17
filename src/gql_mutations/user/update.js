const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {user_controller} = require('../../local_library');

module.exports = {
    type: GraphQLString,
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
    },

    resolve: ( root, args, context, info  ) => user_controller.update(args,context)
}