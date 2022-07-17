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
    resolve: ( root, args, context, info  ) => todo_controller.image_upload(args,context)
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