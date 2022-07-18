'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const env = 'mysql_env';
var config = require('../config/config')[env];
const { Sequelize } = require('sequelize');
const { initModels } = require("./init-models");
console.log(config);
var sequelize = new Sequelize(config);
sequelize.authenticate().then(() => {
    console.log('DATABASE : Connection successfully.');
}).catch((e) => {
    console.log('DATABASE : Connection error.', e.message);
    process.exit();
});
class Models {
}
Models.instance = new initModels(sequelize);
Models.getInstance = () => Models.instance;
exports.default = Models;
let models = Models.getInstance();
module.exports = { models: models, sequelize: sequelize };
//# sourceMappingURL=index.js.map