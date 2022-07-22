const { Op } = require("sequelize");
const my_files = require('./my_files')
const { models } = require("../models");
const {todo} = models

//args.thisUserId = decoded.id;
class todo_controller{
    //---------------------------------------------------------------------
    constructor() {
        console.log("-----------: todo controller constructor");
    }
    //---------------------------------------------------------------------
    async Exist(id){
        return await todo.count({ where: { id: id } }).then(count => {return (count > 0) ? true : false}).catch((err)=>{return false});
    }
    //---------------------------------------------------------------------
    create(args,context){
        return new Promise((resolve, reject) => {
            todo.create(args)
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
                todo.destroy({ where: { id: args.id } }).then(data => {
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
                todo.update(args, { where: { id: id } }
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
        if( args.hasOwnProperty('employeeId'))  _Object.employeeId=args.employeeId;
        if( args.hasOwnProperty('customerId')) _Object.customerId = args.customerId;
        //-----------------
        if(
               args.hasOwnProperty('startYear') 
            && args.hasOwnProperty('startMonth')
            && args.hasOwnProperty('startDate') 
            && args.hasOwnProperty('endYear') 
            && args.hasOwnProperty('endMonth') 
            && args.hasOwnProperty('endDate')  
         )try {
             const start =new Date(args.startYear, args.startMonth, args.startDate)
             const end  = new Date(args.endYear  ,args.endMonth   , args.endDate  ) 
            _Object.createdAt= {[Op.between]: [start, end]}
         } catch (error) { console.log('------- error date .')}
        //-----------------
        if( ! args.hasOwnProperty('offset') ) args.offset= 0;
        if( ! args.hasOwnProperty('limit') ) args.limit= 10;
        else if(args.limit > 100) args.limit= 100;
        //------------------

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
    //---------------------------------------------------------------------
    async image_delete(args,context){
        if(! await this.Exist(args.id)) throw new Error('ERROR : NOT EXIST')
        else{ my_files.FileDelete('todo',args.id,args.fileNmae)}
    } 
    //---------------------------------------------------------------------
    async image_upload(args,context){
        if(! await this.Exist(args.id)) throw new Error('ERROR : NOT EXIST')
        else{return my_files.image_upload(args.file,'todo',args.id)}
    }
    //---------------------------------------------------------------------
    async images_get(args,context){
        if(! await this.Exist(args.id)) throw new Error('ERROR : NOT EXIST')
        else{ return my_files.UrlListGet('todo',args.id)}
    } 
    //---------------------------------------------------------------------
}

module.exports = new todo_controller()