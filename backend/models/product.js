'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Product.init({
    description: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    sku: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};