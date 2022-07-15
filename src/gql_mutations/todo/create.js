const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt, GraphQLObjectType } = require('graphql')
const {todo_controller} = require('../../local_library');

module.exports = {
    type: GraphQLString,
    args: {
        name:{ type: GraphQLString },
        description: { type: GraphQLString },
        validation: { type: GraphQLInt },
        employeeId: { type: GraphQLID },
        customerId: { type: GraphQLID }
    },
    resolve: (
        root,
        args,
        { decoded, attributes }
        ,info 
        )=> {
        // -------------------------------------------------------------------- 
        if(! args.hasOwnProperty('name') ) throw new Error("id : is required");
        // -------------------------------------------------------------------- 
        args.userId = decoded.id;
        // --------------------------------------------------------------------
        return todo_controller.create(args,attributes);
    }
}