'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const orderDetails = [];

    for (let i = 0; i < 2100; i++) {
      orderDetails.push({
        order_id: faker.number.int({ min: 1, max: 1000 }), // Zufällige Order-ID (1–10)
        price: faker.commerce.price({ min: 10, max: 500, dec: 2 }), // Zufälliger Preis (10–500)
        quantity: faker.number.int({ min: 1, max: 20 }), // Zufällige Menge (1–20)
        product_id: faker.number.int({ min: 1, max: 10 }), // Zufällige Produkt-ID (1–50)
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }


    await queryInterface.bulkInsert('orderitems', orderDetails);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orderitems', null, {});
  }
};
