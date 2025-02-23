'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const orders = [];

    for (let i = 0; i < 1000; i++) {
      orders.push({
        status_id: faker.number.int({ min: 1, max: 3 }), // Status ID: Beispielwerte 1-3 (Pending, Approved, Rejected)
        customer_id: faker.number.int({ min: 1, max: 100 }), // Kunden ID: Zufällige ID zwischen 1 und 100
        total_price_float: faker.commerce.price({ min: 20, max: 500, dec: 2 }), // Gesamtpreis zwischen 20 und 500 mit 2 Dezimalstellen
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        postalCode: faker.location.zipCode(),
        order_date : faker.date.past(),
        delivery_date : faker.date.future(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Daten in die Orders-Tabelle einfügen
    await queryInterface.bulkInsert('orders', orders);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orders', null, {});
  }
};
