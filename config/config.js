// 배포 변경별로 설정을 다르게 해줄 수 있음
require('dotenv').config();

module.exports = {
  local: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "nodejs",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  },
  development: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "nodejs",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  },
  production: {
    username: "root",
    password: process.env.SEQUELIZE_PASSWORD,
    database: "nodejs",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false
  }
}