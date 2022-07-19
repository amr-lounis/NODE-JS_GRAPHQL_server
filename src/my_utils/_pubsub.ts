const { PubSub  } = require("graphql-subscriptions");
class Models {
    private static instance = new PubSub ()
    public static getInstance = () => Models.instance;
}
let pubsub = Models.getInstance();
module.exports = pubsub
