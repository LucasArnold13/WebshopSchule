'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = [];

    for (let i = 0; i < 20; i++) {
      categories.push({
        name: faker.commerce.department(), 
        description: faker.lorem.paragraph(), 
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Daten in die Categories-Tabelle einfügen
    await queryInterface.bulkInsert('categories', categories);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
