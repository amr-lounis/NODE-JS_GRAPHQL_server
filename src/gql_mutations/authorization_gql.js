const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const { authorization_controller} = require("data_ms")
//----------------------------------------------------------------------------------
const authorization_create = {
    type: GraphQLString,
    args: {
        operation: { type: GraphQLString },
        roles: { type: GraphQLString },
        args_required: { type: GraphQLString },
        Attributes_forbidden:{ type: GraphQLString },
    },
    resolve: ( root, args, context, info  ) => authorization_controller.create(args,context)
}
//----------------------------------------------------------------------------------
const authorization_update = {
    type: GraphQLString,
    args: {
        id: { type: GraphQLID },
        operation: { type: GraphQLString },
        roles: { type: GraphQLString },
        args_required: { type: GraphQLString },
        Attributes_forbidden:{ type: GraphQLString },
    },
    resolve: ( root, args, context, info  ) => authorization_controller.update(args,context)
}
//----------------------------------------------------------------------------------
const authorization_delete = module.exports = {
    type: GraphQLString,
    args: { id: {type: GraphQLID } },
    resolve: ( root, args, context, info  ) => authorization_controller.delete(args,context)
}
//----------------------------------------------------------------------------------
module.exports = {
    authorization_create,
    authorization_update,
    authorization_delete
}