'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cartItems = [];

    for (let i = 0; i < 20; i++) { // Erstelle 20 zufällige CartItems
      cartItems.push({
        cart_id: faker.number.int({ min: 1, max: 10 }), // Zufällige Cart-ID (1–10)
        product_id: faker.number.int({ min: 1, max: 50 }), // Zufällige Produkt-ID (1–50)
        quantity: faker.number.int({ min: 1, max: 5 }), // Zufällige Menge (1–5)
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Daten in die CartItems-Tabelle einfügen
    await queryInterface.bulkInsert('Cartitems', cartItems);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cartitems', null, {});
  }
};
