'use strict';

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //  * Add seed commands here.
    //  *
    //  * Example:
     await queryInterface.bulkInsert('categories', [{
        categoryname: 'foods',
        budget: "1",
        userId: "1",
        createdAt,
        updatedAt,
     }, {
        categoryname: 'play',
        budget: "10",
        userId: "1",
        createdAt,
        updatedAt,
     }, {
      categoryname: 'life',
      budget: "10",
      userId: "1",
      createdAt,
      updatedAt,
   }, {
    categoryname: 'clothes',
    budget: "10",
    userId: "1",
    createdAt,
    updatedAt,
 }, {
  categoryname: 'foods',
  budget: "10",
  userId: "2",
  createdAt,
  updatedAt,
 }, {
  categoryname: 'play',
  budget: "100",
  userId: "2",
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
     await queryInterface.bulkDelete('categories', null, {});
  }
};
