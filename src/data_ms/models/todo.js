const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('todos', {
        name: { type: DataTypes.STRING(50) },
        description: { type: DataTypes.STRING(255) },
        validation: { type: DataTypes.INTEGER },
        money_losses : { type: DataTypes.DOUBLE },
        money_required : { type: DataTypes.DOUBLE },
        money_discount : { type: DataTypes.DOUBLE },
        money_after_discount: { type: DataTypes.DOUBLE },
        money_paid: { type: DataTypes.DOUBLE },
        money_unpaid: { type: DataTypes.DOUBLE}
    });
};
