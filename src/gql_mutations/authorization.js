const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const { authorization_controller} = require('../local_library');
//----------------------------------------------------------------------------------
const authorization_create = {
    type: GraphQLString,
    args: {
        name:{ type: GraphQLString },
        description: { type: GraphQLString },
        validation: { type: GraphQLInt },
        customerId: { type: GraphQLID }
    },
    resolve: ( root, args, context, info  ) => authorization_controller.create(args,context)
}
//----------------------------------------------------------------------------------
const authorization_update = {
    type: GraphQLString,
    args: {
        id: { type: GraphQLID },
        name:{ type: GraphQLString },
        description: { type: GraphQLString },
        validation: { type: GraphQLInt },
        customerId: { type: GraphQLID }
    },
    resolve: ( root, args, context, info  ) => authorization_controller.update(args,context)
}
//----------------------------------------------------------------------------------
const authorization_delete = module.exports = {
    type: GraphQLString,
    args: {
        id: {type: GraphQLID }
    },
    resolve: ( root, args, context, info  ) => authorization_controller.delete(args,context)
}
//----------------------------------------------------------------------------------
module.exports = {
    authorization_create,
    authorization_update,
    authorization_delete
}