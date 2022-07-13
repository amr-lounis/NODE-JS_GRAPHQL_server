const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');// add "scalar Upload" in typeDefs
const {todo_controller} = require('../../local_library');

module.exports = {
    description: "Uploads file.",
    type: GraphQLString,
    args: {
        id:{ type: GraphQLID },
        file: { type: GraphQLUpload },
    },
    resolve: async (
        root,
        args,
        { decoded:decoded, attributes:attributes }
        ,info 
        )=> {
            console.log(args)
            // -------------------------------------------------------------------- 
            if(! args.hasOwnProperty('id') ) throw new Error("id : is required");
            if(! args.hasOwnProperty('file') ) throw new Error("file : is required");
            if( args.file==null ) throw new Error("file : is null value !");
            // -------------------------------------------------------------------- 
            return todo_controller.image_upload(args,attributes);
        } 
}

/*
mutation Todo_image_upload($file: Upload!, $fileUploadId: ID){
  todo_image_upload(file: $file, id: $fileUploadId)
}
variables
{
"fileUploadId":1
}
*/