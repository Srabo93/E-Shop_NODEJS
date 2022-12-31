const {DataTypes} = require('sequelize');
const sequelize = require('../config/database')

const CartItem = sequelize.define('cartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER
    }
})


module.exports = CartItem