'use strict';

const env = process.env.NODE_ENV || 'development';
var config = require('../db_config/config.js')[env];
const { Sequelize } = require('sequelize');
const { initModels } = require("./init-models");
let sequelize = new Sequelize(config);

class Models {
   private static instance = new initModels(sequelize);
   public static getInstance = () => Models.instance;
}
export default Models;

let models = Models.getInstance();
module.exports = { models: models, sequelize: sequelize };
