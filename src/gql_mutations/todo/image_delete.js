const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {todo_controller} = require('../../local_library');

module.exports = {
    type: GraphQLString,
    args: {
        id:{ type: GraphQLID },
        fileNmae: { type: GraphQLString }
    },
    resolve: async (
        root,
        args,
        { decoded, attributes }
        ,info 
        )=> {
            return todo_controller.image_delete(args,attributes);
        } 
}