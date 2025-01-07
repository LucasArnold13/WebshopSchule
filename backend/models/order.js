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
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'status_id cannot be null'
        }
      }
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'customer_id cannot be null'
        }
      }
    },
    total_price_float: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'total_price_float cannot be null'
        }
      }
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'order_date cannot be null'
        }
      }
    },
    delivery_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'delivery_date cannot be null'
        }
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Street is required'
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'City is required'
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'State is required'
        }
      }
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Postal Code is required'
        }
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Country is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
  });
  return Order;
};