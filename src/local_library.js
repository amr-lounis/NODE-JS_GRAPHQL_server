const controllers = require('../data_ms');
console.log('local_library : ',Object.keys(controllers))

module.exports = {
    ...controllers
} 