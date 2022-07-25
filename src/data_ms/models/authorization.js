const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('authorizations', {
        operation: {  type: DataTypes.STRING(50) },
        roles: { type: DataTypes.STRING(255)  },
        args_required: { type: DataTypes.STRING(255) },
        attributes_forbidden: { type: DataTypes.STRING(255)  },
    });
};
