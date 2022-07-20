const my_files = require('./my_files')
const { models } = require("../models");
const {authorization} = models

class authorization_controller{
    constructor() {
        console.log("-----------: authorization controller constructor");
    }
    async throwNotExist(id){
   
        var exist = await authorization.count({ where: { id: id } }).then(count => {return (count > 0) ? true : false});
        if( !exist ) {
            // console.log('throwNotExist id values : ',id)
            throw new Error(`not exist authorization.id='${id}' .`);
        }
    }
    //args.thisUserId = decoded.id;
    create(args,context){
        return new Promise((resolve, reject) => {
            console.log(args)
            authorization.create(args
        // {
        //     attributes: context.attributes,
        //     operation: args.operation,
        //     roles: args.roles,
        //     args_required: args.args_required,
        //     Attributes_forbidden: args.Attributes_forbidden
        // }
        ).then(data => {
                console.log('create new id : ' + data.id + ' : OK')
                resolve(data.id);
            }).catch(function (err) {
                reject(err.message);
            });
        })
    }

    delete(args,console){
        return new Promise((resolve, reject) => {
            authorization.destroy({ where: { id: args.id } }).then(data => {
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
            authorization.update(args, { where: { id: id } }
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
        
        if( ! args.hasOwnProperty('offset') ) args.offset= 0;
        if( ! args.hasOwnProperty('limit') ) args.limit= 10;
        else if(args.limit > 100) args.limit= 100;
        // -------------------------------------------------------------------- 

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
                reject('error get');
            });
        })
    }
}

module.exports = new authorization_controller()