const auth_helper = require('./auth_helper')

function auth_todo(operationName,decode,args,attributs){
    switch(operationName){
        case 'todo_get': { 
            //
            break;
        }
        case 'todo_images_get': { 
            auth_helper.args_required(args,['id'])
            break;
        }
        case 'todo_create': { 
            auth_helper.args_required(args,['name'])
            break;
        }
        case 'todo_update': { 
            auth_helper.args_required(args,['id'])
            break;
        }
        case 'todo_delete': { 
            auth_helper.args_required(args,['id'])
            break;
        }
        case 'todo_image_upload': { 
            auth_helper.args_required(args,['id','file'])
            if( args.file==null ) throw new Error("file : is null value !");
            break;
        }
        
        case 'todo_image_delete': { 
            auth_helper.args_required(args,['id','fileNmae'])
            break;
        }
        default: { console.log('not todo');break;}
    }
}

module.exports = auth_todo;
