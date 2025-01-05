'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const carts = [];

    for (let i = 0; i < 10; i++) { // Erstelle 10 zufällige Kunden
      carts.push({
        customer_id: faker.number.int({ min: 1, max: 10}), // Zufällige ID zwischen 1 und 100
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Daten in die Tabelle einfügen
    await queryInterface.bulkInsert('carts', carts);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carts', null, {});
  }
};
