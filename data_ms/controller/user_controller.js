const my_files = require('./my_files')
const my_token = require('./my_token')
const { models } = require("../models");
const {user,role} = models

class user_controller{
    constructor() {
        console.log("-----------: user controller constructor");
    }
    async throwNotExist(id){
        var exist = await user.count({ where: { id: id } }).then(count => {return (count > 0) ? true : false});
        if( !exist ) throw new Error("id : is not exist");
    }

    create(args,attributes){
        return new Promise((resolve, reject) => {
            user.create(args).then(data => {
                console.log('create new id : ' + data.id + ' : OK')
                resolve(data.id);
            }).catch(function (err) {
                reject(err.message);
            });
        })
    }

    delete(args,attributes){
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

    update(args,attributes){
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

    getWhere(_Object,_attributes,_offset,_limit){
        console.log('------------- _attributes')
        console.log(_attributes)
        console.log('------------- _Object')
        console.log(_Object)
        
        return new Promise((resolve, reject) => {
            user.findAll({
                attributes: _attributes,
                raw: true,
                nest: true,
                where: _Object,
                offset:_offset,
                limit:_limit
            }).then(data => {
                resolve(data);
            }).catch(err => {
                reject('error');
            });
        })
    }

    signin(args,attributes){
        return new Promise((resolve, reject) => {
            user.findOne({
                where: { name: args.name, password: args.password },
                include: { model: role },
                raw: true,
                nest: true,
            }).then(data => {
                console.log('------------------- signin');
                console.log({ data: data });
                if (data) {
                    const token = my_token.Token_Create({ id: data.id, name: data.name, role: data.role.name });
                    resolve(token);
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

    async image_delete(args,attributes){
        await this.throwNotExist(args.id)
        my_files.FileDelete('user',args.id,args.fileNmae)
        return "ok";
    } 

    async image_upload(args,attributes){
        console.log('args:',args)
        await this.throwNotExist(args.id)
        return my_files.image_upload(args.file,'user',args.id)
    }
    
    async images_get(args,attributes){
        await this.throwNotExist(args.id)
        return my_files.UrlListGet('user',args.id)
    } 
}

module.exports = new user_controller()