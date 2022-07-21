const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')
//----------------------------------------------------------------------------------
const execute_cmd = {
    type: GraphQLString,
    args: {
        command : { type: GraphQLString },
    },
    resolve: ( root, args, context, info  ) => {
        return new Promise((resolve, reject) => {
            exec(`${args.command}`, (err, stdout, stderr) => {
                if (err) {
                    const error_message = ' error command : '+ err.message;
                    console.log(error_message);
                    reject(error_message)
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                resolve(` ${stdout} `)
                return;
            });
        })
    }
}
//----------------------------------------------------------------------------------
module.exports = {
    execute_cmd
}