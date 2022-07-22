const {GraphQLObjectType,GraphQLID,GraphQLNonNull,GraphQLString,GraphQLList,GraphQLInt } = require('graphql')
const {todo_controller} = require("data_ms")
//----------------------------------------------------------------------------------
const todo_type = {
    name: 'todo_type',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        validation: { type: GraphQLInt },
        employeeId:{ type: GraphQLID },
        customerId:{ type: GraphQLID },
        createdAt:{ type: GraphQLString },
        updatedAt:{ type: GraphQLString }
    })
}
//----------------------------------------------------------------------------------
const todo_get = {
   type: new GraphQLList( new GraphQLObjectType(todo_type) ),
   args: {
    id:{ type: GraphQLID },
    customerId:{ type: GraphQLID },
    employeeId:{ type: GraphQLID },
    createdAt:{ type: GraphQLString },
    updatedAt:{ type: GraphQLString },

    offset: { type: GraphQLInt },
    limit: {type: GraphQLInt },

    startYear:{type: GraphQLInt },
    startMonth:{type: GraphQLInt },
    startDate:{type: GraphQLInt },

    endYear:{type: GraphQLInt },
    endMonth:{type: GraphQLInt },
    endDate:{type: GraphQLInt }
},
resolve: ( root, args, context, info  ) => todo_controller.getWhere(args,context)
}
//----------------------------------------------------------------------------------
const todo_images_get = {
     type: new GraphQLList(GraphQLString),
     args: {
         id:{ type: GraphQLID },
     },
     resolve: ( root, args, context, info  ) => todo_controller.images_get(args,context)
 }
//----------------------------------------------------------------------------------
module.exports = {
    todo_get,
    todo_images_get
}
