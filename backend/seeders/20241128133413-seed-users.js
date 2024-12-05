'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];

    for (let i = 0; i < 10; i++) {
      users.push({
        name: faker.person.fullName(), // Zufälliger Benutzername
        email: faker.internet.email(), // Zufällige E-Mail-Adresse
        password: faker.internet.password(), // Zufälliges Passwort
        role_id: faker.number.int({ min: 1, max: 3 }), // Zufällige Role-ID (angenommen, 1–3 existieren)
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Benutzer in die Users-Tabelle einfügen
    await queryInterface.bulkInsert('Users', users);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
