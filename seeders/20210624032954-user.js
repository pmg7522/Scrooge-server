'use strict';

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('users', [
      {
        username: 'yonghui',
        email: "@gmail.com",
        password: "123456",
        photo: "/upload/",
        darkmode: false,
        redirect: "/daily",
        experience: 0,
        createdAt,
        updatedAt,
      },
      {
        username: 'chanyang',
        email: "chanyang721@gmail.com",
        password: "123456",
        photo: "/upload/",
        darkmode: false,
        redirect: "/daily",
        experience: 0,
        createdAt,
        updatedAt,
      },
      {
        username: 'solheee',
        email: "solheee@gmail.com",
        password: "123456",
        photo: "/upload/",
        darkmode: false,
        redirect: "/daily",
        experience: 0,
        createdAt,
        updatedAt,
      },
      {
        username: 'pmg7522',
        email: "pmg7522@gmail.com",
        password: "123456",
        photo: "/upload/",
        darkmode: false,
        redirect: "/daily",
        experience: 0,
        createdAt,
        updatedAt,
      },
      {
        username: '김코딩',
        email: "@gmail.com",
        password: "123456",
        photo: "/upload/",
        darkmode: false,
        redirect: "/daily",
        experience: 0,
        createdAt,
        updatedAt,
      }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  }
};
