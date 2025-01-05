'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('statuses', [
      { name: 'Pending', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Approved', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Rejected', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('statuses', null, {});
  }
};
