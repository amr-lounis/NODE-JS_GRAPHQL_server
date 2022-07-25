'use strict';
var  faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
        var newData = [];
        for (let i = 0; i < 10; i++) {
            const seedData = {
                name: faker.name.firstName(),
                code: faker.internet.password(),
                description: faker.random.words(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
            };
            newData.push(seedData);
        }
        return queryInterface.bulkInsert('products', newData);
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('products', null, {});
  }
};
