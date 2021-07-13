"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class money extends Model {
    static associate(models) {
      models.money.belongsTo(models.user, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      models.money.belongsTo(models.category, { foreignKey: "categoryId" });
    }
  }

  money.init(
    {
      cost: DataTypes.INTEGER,
      memo: DataTypes.STRING,
      date: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "money",
    }
  );
  return money;
};
