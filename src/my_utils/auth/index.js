const auth_setting = require('./auth_setting')
const auth_todo = require('./auth_todo')
const auth_user = require('./auth_user')


function authorization(operationName,decode,args,attributs){
    auth_setting(operationName,decode,args,attributs);
    auth_user(operationName,decode,args,attributs);
    auth_todo(operationName,decode,args,attributs);
}

module.exports = authorization;