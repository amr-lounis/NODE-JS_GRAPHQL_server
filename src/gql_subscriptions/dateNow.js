const pubsub = require('../../my_utils/_pubsub');

const { withFilter } = require('graphql-subscriptions');
const { GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
console.log('**********||||||')
module.exports = {
    type: GraphQLString,
    args: {
        v: {
            name: 'v',
            type: GraphQLString
        },
    },
    subscribe: withFilter(
        () => pubsub.asyncIterator('DATE_NOW'),
        (payload, args, context, info) => {
            console.log('---------------------------- withFilter ');
            console.log({ payload: payload });
            console.log({ args: args });
            console.log({ context: context });
            return (true);// true send data // false non send data
        },
    ),
    resolve: (payload, args, context, info) => {
       return new Promise((resolve, reject) => {
           try {
            console.log("payload:  =>  " + JSON.stringify(payload) );
            resolve('payload: '+payload.dateNow);
           } catch (error) {
            reject(new Error('---- ERROR : subscription .'));
           }
       })
    }
}
