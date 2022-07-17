const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {user_controller} = require('../../local_library');

module.exports = {
   // ------------------------- type of function returned
    type: new GraphQLList(GraphQLString),
    args: {
        id:{ type: GraphQLID },
    },
    resolve: ( root, args, context, info  ) => user_controller.images_get(args,context)
}
/**
query Query($_id: ID) {
  user_images_get(id: $_id)
}
{
  "_id": 1
}
 */