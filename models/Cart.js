const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
  },
});

module.exports = Cart;
