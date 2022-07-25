const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('product_stocks', {
        name: { type: DataTypes.STRING(50) },
        description: { type: DataTypes.STRING(255) },
        money_purchase: { type: DataTypes.DOUBLE },
        money_selling: { type: DataTypes.DOUBLE },
        money_selling_min: { type: DataTypes.DOUBLE },
        quantity_initial: { type: DataTypes.DOUBLE },
        quantity: { type: DataTypes.DOUBLE },
        quantity_min: { type: DataTypes.DOUBLE },
        tax_perce: { type: DataTypes.DOUBLE },
        date_production: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
        },
        date_purchase: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
        },
        date_expiration: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
        }
    });
};
