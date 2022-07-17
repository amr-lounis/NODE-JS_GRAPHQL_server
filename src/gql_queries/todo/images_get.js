const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {todo_controller} = require('../../local_library');

module.exports = {
     // ------------------------- type of function returned
    type: new GraphQLList(GraphQLString),
    args: {
        id:{ type: GraphQLID },
    },
    resolve: ( root, args, context, info  ) => todo_controller.images_get(args,context)
}
