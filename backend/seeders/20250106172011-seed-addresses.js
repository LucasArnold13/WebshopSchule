const { faker } = require('@faker-js/faker');
const customer = require('../models/customer');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  const addresses = [];
  for (let i = 0; i < 100; i++) {
    addresses.push({
      customer_id: faker.number.int({ min: 1, max: 10 }), 
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      postalCode: faker.location.zipCode(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  await queryInterface.bulkInsert('addresses', addresses, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
