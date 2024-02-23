require('dotenv').config()

module.exports = {
  USER: process.env.USERNAME || '',
  HOST: process.env.HOST || '',
  DB: process.env.AUTHDATABASE || '',
  PASSWORD: process.env.PASSWORD || '',
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};