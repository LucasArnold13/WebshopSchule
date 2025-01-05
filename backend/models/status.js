'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Status.hasMany(models.Order, {
        foreignKey: 'status_id', 
        as: 'orders',    
      });
    }
  }
  Status.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Status',
    tableName: 'statuses',
  });
  return Status;
};