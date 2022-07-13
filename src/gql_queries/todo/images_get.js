const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {todo_controller} = require('../../local_library');

module.exports = {
    type: new GraphQLList(GraphQLString),
    args: {
        id:{ type: GraphQLID },
    },
    resolve: async(
        root,
        args,
        { decoded:decoded, attributes:attributes },
        info
    ) => {
        // -------------------------------------------------------------------- 
        if(! args.hasOwnProperty('id') ) throw new Error("id : is required");
        // -------------------------------------------------------------------- 
        return todo_controller.images_get(args,attributes)
    }
}
