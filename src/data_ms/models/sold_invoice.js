const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('sold_invoices', {
        description: { type: DataTypes.STRING(255) },
        validation: { type: DataTypes.INTEGER },
        money_without_added: { type: DataTypes.DOUBLE },
        money_tax: { type: DataTypes.DOUBLE },
        money_stamp: { type: DataTypes.DOUBLE },
        money_total: { type: DataTypes.DOUBLE },
        money_paid: { type: DataTypes.DOUBLE },
        money_unpaid: { type: DataTypes.DOUBLE
        }
    });
};
