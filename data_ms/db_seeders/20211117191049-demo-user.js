'use strict';
var  faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
        var newData = [];
        newData.push({
            name: 'admin',
            password: 'admin',
            description: 'admin',
            createdAt: faker.date.past(),
            updatedAt: faker.date.past(),
        })
        for (let i = 0; i < 10; i++) {
            const seedData = {
                name: faker.name.firstName(),
                password: faker.internet.password(),
                description: faker.random.words(),
                //first_name: faker.name.firstName(),
                //last_name: faker.name.lastName(),
                //gender: faker.name.gender(),
                //activity: faker.company.catchPhrase(),
                //nrc: faker.name.jobArea(),
                //nif: faker.commerce.color(),
                //address: faker.address.cityName(),
                //city: faker.address.city(),
                //country: faker.address.country(),
                //phone: faker.phone.phoneNumber(),
                //fax: faker.phone.phoneNumber(),
                //website: faker.internet.url(),
                //email: faker.internet.email(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.past(),
            };
            newData.push(seedData);
        }
        return queryInterface.bulkInsert('users', newData);
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
