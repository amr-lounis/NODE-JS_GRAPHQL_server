const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        name: {
            type: DataTypes.STRING(50),
            unique: true
        },
        password: {
            type: DataTypes.STRING(50)
        },
        description: {
            type: DataTypes.STRING(50)
        },
    });
};
