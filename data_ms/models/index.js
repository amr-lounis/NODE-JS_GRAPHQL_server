'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const env = 'development';
var config = require('../config/config')[env];
const { Sequelize } = require('sequelize');
const { initModels } = require("./init-models");
let sequelize = new Sequelize(config);
class Models {
}
Models.instance = new initModels(sequelize);
Models.getInstance = () => Models.instance;
exports.default = Models;
let models = Models.getInstance();
module.exports = { models: models, sequelize: sequelize };
//# sourceMappingURL=index.js.map