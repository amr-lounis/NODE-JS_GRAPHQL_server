"use strict";
const { PubSub } = require("graphql-subscriptions");
class Models {
}
Models.instance = new PubSub();
Models.getInstance = () => Models.instance;
let pubsub = Models.getInstance();
module.exports = pubsub;
