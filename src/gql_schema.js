const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const queries = require('./gql_queries')
const mutations = require('./gql_mutations')
const subscriptions = require('./gql_subscriptions')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
  }),

  subscription: new GraphQLObjectType({
    name: 'Subscription',
    fields: subscriptions
  }),
})