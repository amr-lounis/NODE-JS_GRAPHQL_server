const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt, GraphQLObjectType } = require('graphql')
const {todo_controller} = require('../../local_library');

module.exports = {
    type: GraphQLString,
    args: {
        name:{ type: GraphQLString },
        description: { type: GraphQLString },
        validation: { type: GraphQLInt },
        customerId: { type: GraphQLID }
    },
    resolve: ( root, args, context, info  ) => todo_controller.create(args,context)
}