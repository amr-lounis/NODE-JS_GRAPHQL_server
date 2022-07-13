const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt 
} = require('graphql')
const {user_controller} = require('../../local_library');

module.exports = {
    type: new GraphQLList(
        new GraphQLObjectType({
        name: 'user_type',
        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLID)
            },
            name: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            },
            description: {
              type: GraphQLString
            },
            createdAt:{
                type: GraphQLString
            },
            updatedAt:{
                type: GraphQLString
            }
        })
      })
    ),
    args: {
        id:{ type: GraphQLInt },
        offset: { type: GraphQLInt },
        limit: {type: GraphQLInt }
    },
    resolve: (
        root,
        args,
        { decoded:decoded, attributes:attributes },
        info
    ) => {
        // --------------------------------------------------------------------
        var a = {}
        if( args.hasOwnProperty('id') ) a.id = args.id;
        
        if( ! args.hasOwnProperty('offset') ) args.offset= 0;
        if( ! args.hasOwnProperty('limit') ) args.limit= 10;
        else if(args.limit > 100) args.limit= 100;
        // -------------------------------------------------------------------- 
        return user_controller.getWhere(a,attributes,args.offset,args.limit)
    }
}
/**
query Query($_id: ID) {
  user_get(id: $_id)
}
{
  "_id": 1
}
 */