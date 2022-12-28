const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('E-Shop', 'root', 'password', {
    host: 'db',
    dialect: 'mysql',
});

module.exports = sequelize;