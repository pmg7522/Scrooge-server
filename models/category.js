"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    static associate(models) {
      models.category.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      models.category.hasMany(models.money, { foreignKey: "categoryId" });
    }
  }

  category.init(
    {
      categoryname: DataTypes.STRING,
      budget: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      emoji: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
    }
  );
  return category;
};
