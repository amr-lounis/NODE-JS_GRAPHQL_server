var config = require('../config/config')['environment'];
const { Sequelize } = require('sequelize');
const InitModels = require("./init-models");
var sequelize = new Sequelize(config);
sequelize.authenticate().then(() => {
    log('DATABASE : Connection successfully.');
}).catch((e) => {
    log(`DATABASE : Connection error.${e.message}`);
    process.exit();
});
const initModels = new InitModels(sequelize);
let models = initModels.get();

module.exports = { models: models, sequelize: sequelize };

function log(_message){
    if(require('../config/cnf').debug_enabled) console.log(_message)
}