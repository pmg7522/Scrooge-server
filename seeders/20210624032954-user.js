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
        username: 'chanyang',
        email: "1",
        password: "1",
        photo: "/uploads/7b358d3e62127cacc4a1340ea12869d4",
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
        photo: "/uploads/7b358d3e62127cacc4a1340ea12869d4",
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
        photo: "/uploads/7b358d3e62127cacc4a1340ea12869d4",
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
