'use strict';
var faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
        var newData = [];
        for (let i = 0; i < 10; i++) {
            const seedData = {
                name: faker.name.firstName(),
                description: faker.name.title(),
                createdAt: faker.date.future(),
                updatedAt: faker.date.future(),
            };
            newData.push(seedData);
        }
        return queryInterface.bulkInsert('roles', newData);
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('roles', null, {});
  }
};
