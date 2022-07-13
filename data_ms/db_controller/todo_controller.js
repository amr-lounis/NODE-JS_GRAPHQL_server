const my_files = require('../../my_utils/my_files')
const { models } = require("../db_models");
const {todo} = models

class todo_controller{
    constructor() {
        console.log("-----------: todo controller constructor");
    }
    async throwNotExist(id){
        var exist = await todo.count({ where: { id: id } }).then(count => {return (count > 0) ? true : false});
        if( !exist ) throw new Error("id : is not exist");
    }

    create(args,attributes){
        return new Promise((resolve, reject) => {
            todo.create({
            attributes: attributes,
            raw: true,
            nest: true,
            name: args.name,
            description: args.description,
            validation: args.validation,
            employeeId: args.employeeId,
            customerId: args.customerId
        }).then(data => {
                resolve(data);
            }).catch(function (err) {
                reject(err.message);
            });
        })
    }

    delete(args,attributes){
        return new Promise((resolve, reject) => {
            todo.destroy({ where: { id: args.id } }).then(data => {
                if (data >= 1) resolve('deleted');
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
            todo.update(args, { where: { id: id } }
            ).then(data => {
                if (data >= 1) resolve('updated');
                else reject('not exist');
            }).catch(function (err) {
                reject('cant updated');
            });
        })
    }

    getWhere(_Object,_attributes,_offset,_limit){
        console.log('------------- _attributes')
        console.log(_attributes)
        console.log('------------- _Object')
        console.log(_Object)

        return new Promise((resolve, reject) => {
            todo.findAll({
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

    async image_delete(args,attributes){
        await this.throwNotExist(args.id)
        my_files.FileDelete('todos',args.id,args.fileNmae)
        return "ok";
    } 

    async image_upload(args,attributes){
        await this.throwNotExist(args.id)
        return my_files.image_upload(args.file,'todo',args.id)
    }
    
    async images_get(args,attributes){
        await this.throwNotExist(args.id)
        return my_files.UrlListGet('todo',args.id)
    } 
}

module.exports = new todo_controller()