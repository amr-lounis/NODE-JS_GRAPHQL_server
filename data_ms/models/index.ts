'use strict';

const env = 'development';
var config = require('../config/config')[env];

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
