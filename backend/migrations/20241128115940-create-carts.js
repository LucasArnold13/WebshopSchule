'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
      },
      customer_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'customers', 
        key: 'id' 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
      },
      createdAt: {
      allowNull: false,
      type: Sequelize.DATE
      },
      updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
  }
};