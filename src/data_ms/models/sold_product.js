const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('sold_products', {
        description: { type: DataTypes.STRING(255) },
        quantity: { type: DataTypes.DOUBLE },
        money_unit: { type: DataTypes.DOUBLE },
        money_tax_perce: { type: DataTypes.DOUBLE },
        money_stamp: { type: DataTypes.DOUBLE },
        money_discount: { type: DataTypes.DOUBLE }
    });
};
