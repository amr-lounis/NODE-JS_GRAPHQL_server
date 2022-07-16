const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt, GraphQLObjectType } = require('graphql')
const { exec } = require('child_process');

module.exports = {
    type: GraphQLString,
    args: {
        command : { type: GraphQLString },
    },
    resolve: (
        root,
        args,
        { decoded, attributes }
        ,info 
        )=> {
        console.log("decoded : ",decoded)
        //-------------------------------------------------------------------
        return new Promise((resolve, reject) => {
            exec(`${args.command}`, (err, stdout, stderr) => {
                if (err) {
                    console.log('error--------------------');
                    reject('error--------------------')
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                resolve(` ${stdout} `)
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