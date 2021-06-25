require("dotenv").config();

module.exports = {
  "development": {
    "username": "root",
    "password": "alsrb12",
    "database": "scrooge",
    "host": "127.0.0.1",
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
