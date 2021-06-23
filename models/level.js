'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.level.hasMany(models.user_level, { foreignKey: "levelId" })
    }
  };
  level.init({
    level: DataTypes.INTEGER,
    theme: DataTypes.BOOLEAN,
    dataexplore: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'level',
  });
  return level;
};