const {GraphQLObjectType,GraphQLID,GraphQLNonNull,GraphQLString,GraphQLList,GraphQLInt } = require('graphql')
const {user_controller}= require("data_ms")
//----------------------------------------------------------------------------------
const user_type = {
    name: 'user_type',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLString },
        password: { type: GraphQLString},
        description: { type: GraphQLString},
        createdAt:{ type: GraphQLString },
        updatedAt:{ type: GraphQLString }
    })
}
//----------------------------------------------------------------------------------
const user_get = {
   type: new GraphQLList( new GraphQLObjectType(user_type) ),
   args: {
       id:{ type: GraphQLInt },
       offset: { type: GraphQLInt },
       limit: {type: GraphQLInt }
   },
   resolve: ( root, args, context, info  ) => user_controller.getWhere(args,context)
}
//----------------------------------------------------------------------------------
const user_images_get = {
     type: new GraphQLList(GraphQLString),
     args: {
         id:{ type: GraphQLID },
     },
     resolve: ( root, args, context, info  ) => user_controller.images_get(args,context)
 }
//----------------------------------------------------------------------------------
module.exports = {
    user_get,
    user_images_get
}
