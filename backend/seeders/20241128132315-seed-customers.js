'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const customers = [];

    for (let i = 0; i < 100; i++) {
      customers.push({
        firstname: faker.person.firstName(), // Zufälliger Vorname
        lastname: faker.person.lastName(),  // Zufälliger Nachname
        email: faker.internet.email(),      // Zufällige E-Mail
        password: faker.internet.password(), // Zufälliges Passwort
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Kunden in die Datenbank einfügen
    await queryInterface.bulkInsert('customers', customers);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('customers', null, {});

  }
};
