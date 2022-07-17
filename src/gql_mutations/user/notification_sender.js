const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const pubsub = require('../../../my_utils/_pubsub');

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