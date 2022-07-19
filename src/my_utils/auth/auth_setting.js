const auth_helper = require('./auth_helper')

function auth_user(operationName,decode,args,attributs){
    if(decode.id == null){
        const exception_list = ["user_create","user_signin"]
        if(exception_list.includes(operationName)) console.log(`anonymous can access without token verifay . `)
        else throw new Error('ERROR : token .')
    }
    //-------------------------------------------------------
    switch(operationName){
        case 'execute_cmd': {
            auth_helper.args_required(args,['command'])
            break;
        }
        default: { console.log('not setting');break;}
    }
}

module.exports = auth_user;
