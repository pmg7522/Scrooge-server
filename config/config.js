require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": "scrooge",
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "dialect": "mysql"

  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "1q2w",
    "database": "scrooge",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}