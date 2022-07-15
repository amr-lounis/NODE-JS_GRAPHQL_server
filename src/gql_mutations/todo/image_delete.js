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
            // -------------------------------------------------------------------- 
            if(! args.hasOwnProperty('id') ) throw new Error("id : is required");
            if(! args.hasOwnProperty('fileNmae') ) throw new Error("fileNmae : is required");
            // -------------------------------------------------------------------- 
            args.userId = decoded.id;
            // --------------------------------------------------------------------
            return todo_controller.image_delete(args,attributes);
        } 
}