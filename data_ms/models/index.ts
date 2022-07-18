'use strict';

const env = 'mysql_env';
var config = require('../config/config')[env];

const { Sequelize } = require('sequelize');
const { initModels } = require("./init-models");
//----------------------------------
console.log(config)
var sequelize = new Sequelize(config)
sequelize.authenticate().then(() => {
    console.log('DATABASE : Connection successfully.');
}).catch((e:Error) => {
    console.log('DATABASE : Connection error.',e.message);
    process.exit();
});
//----------------------------------
class Models {
   private static instance = new initModels(sequelize);
   public static getInstance = () => Models.instance;
}
export default Models;

let models = Models.getInstance();
module.exports = { models: models, sequelize: sequelize };
