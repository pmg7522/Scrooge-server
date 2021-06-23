'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(models.money, { foreignKey: "userId" })
      models.user.hasMany(models.user_level, { foreignKey: "userId" })
      models.user.hasMany(models.achievement, { foreignKey: "userId" })
      models.user.hasMany(models.category, { foreignKey: "userId" })
    }
  };
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    dark: DataTypes.BOOLEAN,
    redirect: DataTypes.STRING,
    exp: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};