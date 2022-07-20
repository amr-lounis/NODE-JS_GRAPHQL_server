const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');// add "scalar Upload" in typeDefs
const {todo_controller} = require('../../local_library');
//----------------------------------------------------------------------------------
const todo_create = {
    type: GraphQLString,
    args: {
        name:{ type: GraphQLString },
        description: { type: GraphQLString },
        validation: { type: GraphQLInt },
        customerId: { type: GraphQLID }
    },
    resolve: ( root, args, context, info  ) => todo_controller.create(args,context)
}
//----------------------------------------------------------------------------------
const todo_update = {
    type: GraphQLString,
    args: {
        id: { type: GraphQLID },
        name:{ type: GraphQLString },
        description: { type: GraphQLString },
        validation: { type: GraphQLInt },
        customerId: { type: GraphQLID }
    },
    resolve: ( root, args, context, info  ) => todo_controller.update(args,context)
}
//----------------------------------------------------------------------------------
const todo_delete = module.exports = {
    type: GraphQLString,
    args: {
        id: {type: GraphQLID }
    },
    resolve: ( root, args, context, info  ) => todo_controller.delete(args,context)
}
//----------------------------------------------------------------------------------
const todo_image_upload = {
    type: GraphQLString,
    args: {
        id:{ type: GraphQLID },
        file: { type: GraphQLUpload },
    },
    resolve: ( root, args, context, info  ) => todo_controller.image_upload(args,context)
}
//----------------------------------------------------------------------------------
const todo_image_delete = {
    type: GraphQLString,
    args: {
        id:{ type: GraphQLID },
        fileNmae: { type: GraphQLString }
    },
    resolve: ( root, args, context, info  ) => todo_controller.image_delete(args,context)
}
//----------------------------------------------------------------------------------
module.exports = {
    todo_create,
    todo_update,
    todo_delete,
    todo_image_upload,
    todo_image_delete
}