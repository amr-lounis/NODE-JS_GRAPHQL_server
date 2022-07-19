const auth_helper = require('./auth_helper')

function auth_user(operationName,decode,args,attributs){
    if(decode.id == null){
        const exception_list = ["user_create","user_signin"]
        if(exception_list.includes(operationName)) console.log(`anonymous can access without token verifay . `)
        else throw new Error('ERROR : token .')
    }
    //-------------------------------------------------------
    switch(operationName){
        case 'user_signin': {
            auth_helper.args_required(args,['name','password'])
            break;
        }
        case 'user_create': {
            auth_helper.args_required(args,['name','password'])
            break;
        }
        case 'user_update': {
            //
        break;
        }
        case 'user_delete': {
            auth_helper.role_authorized(decode.role,['admin'])
            break;
        }
        case 'user_image_upload': { 
            auth_helper.args_required(args,['id','file'])
            if( args.file==null ) throw new Error("file : is null value !");
            break;
        }
        case 'user_image_delete': {
            auth_helper.args_required(args,['id','fileNmae'])
            break;
        }
        case 'notification_sender': {
            auth_helper.args_required(args,['receiver_id','title','content'])
            break;
        }
        default: { console.log('not user');break;}
    }
}

module.exports = auth_user;
