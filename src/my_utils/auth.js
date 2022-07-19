class auth{
    _arraysIntersection(a1,a2){
        return  a1.filter(function(n) { return a2.indexOf(n) !== -1;});
    }

    _arraySubtract(a1,a2){
        return a1.filter(n => !a2.includes(n))
    }
    
    attributs_not_authorized(_thisListAttributs,_listAttributsNotAuthorized){
        var v = this._arraysIntersection(_thisListAttributs,_listAttributsNotAuthorized)
            if(v.length>0)
                throw new Error(` attribut : ${v.toString()} :  not  authorized .`)
    }
    
    attributs_authorized(_thisListAttributs,_listAttributsAuthorized){
        var v = this._arraySubtract(_thisListAttributs,_listAttributsAuthorized)
        if(v.length>0)
                throw new Error(` attribut : ${v.toString()} : not authorized .`)
    }

    role_authorized(_thisRole,_listRoleAuthorized){
        if (! _listRoleAuthorized.includes(_thisRole || '')) 
           throw new Error(' only : '+_listRoleAuthorized.toString()+' : can\'t do .')
    }
      
    args_required(_thisArgs,_listArgsRequired){
        _listArgsRequired.forEach((value)=>{
            if(! _thisArgs.hasOwnProperty(value) )
                throw new Error(`arg : ${value} : is required`);
        })
    }

    operation_authorized(_thisOperation,_listOperationsAuthorized){
        return (_listOperationsAuthorized.includes(_thisOperation))
    }

    authorization(operationName,decode,args,attributs){
        if(decode.id == null){
            const exception_list = ["user_create","user_signin"]
            if(exception_list.includes(operationName)) console.log(`anonymous can access without token verifay . `)
            else throw new Error('ERROR : token .')
        }
        //-------------------------------------------------------

        switch(operationName){
            case 'todo_get': { 
                //
                break;
            }
            case 'todo_images_get': { 
                this.args_required(args,['id'])
                break;
            }
            case 'todo_create': { 
                this.args_required(args,['name'])
                break;
            }
            case 'todo_update': { 
                this.args_required(args,['id'])
                break;
            }
            case 'todo_delete': { 
                this.args_required(args,['id'])
                break;
            }
            case 'todo_image_upload': { 
                this.args_required(args,['id','file'])
                if( args.file==null ) throw new Error("file : is null value !");
                break;
            }
            case 'todo_image_delete': { 
                this.args_required(args,['id','fileNmae'])
                break;
            }
            default: { console.log('not todo');break;}
        }
        //-------------------------------------------------------
        switch(operationName){
            case 'user_signin': {
                this.args_required(args,['name','password'])
                break;
            }
            case 'user_create': {
                this.args_required(args,['name','password'])
                break;
            }
            case 'user_update': {
                //
            break;
            }
            case 'user_delete': {
                this.role_authorized(decode.role,['admin'])
                break;
            }
            case 'user_image_upload': { 
                this.args_required(args,['id','file'])
                if( args.file==null ) throw new Error("file : is null value !");
                break;
            }
            case 'user_image_delete': {
                this.args_required(args,['id','fileNmae'])
                break;
            }
            case 'notification_sender': {
                this.args_required(args,['receiver_id','title','content'])
                break;
            }
            default: { console.log('not user');break;}
        }
        //-------------------------------------------------------
        switch(operationName){
            case 'execute_cmd': { 
                this.args_required(args,['command'])
                this.role_authorized(decode.role,['admin'])
                break;
            }
            default: { console.log('not setting ');break;}
        }
        //-------------------------------------------------------
    }

}

module.exports = new auth();