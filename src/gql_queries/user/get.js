const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt 
} = require('graphql')
const {user_controller} = require('../../local_library');

module.exports = {
     // ------------------------- type of function returned
    type: new GraphQLList(
        new GraphQLObjectType({
        name: 'user_type',
        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            },
            description: {
              type: GraphQLString
            },
            createdAt:{
                type: GraphQLString
            },
            updatedAt:{
                type: GraphQLString
            }
        })
      })
    ),
    args: {
        id:{ type: GraphQLInt },
        offset: { type: GraphQLInt },
        limit: {type: GraphQLInt }
    },
    resolve: ( root, args, context, info  ) => user_controller.getWhere(args,context)
}
/**
query Query($_id: ID) {
  user_get(id: $_id)
}
{
  "_id": 1
}
 */