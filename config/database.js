const { Sequelize } = require("sequelize");
require("dotenv").config();
let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(process.env.PSQL_URI, {
    dialectOptions: { ssl: false },
  });
  console.log("production set");
} else {
  console.log("developer set");
  sequelize = new Sequelize("e-shop", "postgres", process.env.DB_PW, {
    host: "db",
    dialect: "postgres",
    logging: false,
  });
}

module.exports = sequelize;
