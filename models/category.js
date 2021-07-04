'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.category.belongsTo(models.user, { foreignKey: "userId", onDelete: 'CASCADE' })
      models.category.hasMany(models.money, { foreignKey: "categoryId" })
    }
  };
  category.init({
    categoryname: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    emoji: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};