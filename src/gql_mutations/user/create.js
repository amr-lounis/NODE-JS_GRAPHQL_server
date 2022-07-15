const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
const {user_controller} = require('../../local_library');

module.exports = {
    type: GraphQLString,
    args: {
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
        if(! args.hasOwnProperty('name') ) throw new Error("name : is required");
        if(! args.hasOwnProperty('password') ) throw new Error("password : is required");
        // -------------------------------------------------------------------- 
         return user_controller.create(args,attributes)
         }
}