const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {user_controller} = require('../../local_library');

module.exports = {
    type: new GraphQLList(GraphQLString),
    args: {
        id:{ type: GraphQLID },
    },
    resolve: async(
        root,
        args,
        { decoded:decoded, attributes:attributes },
        info
    ) => {
        // -------------------------------------------------------------------- 
        if(! args.hasOwnProperty('id') ) throw new Error("id : is required");
        // --------------------------------------------------------------------  
        return user_controller.images_get(args,attributes)}
}
/**
query Query($_id: ID) {
  user_images_get(id: $_id)
}
{
  "_id": 1
}
 */