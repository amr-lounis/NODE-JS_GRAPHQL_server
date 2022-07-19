'use strict';
var faker = require("faker");
module.exports = {
  async up (queryInterface, Sequelize) {
    var newData = [];
    for (let i = 0; i < 10; i++) {
        const seedData = {
            name: faker.name.firstName(),
            description: faker.name.title(),
            validation: Math.round(Math.random()*1000000),
            createdAt: faker.date.future(),
            updatedAt: faker.date.future(),
            employeeId: 1
        };
        newData.push(seedData);
    }
    return queryInterface.bulkInsert('todos', newData);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('todos', null, {});
  }
};
