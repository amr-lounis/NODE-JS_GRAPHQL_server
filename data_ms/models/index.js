var config = require('../config/config')['environment'];
const { Sequelize } = require('sequelize');
const InitModels = require("./init-models");
var sequelize = new Sequelize(config);
sequelize.authenticate().then(() => {
    console.log('DATABASE : Connection successfully.');
}).catch((e) => {
    console.log('DATABASE : Connection error.', e.message);
    process.exit();
});
const initModels = new InitModels(sequelize);
let models = initModels.get();

module.exports = { models: models, sequelize: sequelize };