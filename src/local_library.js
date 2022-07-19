const controllers = require('data_ms');
controllers.user_controller.initDB()
const my_token =  require('./my_utils/my_token');
const _pubsub = require('./my_utils/_pubsub');
const authorization = require('./my_utils/auth');

console.log('local_library : ',Object.keys(controllers))

module.exports = {
    ...controllers,
    my_token,
    _pubsub,
    authorization
} 