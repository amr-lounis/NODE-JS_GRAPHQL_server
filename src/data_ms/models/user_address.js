const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_address', {
        name: { type: DataTypes.STRING(50), unique: true },
        description: { type: DataTypes.STRING(50) },
    });
};
//address: faker.address.cityName(),
//city: faker.address.city(),
//country: faker.address.country(),