// console.log = function() {}
//----------------
const {machineId, machineIdSync} = require('node-machine-id') ;
log(machineIdSync())
log(machineIdSync({original: true}))
if(machineIdSync({original: true}) != 'b403e901-522d-489b-98e2-fce7a11b88e4'){
    log('This device is not licensed')
    process.exit()
}

//-------------- public library
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
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
const schema = require('./gql_schema');
const {my_token,authorization} = require('./my_utils');
const { decode } = require('punycode');

//-------------- config
const graphql_path = '/graphql';
const APOLLO_SERVER_HOST = 'localhost';
const APOLLO_SERVER_PORT = '5000'
const IMAGES_DIR = './files/'

//-------------- Middlewares
async function info_GraphqlMiddleware (resolve, root, args, context, info) {
    if((info?.parentType?.name == 'Query')||(info?.parentType?.name == 'Mutation')){
        const operationName = info?.fieldName || ''
        const operationType = info?.parentType?.name || '';
        const attributes = Object.keys(attributesSelected(info));
        const decoded = my_token.Token_Verifay(context.token);
        log('--------------------------------------------------')
        log(`---------- : operationType :${operationType}: operationName : ${operationName} .`)
        log(`---------- : attributes :${attributes}`)
        log(`---------- : decoded :${JSON.stringify(decoded)} `)
        log(`---------- : args : ${Object.keys(args)}`)
        log('--------------------------------------------------')
        //----------------------------------------------------------------
        authorization(operationName,decoded,args,attributes)
        //----------------------------------------------------------------
        context.operationName = operationName
        context.operationType = operationType
        context.attributes    = attributes
        context.decoded       = decoded
        args.thisUserId       = decoded.id;
    }
    const result = await resolve(root, args, context, info)
    return result
}

//-------------- RUN

async function run () {
    const app = express();
    
    var httpServer = null
    var serverSSL = true
    if(serverSSL){
        log('--------------- https : using ssl ')
        const serverOptions = {
            cert: fs.readFileSync('./assets/cert.pem'),
            key: fs.readFileSync('./assets/key.pem')
        }
        httpServer = https.createServer(serverOptions,app);
    }
    else{
        log('--------------- http : ')
        httpServer = http.createServer(app);
    }
    //
    const wsServer = new WebSocketServer({
        server: httpServer,
    });
    //
    const serverCleanup = useServer({ schema }, wsServer);
    //
    app.use(express.static(IMAGES_DIR))
    //
    app.use(graphqlUploadExpress());
    //
    const schemaWithMiddleware = applyMiddleware(schema, info_GraphqlMiddleware)
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
            //log(`-------------------- ApolloServer : context: Object.keys(ctx) : --------  ${Object.keys(ctx) }  `)
            const token = ctx?.req?.headers?.authorization || '';
            return {token:token}
         },
         formatError: (err) => {
            return `message : ${err.message}`;
        }
    });
    await server.start();
    server.applyMiddleware({ app,path: graphql_path,});
    //---------------------------------------------------------------- WS
    useServer({
        schema,
        context: (ctx, msg, args) => {
            //log(`-------------------- context useServer : Object.keys(ctx) : --------  ${Object.keys(ctx)} .`)
            const token = ctx?.connectionParams?.Authorization || ''
            const decoded =my_token.Token_Verifay(token) ;
            return {decoded:decoded}; 
        },
        onConnect: async (ctx) => {
            //log(`-------------------- onConnect useServer Object.keys(ctx) : ${Object.keys(ctx)} .`)
            const token = ctx?.connectionParams?.Authorization || ''
            decoded =my_token.Token_Verifay(token)
            if(decoded.id == null) {// return false to sertver disconnect ro throw new Error('')
                log('-------------- ERROR WS : TOKEN : server : disconnected .',decoded)
                return false;
            } 
        },
        onDisconnect(ctx, code, reason) {
            log('-------------------- onDisconnect useServer .')
        },
    },
    wsServer,
    );

    const PORT = Number(APOLLO_SERVER_PORT);
    httpServer.listen(PORT, () => {
    log(
    `ws://${APOLLO_SERVER_HOST}:${PORT}${server.graphqlPath}\
     and\
     http://${APOLLO_SERVER_HOST}:${PORT}${server.graphqlPath}`
    );
    });
};

run();
//
function log(_message){
     console.log(_message)
}
