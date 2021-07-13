"use strict";

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "yonghui",
          email: "1@gmail.com",
          password: "123456",
          photo: "/upload/ecca8bef873c9965e91f57fa103abbae",
          darkmode: false,
          redirect: "/daily",
          experience: 0,
          createdAt,
          updatedAt,
        },
        {
          username: "chanyang",
          email: "chanyang721@gmail.com",
          password: "123456",
          photo: "/upload/ecca8bef873c9965e91f57fa103abbae",
          darkmode: false,
          redirect: "/daily",
          experience: 0,
          createdAt,
          updatedAt,
        },
        {
          username: "solheee",
          email: "solheee@gmail.com",
          password: "123456",
          photo: "/upload/ecca8bef873c9965e91f57fa103abbae",
          darkmode: false,
          redirect: "/daily",
          experience: 0,
          createdAt,
          updatedAt,
        },
        {
          username: "pmg7522",
          email: "pmg7522@gmail.com",
          password: "123456",
          photo: "/upload/ecca8bef873c9965e91f57fa103abbae",
          darkmode: false,
          redirect: "/daily",
          experience: 0,
          createdAt,
          updatedAt,
        },
        {
          username: "김코딩",
          email: "scrooge@gmail.com",
          password: "123456",
          photo: "/upload/ecca8bef873c9965e91f57fa103abbae",
          darkmode: false,
          redirect: "/daily",
          experience: 0,
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
