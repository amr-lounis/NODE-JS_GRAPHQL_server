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
            if(v.length > 0)
                throw new Error(` attribut : ${_listAttributsAuthorized.toString()} :  authorized .`)
    }

    role_authorized(_thisRole,_listRoleAuthorized){
        if (! _listRoleAuthorized.includes(_thisRole || '')) 
           throw new Error(' only : '+_listRoleAuthorized.toString()+' : can\'t do .')
      }
      
    args_required(_args,_listArgsRequired){
        // const arrayArgs = Object.keys(_args)
        _listArgsRequired.forEach((value)=>{
            if(! _args.hasOwnProperty(value) )
                throw new Error(`arg : ${value} : is required`);
    });
    }
}

const l = ['0','1','2','3',]

const l2 = ['1','2','4',]

const l3 = ['4','2']

const oo = new  auth()

const v = [{id:5},['5444']]
console.log(v)
var args= {}
// args.id = 'heloo'
args.name = 'heloo'
// oo.attributs_authorized(l2,l3)
// oo.attributs_not_authorized(l,l3)

// oo.args_required(args,['id'])

// l2.forEach((v)=>{
//  console.log(l.includes(v))
// })

// var filteredArray = l.filter(function(n) {
//     return l2.indexOf(n) !== -1;
// });
// console.log(filteredArray)


// l.forEach((v)=>{
//    if(! l2.includes(v) )console.log(v)
// })



