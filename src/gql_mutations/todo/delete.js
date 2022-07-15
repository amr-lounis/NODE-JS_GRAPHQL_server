const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {todo_controller} = require('../../local_library');

module.exports = {
    type: GraphQLString,
    args: {
        id: {type: GraphQLID }
    },
    resolve: (
        root,
        args,
        { decoded, attributes },
        info
    ) => {
        // -------------------------------------------------------------------- 
        if(! args.hasOwnProperty('id') ) throw new Error("id : is required");
        // -------------------------------------------------------------------- 
         return todo_controller.create(args,attributes); 
        }
}