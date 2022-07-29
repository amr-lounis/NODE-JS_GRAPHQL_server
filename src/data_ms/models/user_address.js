const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_address', {
        address: { type: DataTypes.STRING(250)},
        City: { type: DataTypes.STRING(50)},
        state: { type: DataTypes.STRING(50)},
        Country: { type: DataTypes.STRING(50)},
        description: { type: DataTypes.STRING(250) },
    });
};