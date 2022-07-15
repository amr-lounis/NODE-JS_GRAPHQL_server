const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {user_controller} = require('../../local_library');

module.exports = {
    type: GraphQLString,
    args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
    },
    resolve: (
        root,
        args,
        { decoded, attributes },
        info
    ) => {
        // -------------------------------------------------------------------- 
        if(! args.hasOwnProperty('id') ) throw new Error("id : is required");
        // --------------------------------------------------------------------     
         return user_controller.update(args,attributes) 
        } 
}