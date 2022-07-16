//-------------- public library
const { createServer } = require("http");
const { applyMiddleware } = require('graphql-middleware')
const { ApolloServer} = require("apollo-server-express");

//--------------
const express = require("express");
const attributesSelected = require('graphql-fields')
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');

//-------------- WS
const { ApolloServerPluginDrainHttpServer }  = require("apollo-server-core");
const { useServer } = require('graphql-ws/lib/use/ws')
const { WebSocketServer } = require('ws')

//-------------- local library
const {my_token,my_files,todo_controller,user_controller,cnf} = require('./local_library')

pubsub = require('../my_utils/_pubsub');
const schema = require('./gql_schema');

//-------------- config
const graphql_path = '/graphql';
const APOLLO_SERVER_HOST = cnf.FILES_HOST;
const APOLLO_SERVER_PORT = cnf.FILES_PORT;
const IMAGES_DIR = cnf.FILES_IMAGES_DIR

//-------------- Middlewares
const Attributes_GraphqlMiddleware = async (resolve, root, args, context, info) => {
    try {
        context.attributes = Object.keys(attributesSelected(info));
    } catch (error) {
        console.log({ "ERROR : Attributes_GraphqlMiddleware : ": error.message });
    }
    const result = await resolve(root, args, context, info)
    return result
}

//-------------- Middlewares

async function Token_GraphqlMiddleware(resolve, root, args, context, info) {
    const fieldName = info.fieldName;
    const exception_list = ["user_create","user_signin"]
	if(exception_list.includes(fieldName)) {console.log('this fieldName : ',fieldName,': not need Token_Verifay .')}
	else {
        context.decoded = my_token.Token_Verifay(context.token);
        if(context.decoded.id == null) throw new Error('ERROR : Token_GraphqlMiddleware .')
    }
	return await resolve(root, args, context, info)
}

//-------------- RUN

async function run () {
    const app = express();
    const httpServer = createServer(app);

    const wsServer = new WebSocketServer({
        // path: graphql_path,
        server: httpServer,
    });
    const serverCleanup = useServer({ schema }, wsServer);
    //
    app.use(express.static(IMAGES_DIR))
    //
    app.use(graphqlUploadExpress());
    //
    const schemaWithMiddleware = applyMiddleware(schema, Attributes_GraphqlMiddleware,Token_GraphqlMiddleware)
    // 
    const server = new ApolloServer({
        csrfPrevention: false,
        uploads: false,
        schema:schemaWithMiddleware,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
              async serverWillStart() {
                return {
                  async drainServer() {
                    await serverCleanup.dispose();
                  },
                };
              },
            },
          ],
        context: (ctx) => {
            //console.log('-------------------- ApolloServer : context: Object.keys(ctx) : --------  ',Object.keys(ctx))
            const token = ctx?.req?.headers?.authorization || '';
            return {token:token}
         },
         formatError: (err) => {
            return err.message;
        }
    });
    await server.start();
    server.applyMiddleware({ app,path: graphql_path,});
    //---------------------------------------------------------------- WS
    useServer({
        schema,
        context: (ctx, msg, args) => {
            // console.log('-------------------- context useServer : Object.keys(ctx) : --------  ',Object.keys(ctx))
            const token = ctx?.connectionParams?.Authorization || ''
            const decoded =my_token.Token_Verifay(token) ;
            return {decoded:decoded}; 
        },
        onConnect: async (ctx) => {
            // console.log('-------------------- onConnect useServer Object.keys(ctx) : ',Object.keys(ctx))
            const token = ctx?.connectionParams?.Authorization || ''
            decoded =my_token.Token_Verifay(token)
            console.log('-------------------- server : disconnected .')
            if(decoded.id == null) return false; // return false to sertver disconnect ro throw new Error('')
        },
        onDisconnect(ctx, code, reason) {
            // console.log('-------------------- onDisconnect useServer .')
        },
    },
    wsServer,
    );

    const PORT = Number(APOLLO_SERVER_PORT);
    httpServer.listen(PORT, () => {console.log(
    `ws://${APOLLO_SERVER_HOST}:${PORT}${server.graphqlPath}\
     and\
     http://${APOLLO_SERVER_HOST}:${PORT}${server.graphqlPath}`
    );
    });
};

run();

console.log('end process')