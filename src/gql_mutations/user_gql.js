const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js');// add "scalar Upload" in typeDefs
const {user_controller} = require("data_ms")
const {my_token,pubsub} = require("../my_utils")
//----------------------------------------------------------------------------------
const user_create = {
    type: GraphQLString,
    args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
    },
    resolve: ( root, args, context, info  ) => user_controller.create(args,context)
}

//----------------------------------------------------------------------------------
const user_update = {
    type: GraphQLString,
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
    },
    resolve: ( root, args, context, info  ) => user_controller.update(args,context)
}
//----------------------------------------------------------------------------------
const user_delete = {
    type: GraphQLString,
    args: {
        id: {type: GraphQLID }
    },
    resolve: ( root, args, context, info  ) => user_controller.delete(args,context)
}
//----------------------------------------------------------------------------------
const user_image_upload = {
    type: GraphQLString,
    args: {
        id:{ type: GraphQLID },
        file: { type: GraphQLUpload },
    },
    resolve: ( root, args, context, info  ) => user_controller.image_upload(args,context)
}
//----------------------------------------------------------------------------------
const user_image_delete = {
    type: GraphQLString,
    args: {
        id:{ type: GraphQLID },
        fileNmae: { type: GraphQLString }
    },
    resolve: ( root, args, context, info  ) => user_controller.image_delete(args,context)
}
//----------------------------------------------------------------------------------
const user_signin = {
    type: GraphQLString,
    args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: async ( root, args, context, info  ) =>{
        const data = await user_controller.signin(args,context)
        const decode = { id: data.id, name: data.name, role: data.role.name }
        if (data) return my_token.Token_Create(decode);
        else  throw new Error('error signin');
    }
}
//----------------------------------------------------------------------------------
const user_notification_sender = {
    type: GraphQLString,
    args: {
        receiver_id: { type: GraphQLInt },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
    },
    resolve: ( root, args, context, info ) => { 
        var payload = {}
        // payload.sender_id   = context.decoded.id = args.thisUserId
        payload.sender_id   = args.thisUserId;
        payload.receiver_id = args.receiver_id;
        payload.title       = args.title;
        payload.content     = args.content;

        pubsub.publish("user_notification_sender", payload );
        return 'ok';
    }
}
//----------------------------------------------------------------------------------
module.exports = {
    user_signin,
    user_create,
    user_update,
    user_delete,
    user_image_upload,
    user_image_delete,
    user_notification_sender
}