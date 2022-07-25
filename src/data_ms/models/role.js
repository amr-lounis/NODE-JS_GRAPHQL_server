const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('roles', {
        name: { type: DataTypes.STRING(50), unique: true },
        description: { type: DataTypes.STRING(255) }
    });
};
