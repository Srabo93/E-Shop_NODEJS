const { Sequelize } = require("sequelize");

let sequelize;

if(process.env.NODE_ENV === 'production'){
   sequelize = new Sequelize(process.env.PSQL_URI)
}else{
   sequelize = new Sequelize("E-Shop", "root", "password", {
  host: "db",
  dialect: "postgres",
  logging: false,
  })
}

module.exports = sequelize;
