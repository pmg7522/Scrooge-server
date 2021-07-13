"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "user_levels",
      [
        {
          userId: "1",
          levelId: "1",
          createdAt,
          updatedAt,
        },
        {
          userId: "2",
          levelId: "1",
          createdAt,
          updatedAt,
        },
        {
          userId: "3",
          levelId: "1",
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_levels", null, {});
  },
};
