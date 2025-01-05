'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItem.belongsTo(models.Role, {
        foreignKey: 'cart_id',
        as: 'cart',
      });
    }
  }
  CartItem.init({
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Cart ID is required.',
        },
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product ID is required.',
        },
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Quantity is required.',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cartitems',
  });
  return CartItem;
};