const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLInt 
  } = require('graphql')
const {todo_controller} = require('../../local_library');

module.exports = {
    // ------------------------- type of function returned
    type: new GraphQLList(
        new GraphQLObjectType({
            name: 'todo_type',
            fields: () => ({
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                name: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                },
                validation: {
                    type: GraphQLInt
                },
                employeeId:{
                    type: GraphQLID
                },
                customerId:{
                    type: GraphQLID
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
    // ------------------------- args of function input
    args: {
        id:{ type: GraphQLID },
        customerId:{ type: GraphQLID },
        employeeId:{ type: GraphQLID },
        offset: { type: GraphQLInt },
        limit: {type: GraphQLInt }
    },
    resolve: ( root, args, context, info  ) => todo_controller.getWhere(args,context)
}
