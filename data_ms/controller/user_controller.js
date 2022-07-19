const my_files = require('./my_files');
const { models } = require("../models");
const {user,role} = models ;
//args.thisUserId

class user_controller{
    constructor() {
        console.log("-----------: user controller constructor");
    }
    async throwNotExist(id){
        var exist = await user.count({ where: { id: id } }).then(count => {return (count > 0) ? true : false});
        if( !exist ) throw new Error("id : is not exist");
    }

    create(args,context){
        return new Promise((resolve, reject) => {
            user.create(args).then(data => {
                console.log('create new id : ' + data.id + ' : OK')
                resolve(data.id);
            }).catch(function (err) {
                reject(err.message);
            });
        })
    }

    delete(args,context){
        return new Promise((resolve, reject) => {
            user.destroy({ where: { id: args.id } }).then(data => {
                console.log({ data: data });
                if (data >= 1) resolve('user deleted');
                else reject('user not exist');
            }).catch(function (err) {
                reject('cant user deleted');
            });
        })
    }

    update(args,context){
        return new Promise((resolve, reject) => {
            var id = args.id;
            delete args['id'];
            user.update(args, { where: { id: id } }
            ).then(data => {
                console.log({ data: data });
                if (data >= 1) resolve('user updated');
                else reject('user not exist');
            }).catch(function (err) {
                reject('cant user updated');
            });
        })
    }

    getWhere(args,context){
        // --------------------------------------------------------------------
        var _Object = {}
        if( args.hasOwnProperty('id') ) _Object.id = args.id;
        
        if( ! args.hasOwnProperty('offset') ) args.offset= 0;
        if( ! args.hasOwnProperty('limit') ) args.limit= 10;
        else if(args.limit > 100) args.limit= 100;
        // -------------------------------------------------------------------- 
        
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
            }).catch(err => {
                reject('error');
            });
        })
    }

    signin(args,context){
        return new Promise((resolve, reject) => {
            user.findOne({
                where: { name: args.name, password: args.password },
                include: { model: role },
                raw: true,
                nest: true,
            }).then(data => {
                console.log('------------------- signin');
                if (data) {
                    resolve(data);
                }
                else {
                    throw new Error('error signin');
                }
            }).catch(function (err) {
                console.log(err.message)
                reject(err.message);
            });
        });
    }

    async image_delete(args,context){
        await this.throwNotExist(args.id)
        my_files.FileDelete('user',args.id,args.fileNmae)
        return "ok";
    } 

    async image_upload(args,context){
        console.log('args:',args)
        await this.throwNotExist(args.id)
        return my_files.image_upload(args.file,'user',args.id)
    }
    
    async images_get(args,context){
        await this.throwNotExist(args.id)
        return my_files.UrlListGet('user',args.id)
    } 
}

module.exports = new user_controller()