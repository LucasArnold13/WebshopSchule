'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('statuses', [
      { name: 'Offen', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Geschlossen', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Storniert', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('statuses', null, {});
  }
};
