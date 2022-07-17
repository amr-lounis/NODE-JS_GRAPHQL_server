const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {user_controller} = require('../../local_library');

module.exports = {
    type: GraphQLString,
    args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
    },
    resolve: ( root, args, context, info  ) => user_controller.create(args,context)
}
