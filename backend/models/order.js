'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.Orderitems, {
        foreignKey: 'order_id', 
        as: 'orderitems',    
      });

      Order.belongsTo(models.Status, {
        foreignKey: 'status_id', 
        as: 'status',    
      });

      Order.belongsTo(models.Customer, {
        foreignKey: 'customer_id', 
        as: 'customer',        
      });
    }
  }
  Order.init({
    status_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    total_price_float: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};