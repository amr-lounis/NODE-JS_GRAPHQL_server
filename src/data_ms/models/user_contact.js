const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_contact', {
        phone: { type: DataTypes.STRING(50)},
        fax  : { type: DataTypes.STRING(50)},
        website: { type: DataTypes.STRING(50)},
        email: { type: DataTypes.STRING(50)},
        description: { type: DataTypes.STRING(50) },
    });
};