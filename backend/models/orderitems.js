'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orderitems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orderitems.belongsTo(models.Product, {
        foreignKey: 'product_id', 
        as: 'product',    
      });
      Orderitems.belongsTo(models.Order, {
        foreignKey: 'order_id', 
        as: 'order',        
      });
    }
  }
  Orderitems.init({
    order_id: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orderitems',
  });
  return Orderitems;
};