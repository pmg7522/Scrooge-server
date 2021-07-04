'use strict';

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //  * Add seed commands here.
    //  *
    //  * Example:
     await queryInterface.bulkInsert('categories', [
      {
         categoryname: '지정되지 않은 카테고리',
         budget: "0",
         userId: "1",
         emoji: "",
         createdAt,
         updatedAt,
      }, {
        categoryname: '식비',
        budget: "1000000",
        userId: "1",
        emoji: "",
        createdAt,
        updatedAt,
     }, {
        categoryname: '여가비',
        budget: "400000",
        userId: "1",
        emoji: "",
        createdAt,
        updatedAt,
     }, {
      categoryname: '생활비',
      budget: "600000",
      userId: "1",
      emoji: "",
      createdAt,
      updatedAt,
   }, {
    categoryname: '식비',
    budget: "500000",
    userId: "2",
    emoji: "",
    createdAt,
    updatedAt,
 }, {
  categoryname: '여가비',
  budget: "1000000",
  userId: "2",
  emoji: "",
  createdAt,
  updatedAt,
 }, {
  categoryname: '생활비',
  budget: "200000",
  userId: "2",
  emoji: "",
  createdAt,
  updatedAt,
}, {
   categoryname: '식비',
   budget: "100000",
   userId: "3",
   emoji: "",
   createdAt,
   updatedAt,
}, {
 categoryname: '여가비',
 budget: "500000",
 userId: "3",
 emoji: "",
 createdAt,
 updatedAt,
}, {
 categoryname: '생활비',
 budget: "1000000",
 userId: "3",
 emoji: "",
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
