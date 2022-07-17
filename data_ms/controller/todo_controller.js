const my_files = require('./my_files')
const { models } = require("../models");
const {todo} = models

class todo_controller{
    constructor() {
        console.log("-----------: todo controller constructor");
    }
    async throwNotExist(id){
        var exist = await todo.count({ where: { id: id } }).then(count => {return (count > 0) ? true : false});
        if( !exist ) throw new Error("id : is not exist");
    }
    //args.thisUserId = decoded.id;
    create(args,context){
        return new Promise((resolve, reject) => {
            todo.create({
            attributes: context.attributes,
            raw: true,
            nest: true,
            name: args.name,
            description: args.description,
            validation: args.validation,
            employeeId: args.thisUserId,
            customerId: args.customerId
        }).then(data => {
                console.log('create new id : ' + data.id + ' : OK')
                resolve(data.id);
            }).catch(function (err) {
                reject(err.message);
            });
        })
    }

    delete(args,console){
        return new Promise((resolve, reject) => {
            todo.destroy({ where: { id: args.id } }).then(data => {
                if (data >= 1) resolve('deleted');
                else reject('user not exist');
            }).catch(function (err) {
                reject('cant user deleted');
            });
        })
    }

    update(args,console){
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

    getWhere(args,context){
        // --------------------------------------------------------------------
        var _Object = {}
        if( args.hasOwnProperty('id') ) _Object.id = args.id;
        if( args.hasOwnProperty('employeeId'))  _Object.employeeId=args.employeeId;
        if( args.hasOwnProperty('customerId')) _Object.customerId = args.customerId;
        
        if( ! args.hasOwnProperty('offset') ) args.offset= 0;
        if( ! args.hasOwnProperty('limit') ) args.limit= 10;
        else if(args.limit > 100) args.limit= 100;
        // -------------------------------------------------------------------- 

        return new Promise((resolve, reject) => {
            todo.findAll({
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

    async image_delete(args,context){
        await this.throwNotExist(args.id)
        my_files.FileDelete('todo',args.id,args.fileNmae)
        return "ok";
    } 

    async image_upload(args,context){
        await this.throwNotExist(args.id)
        return my_files.image_upload(args.file,'todo',args.id)
    }
    
    async images_get(args,context){
        await this.throwNotExist(args.id)
        return my_files.UrlListGet('todo',args.id)
    } 
}

module.exports = new todo_controller()