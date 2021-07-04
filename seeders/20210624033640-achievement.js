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
     await queryInterface.bulkInsert('achievements', [{
      scrooge: 1,
      leastspend: null,
      userId: "1",
      createdAt,
      updatedAt,
   },{
    scrooge: 32,
    leastspend: null,
    userId: 2,
    createdAt,
    updatedAt,
   },{
    scrooge: "13",
    leastspend: null,
    userId: "3",
    createdAt,
    updatedAt,
   }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('achievements', null, {});
  }
};
