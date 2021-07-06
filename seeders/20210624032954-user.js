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
        username: 'scrooge',
        email: "scrooge@gmail.com",
        password: "scrooge",
        photo: "/uploads/c3195109635ceae9245b3e023ed673c8",
        darkmode: false,
        redirect: "/daily",
        experience: 0,
        createdAt,
        updatedAt,
      },
      {
        username: 'solheee',
        email: "2",
        password: "2",
        photo: "/uploads/c3195109635ceae9245b3e023ed673c8",
        darkmode: false,
        redirect: "/daily",
        experience: 0,
        createdAt,
        updatedAt,
      },
      {
        username: 'yonghwi',
        email: "3",
        password: "3",
        photo: "/uploads/c3195109635ceae9245b3e023ed673c8",
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
