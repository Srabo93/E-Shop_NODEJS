const {DataTypes} = require('sequelize');
const sequelize = require('../config/database')

const OrderItem = sequelize.define('orderItem', {
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


module.exports = OrderItem;