const pubsub = require('../../my_utils/_pubsub');

const { withFilter } = require('graphql-subscriptions');
const { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt,GraphQLObjectType } = require('graphql')
module.exports = {
    type:  new GraphQLObjectType({
        name: 'notification_type',
        fields: () => ({
            sender_id:{ type: GraphQLInt },
            receiver_id:{ type: GraphQLInt },
            title :{ type: GraphQLString },
            content : { type: GraphQLString },
        })
    }),
    args: { 
    },
    subscribe: withFilter(
        () => pubsub.asyncIterator('DATE_NOW'),
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
                console.log("notification_receiver : payload:  =>  " + JSON.stringify(payload) );
                resolve(payload);
            } catch (error) {
                reject(new Error('---- ERROR : subscription .'));
            }
        })
    }
}
