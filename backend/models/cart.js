'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.hasMany(models.CartItem, {
        foreignKey: 'cart_id',
        as: 'cartitems',
      });
    }
  }
Cart.init({
  customer_id: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    validate: {
      notNull: { 
        msg: 'Customer ID is required.',
      },
    },
  },
}, {
  sequelize, 
  modelName: 'Cart', 
  tableName: 'carts',
});
  return Cart;
};