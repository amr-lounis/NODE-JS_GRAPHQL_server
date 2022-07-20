const {GraphQLObjectType,GraphQLID,GraphQLNonNull,GraphQLString,GraphQLList,GraphQLInt } = require('graphql')
const {authorization_controller} = require('../local_library');
//----------------------------------------------------------------------------------
const authorization_type = {
    name: 'authorization_type',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        operation: { type: GraphQLString },
        roles: { type: GraphQLString },
        args_required: { type: GraphQLString },
        Attributes_forbidden:{ type: GraphQLString },
        createdAt:{ type: GraphQLString },
        updatedAt:{ type: GraphQLString }
    })
  }
//----------------------------------------------------------------------------------
const authorization_get = {
   type: new GraphQLList( new GraphQLObjectType(authorization_type) ),
   args: {
       id:{ type: GraphQLInt },
       offset: { type: GraphQLInt },
       limit: {type: GraphQLInt }
   },
   resolve: ( root, args, context, info  ) => authorization_controller.getWhere(args,context)
}
//----------------------------------------------------------------------------------
module.exports = {
    authorization_get
}
