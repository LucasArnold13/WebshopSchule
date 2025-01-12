'use strict';
const { faker } = require('@faker-js/faker');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = [];

    for (let i = 0; i < 1000; i++) {
      products.push({
        description: faker.commerce.productDescription(), // Zufällige Produktbeschreibung
        quantity: faker.number.int({ min: 1, max: 100 }), // Zufällige Menge zwischen 1 und 100
        name: faker.commerce.productName(), // Zufälliger Produktname
        image_url: faker.image.urlPicsumPhotos(), // Zufällige Bild-URL
        category_id: faker.number.int({ min: 1, max: 20 }), // Zufällige Kategorie-ID
        price: faker.commerce.price({ min: 5, max: 500 }), // Preis zwischen 5 und 500
        sku: faker.number.int({ min: 1000, max: 9999 }), // Zufällige SKU zwischen 1000 und 9999
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // Datensätze in die Datenbank einfügen
    await queryInterface.bulkInsert('products', products);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
