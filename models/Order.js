const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

module.exports = Order;
