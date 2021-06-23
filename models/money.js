'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class money extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.money.belongsTo(models.category, { foreignKey: "categoryId", onDelete: 'CASCADE' })
      models.money.belongsTo(models.user, { foreignKey: "userId", onDelete: 'CASCADE' })
    }
  };
  money.init({
    cost: DataTypes.INTEGER,
    memo: DataTypes.STRING,
    date: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'money',
  });
  return money;
};