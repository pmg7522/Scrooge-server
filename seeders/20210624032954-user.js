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
        email: "1@gmail.com", 
        password: "123456",
        photo: "/upload/c3195109635ceae9245b3e023ed673c8",
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
        photo: "/upload/c3195109635ceae9245b3e023ed673c8",
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
        photo: "/upload/c3195109635ceae9245b3e023ed673c8",
        darkmode: false,
        redirect: "/daily",
        experience: 0,
        createdAt,
        updatedAt,
      },
      {
        username: 'pmg7522',
        email: "alsrbsms567@naver.com",
        password: "123456",
        photo: "/upload/c3195109635ceae9245b3e023ed673c8",
        darkmode: false,
        redirect: "/daily",
        experience: 0,
        createdAt,
        updatedAt,
      },
      {
        username: '김코딩',
        email: "scrooge@gmail.com",
        password: "123456",
        photo: "/upload/c3195109635ceae9245b3e023ed673c8",
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
