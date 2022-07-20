class AuthHelper{
    constructor() {
        console.log("-----------: AuthHelper class constructor");
    }

    _arraysIntersection(a1,a2){
        return  a1.filter(function(n) { return a2.indexOf(n) !== -1;});
    }

    _arraySubtract(a1,a2){
        return a1.filter(n => !a2.includes(n))
    }
    
    attributes_forbidden(_thisListAttributs,_attributes_forbidden){
        var v = this._arraysIntersection(_thisListAttributs,_attributes_forbidden)
            if(v.length>0)
                throw new Error(` attributes forbidden is : ${v.toString()}.`)
    }
    
    attributs_authorized(_thisListAttributs,_listAttributsAuthorized){
        var v = this._arraySubtract(_thisListAttributs,_listAttributsAuthorized)
        if(v.length>0)
                throw new Error(` attributes forbidden is : ${v.toString()}.`)
    }

    role_authorized(_thisRole,_listRoleAuthorized){
        if (! _listRoleAuthorized.includes(_thisRole || '')) 
           throw new Error(' only : '+_listRoleAuthorized.toString()+' : can\'t do .')
    }
      
    args_required(_thisArgs,_listArgsRequired){
        _listArgsRequired.forEach((value)=>{
            if(_thisArgs.hasOwnProperty(value) ){
                if(_thisArgs[value] == null)
                    throw new Error(`arg : ${value} : It doesn't have to be value null .`);
            }else{
                throw new Error(`arg : ${value} : is required`);
            }
        })
    }

    operation_authorized(_thisOperation,_listOperationsAuthorized){
        return (_listOperationsAuthorized.includes(_thisOperation))
    }
}
var authHelper = new AuthHelper();

var _arrayOfArraysAuth=[
        //operation , roles, args_required , Attributes_forbidden
        ['execute_cmd','admin','command',null],
    
        ['todo_get','admin,employee',null,null],
        ['todo_create','admin,employee','name',null],
        ['todo_update','admin,employee','id',null],
        ['todo_delete','admin','id','id',null],
        ['todo_images_get','admin,employee','id',null],
        ['todo_image_upload','admin,employee','id,file',null],
        ['todo_image_delete','admin,employee','id,fileNmae',null],
        
        ['user_get','admin',null,null],
        ['user_get','employee',null,'password'],
        ['user_signin','admin,employee,anonymous','name,password',null],
        ['user_create','admin,employee,anonymous','name,password',null],
        ['user_update','admin,employee','id',null],
        ['user_delete','admin','id',null],
        ['user_image_upload','admin,employee','id,file',null],
        ['user_image_delete','admin,employee','id,fileNmae',null],
        ['notification_sender','admin,employee','receiver_id,title,content',null]
    ]

function authorization(operationName,decode,args,attributs){
    _arrayOfArraysAuth.forEach((_auth)=> {
        //------------------------------------------------------- test operationName
        if(_auth[0] == operationName){  
            console.log('------- authorization : ',_auth)
            //-------------------------------------------------- test roles
            if(_auth[1] != null && _auth[1] != ''){
                const roles = _auth[1].split(',')
                authHelper.role_authorized(decode.role,roles)
            }else{
                console.log(' authorized for all users .')
            }
            //-------------------------------------------------- test args
            if(_auth[2] != null && _auth[2] != ''){
                const args_required = _auth[2].split(',')
                authHelper.args_required(args,args_required)
            }else{
                console.log(' authorized for all args .')
            }
            //-------------------------------------------------- test attributes_forbidden
            if(_auth[3] != null && _auth[3] != ''){
                const attributes_forbidden = _auth[3].split(',')
                authHelper.attributes_forbidden(attributs,attributes_forbidden)
            }else{
                console.log(' authorized for all attributes .')
            }
            //--------------------------------------------------
        }
    })
}


module.exports = authorization;