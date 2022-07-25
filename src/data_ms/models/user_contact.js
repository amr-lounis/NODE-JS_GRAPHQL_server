const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_contact', {
        name: { type: DataTypes.STRING(50), unique: true },
        description: { type: DataTypes.STRING(50) },
    });
};
//phone: faker.phone.phoneNumber(),
//fax: faker.phone.phoneNumber(),
//website: faker.internet.url(),
//email: faker.internet.email(),