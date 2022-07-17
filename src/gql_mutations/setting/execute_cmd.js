const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt, GraphQLObjectType } = require('graphql')
const { exec } = require('child_process');

module.exports = {
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
/*
mutation Mutation($command: String) {
  execute_cmd(command: $command)
}
{
    "command": ".\\hello_world.exe"
}
*/