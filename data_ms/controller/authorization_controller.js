const { models } = require("../models");
const {authorization} = models

//args.thisUserId = decoded.id;
class authorization_controller{
    //---------------------------------------------------------------------
    authorization_array =[]
    constructor() {
        console.log("-----------: authorization controller constructor");
        this._get_authorization_array().then((data)=>{
            this.authorization_array = data;
            console.log(this.authorization_array)
        })
        .catch((err)=>{
            console.log("ERROR : authorization_array : ",err.message)
        })
    }
    //---------------------------------------------------------------------
    async Exist(id){
        return await authorization.count({ where: { id: id } }).then(count => {return (count > 0) ? true : false}).catch((err)=>{return false});
    }
    //---------------------------------------------------------------------
    create(args,context){
        return new Promise((resolve, reject) => {
            authorization.create(args)
            .then(data => {
                resolve(data.id);
            })
            .catch(function (err) {
                reject(err);
            });
        })
    }
    //---------------------------------------------------------------------
    delete(args,console){
        return new Promise(async (resolve, reject) => {
            if(! await this.Exist(args.id))reject(new Error('ERROR : NOT EXIST'))
            else{
                authorization.destroy({ where: { id: args.id } }).then(data => {
                    if (data >= 1) resolve('DELETED');
                    else reject(new Error('ERROR : CANNOT DELETE'));
                }).catch(function (err) {
                    reject(err);
                });
            };
        })
    }
    //---------------------------------------------------------------------
    update(args,console){
        return new Promise(async (resolve, reject) => {
            if(! await this.Exist(args.id))reject(new Error('ERROR : NOT EXIST'))
            else{
                var id = args.id;
                delete args['id'];
                //-------------------
                authorization.update(args, { where: { id: id } }
                ).then(data => {
                    if (data >= 1) resolve('UPDATED');
                }).catch(function (err) {
                    reject(err);
                });
           };
        })
    }
    //---------------------------------------------------------------------
    getWhere(args,context){
        //-----------------
        var _Object = {}
        if( args.hasOwnProperty('id') ) _Object.id = args.id;

        if( ! args.hasOwnProperty('offset') ) args.offset= 0;
        if( ! args.hasOwnProperty('limit') ) args.limit= 10;
        else if(args.limit > 100) args.limit= 100;
        //----------------- 
        return new Promise((resolve, reject) => {
            authorization.findAll({
                attributes: context.attributes,
                raw: true,
                nest: true,
                where: _Object,
                offset:args.offset,
                limit:args.limit
            }).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        })
    }
    //---------------------------------------------------------------------
     _get_authorization_array(){
        return new Promise((resolve, reject) => {
            authorization.findAll({raw: true,nest: true})
            .then(data => {
            var _authorization = []
            data.forEach(element => {
                _authorization.push([
                     element.operation,
                     element.roles, 
                     element.args_required,
                     element.attributes_forbidden ])
            });
            resolve(_authorization);
        }).catch(err => {
            reject(err);
        });
        })
    }
    //---------------------------------------------------------------------
}

module.exports = new authorization_controller()