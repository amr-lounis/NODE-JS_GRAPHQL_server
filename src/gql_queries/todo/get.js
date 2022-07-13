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
    // ------------------------- code to run
    resolve: (
        root,
        args,
        { decoded:decoded, attributes:attributes },
        info
    ) => {
        // -------------------------------------------------------------------- 
        var a = {}
        if( args.hasOwnProperty('id') ) a.id = args.id;
        if( args.hasOwnProperty('employeeId'))  a.employeeId=args.employeeId;
        if( args.hasOwnProperty('customerId')) a.customerId = args.customerId;
        if( ! args.hasOwnProperty('offset') ) args.offset= 0;
        if( ! args.hasOwnProperty('limit') ) args.limit= 10;
        else if(args.limit > 100) args.limit= 100;
         // -------------------------------------------------------------------- 
        return todo_controller.getWhere(a,attributes,args.offset,args.limit)
    }
}
