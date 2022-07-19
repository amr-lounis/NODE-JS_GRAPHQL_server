class auth_helper{
    constructor() {
        console.log("-----------: auth_helper class constructor");
    }

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
}

module.exports = new auth_helper();