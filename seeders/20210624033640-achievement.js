"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "achievements",
      [
        {
          scrooge: "0",
          leastspend: "0",
          userId: 1,
          createdAt,
          updatedAt,
        },
        {
          scrooge: "0",
          leastspend: "0",
          userId: 2,
          createdAt,
          updatedAt,
        },
        {
          scrooge: "0",
          leastspend: "0",
          userId: 3,
          createdAt,
          updatedAt,
        },
        {
          scrooge: "0",
          leastspend: "0",
          userId: 4,
          createdAt,
          updatedAt,
        },
        {
          scrooge: "0",
          leastspend: "0",
          userId: 5,
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("achievements", null, {});
  },
};
