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
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Order ID cannot be null'
        }
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price cannot be null'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Quantity cannot be null'
        }
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product ID cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Orderitems',
    tableName: 'orderitems',
  });
  return Orderitems;
};