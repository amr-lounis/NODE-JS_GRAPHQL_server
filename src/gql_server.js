//-------------- public library
const { createServer } = require("http");
const { applyMiddleware } = require('graphql-middleware')
const { ApolloServer} = require("apollo-server-express");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const express = require("express");
const attributesSelected = require('graphql-fields')
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');

//-------------- local library
const {Token_Verifay,Token_GraphqlMiddleware} = require('../my_utils/_token')
pubsub = require('../my_utils/_pubsub');
const schema = require('./gql_schema');

//-------------- Middlewares
const Attributes_GraphqlMiddleware = async (resolve, root, args, context, info) => {
    try {
        context.attributes = Object.keys(attributesSelected(info));
    } catch (error) {
        console.error({ "ERROR : Attributes_GraphqlMiddleware : ": error.message });
    }
    const result = await resolve(root, args, context, info)
    return result
}
 
//--------------

async function run () {
    const app = express();
    const httpServer = createServer(app);
    //
    var IMAGES_DIR = './images/'
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
        context: ({ req }) => {
            const headers = req.headers;
            return { headers };
        },
        formatError: (err) => {
            return err.message;
        },
        plugins: [{
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                };
            }
        }]
    });
    await server.start();
    server.applyMiddleware({ app});

// ----------------------------------------------------------
const { execute, subscribe } = require("graphql");
    SubscriptionServer.create(
        {
            schema: schema,
            execute: execute,
            subscribe: subscribe,
            onConnect: (connectionParams, webSocket, context) => {
                console.log(' ------ Subscription : Connected : ')
                // console.log(' ------ Subscription : connectionParams : ' , connectionParams)
                const Authorization = connectionParams.Authorization
                // console.log(' ------ Subscription : Authorization : ' ,Authorization)
                try {
                    context.decoded = Token_Verifay(Authorization);
                    console.log(' ------ Subscription : decoded : ' , context.decoded)
                } catch (error) {
                    error_msg = " error : ------ Subscription  : "+ error.message ;
                    console.log(error_msg);
                    // throw new Error(error_msg);
                }
            },
            onDisconnect:(webSocket, context)=> {
                console.log(' ------ Subscription : Disconnected ! ');
            },
        },
        { server: httpServer, path: server.graphqlPath }
    );

    const PORT = Number(process.env.APOLLO_SERVER_PORT);
    httpServer.listen(PORT, () => {console.log(
    `ws://localhost:${PORT}${server.graphqlPath}\
     and\
     http://localhost:${PORT}${server.graphqlPath}`
    );
    });
};

run();

// ---------------------------------------------------------------------------------------------- begin test subscriptions publish
let currentNumber = 0;
setInterval(incrementNumber, 5000);
function incrementNumber() {
    currentNumber++;
    var d = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '')
    msg = `${currentNumber} : ${d}`
    console.log(`msg send :  =>  '${msg}' `)
    pubsub.publish("DATE_NOW", { dateNow: msg });
}
// ---------------------------------------------------------------------------------------------- end test subscriptions publish
// run mysql server
// const { exec } = require('child_process');
// exec('../', (err, stdout, stderr) => {
//     if (err) {
//         console.log('error--------------------');
//         return;
//     }
//     // the *entire* stdout and stderr (buffered)
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
// });

// const net = require('net');
// const client = net.connect({port: 80, host:"google.com"}, () => {
//   console.log('MyIP='+client.localAddress);
//   console.log('MyPORT='+client.localPort);
// });
