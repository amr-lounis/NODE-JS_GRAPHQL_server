const { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt,GraphQLObjectType } = require('graphql')
const { withFilter } = require('graphql-subscriptions');
const {pubsub} = require('../my_utils');
//----------------------------------------------------------------------------------
const user_notification_type = {
    name: 'user_notification_type',
    fields: () => ({
        sender_id:{ type: GraphQLInt },
        receiver_id:{ type: GraphQLInt },
        title :{ type: GraphQLString },
        content : { type: GraphQLString },
    })
}
//----------------------------------------------------------------------------------
user_notification_receiver = {
    type:  new GraphQLObjectType(user_notification_type),
    args: { },
    subscribe: withFilter(
        () => pubsub.asyncIterator('user_notification_sender'),
        (payload, args, context, info) => {
            try {
                return (context.decoded.id == payload.receiver_id); // true send data // false non send data
            } catch (error) {
                return false;
            }
        },
    ),
    resolve: (payload, args, context, info) => {
        return new Promise((resolve, reject) => {
            try {
                console.log("user_notification_receiver : payload:  =>  " + JSON.stringify(payload) );
                resolve(payload);
            } catch (error) {
                reject(new Error('---- ERROR : subscription .'));
            }
        })
    }
}
//----------------------------------------------------------------------------------
module.exports = {
    user_notification_receiver
}
