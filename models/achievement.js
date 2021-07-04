'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class achievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.achievement.belongsTo(models.user, { foreignKey: "userId", onDelete: 'CASCADE' })
    }
  };
  achievement.init({
    scrooge: DataTypes.INTEGER,
    leastspend: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'achievement',
  });
  return achievement;
};