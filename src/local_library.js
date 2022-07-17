const controllers = require('../data_ms');
console.log(Object.keys(controllers))

module.exports = {
    ...controllers
}
