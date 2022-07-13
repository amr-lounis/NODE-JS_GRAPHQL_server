const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('products', {
        name: {
            type: DataTypes.STRING(50),
            unique: true
        },
        code: {
            type: DataTypes.STRING(50)
        },
        description: {
            type: DataTypes.STRING(255)
        }
    });
};
