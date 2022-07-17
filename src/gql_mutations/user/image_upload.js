const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt,gra } = require('graphql')
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');// add "scalar Upload" in typeDefs
const {user_controller} = require('../../local_library');

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
        { decoded, attributes }
        ,info 
        )=> {
            return user_controller.image_upload(args,attributes) 
        }
}

/*
mutation User_image_upload($file: Upload!, $fileUploadId: ID){
  user_image_upload(file: $file, id: $fileUploadId)
}
variables
{
"fileUploadId":1
}
*/