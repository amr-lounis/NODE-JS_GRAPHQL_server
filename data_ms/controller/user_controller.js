const my_files = require('./my_files');
const { models } = require("../models");
const {user,role} = models ;

//args.thisUserId
class user_controller{
    //---------------------------------------------------------------------
    constructor() {
        console.log("-----------: user controller constructor");
    }
    //---------------------------------------------------------------------
    async Exist(id){
        return await user.count({ where: { id: id } }).then(count => {return (count > 0) ? true : false}).catch((err)=>{return false});
    }
    //---------------------------------------------------------------------
    create(args,context){
        return new Promise((resolve, reject) => {
            user.create(args)
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
                user.destroy({ where: { id: args.id } }).then(data => {
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
                user.update(args, { where: { id: id } }
                ).then(data => {
                    if (data >= 1) resolve('UPDATED');
                    else reject(new Error('ERROR : CANNOT UPDATED'));
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
            user.findAll({
                attributes: context.attributes,
                raw: true,
                nest: true,
                where: _Object,
                offset:args.offset,
                limit:args.limit
            }).then(data => {
                resolve(data);
            }).catch((err) => {
                reject(err);
            });
        })
    }
    //---------------------------------------------------------------------
    async image_delete(args,context){
        if(! await this.Exist(args.id)) throw new Error('ERROR : NOT EXIST')
        else{ my_files.FileDelete('user',args.id,args.fileNmae)}
    } 
    //---------------------------------------------------------------------
    async image_upload(args,context){
        if(! await this.Exist(args.id)) throw new Error('ERROR : NOT EXIST')
        else{return my_files.image_upload(args.file,'user',args.id)}
    }
    //---------------------------------------------------------------------
    async images_get(args,context){
        if(! await this.Exist(args.id)) throw new Error('ERROR : NOT EXIST')
        else{ return my_files.UrlListGet('user',args.id)}
    } 
    //---------------------------------------------------------------------
    signin(args,context){
        return new Promise((resolve, reject) => {
            user.findOne({
                where: { name: args.name, password: args.password },
                include: { model: role },
                raw: true,
                nest: true,
            }).then(data => {
                if (data) resolve(data);
                else reject(new Error('error signin'));
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

module.exports = new user_controller()