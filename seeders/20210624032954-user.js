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
      username: 'John Doe',
      email: false,
      password: "1234",
      photo: "11",
      darkmode: false,
      redirect: "/",
      experience: 0,
      createdAt,
      updatedAt,
      },
      {
        username: 'chanyang',
        email: false,
        password: "1234",
        photo: "11111",
        darkmode: false,
        redirect: "/",
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
     await queryInterface.bulkDelete('user', null, {});
  }
};
