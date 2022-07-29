const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_info', {
        first_name: { type: DataTypes.STRING(50)},
        last_name: { type: DataTypes.STRING(50)},
        gender: { type: DataTypes.STRING(1) },
        activity: { type: DataTypes.STRING(250)},
        nrc: { type: DataTypes.STRING(50)},
        nif: { type: DataTypes.STRING(50)},
        description: { type: DataTypes.STRING(250) },
    });
};