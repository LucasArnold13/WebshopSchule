'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];

    for (let i = 0; i < 1; i++) {
      users.push({
        name: "admin",//faker.person.fullName(), // Zufälliger Benutzername
        email: faker.internet.email(), // Zufällige E-Mail-Adresse
        password: await bcrypt.hash("test", 10), //faker.internet.password(), // Zufälliges Passwort
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
