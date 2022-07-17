const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {user_controller} = require('../../local_library');

module.exports = {
    type: GraphQLString,
    args: {
        receiver_id: { type: GraphQLInt },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
    },
    resolve: ( root, args, context, info ) => { 
        args.sender_id = context.decoded.id;
        pubsub.publish("user_notification_sender", args );
        return 'ok';
    }
}