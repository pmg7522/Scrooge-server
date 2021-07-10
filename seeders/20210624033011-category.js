'use strict';

const createdAt = new Date();
const updatedAt = new Date();

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('categories', [
      ////////////////// user 1 Start /////////////////
      {
         categoryname: '지정되지 않은 카테고리',
         budget: "0",
         userId: "1",
         emoji: "grey_question",
         createdAt,
         updatedAt,
      }, {
         categoryname: '식비',
         budget: "1000000",
         userId: "1",
         emoji: "Bento",
         createdAt,
         updatedAt,
      }, {
         categoryname: '여가비',
         budget: "400000",
         userId: "1",
         emoji: "roller_cosater",
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
         categoryname: '고정 지출',
         budget: "500000",
         userId: "2",
         emoji: "",
         createdAt,
         updatedAt,
      }, {
         categoryname: '쇼핑',
         budget: "1000000",
         userId: "1",
         emoji: "",
         createdAt,
         updatedAt,
      }, {
         categoryname: '금융',
         budget: "600000",
         userId: "1",
         emoji: "whale",
         createdAt,
         updatedAt,
      }, {
         categoryname: '교통비',
         budget: "1000000",
         userId: "1",
         emoji: "",
         createdAt,
         updatedAt,
      }, {
         categoryname: '문화생활',
         budget: "400000",
         userId: "1",
         emoji: "",
         createdAt,
         updatedAt,
      }, {
         categoryname: '경조사',
         budget: "600000",
         userId: "1",
         emoji: "",
         createdAt,
         updatedAt,
      ////////////////// user 1 End ///////////////////
      }, {
      ////////////////// user 2 Start /////////////////
         categoryname: '지정되지 않은 카테고리',
         budget: "0",
         userId: "2",
         emoji: "grey_question",
         createdAt,
         updatedAt,
      }, {  
         categoryname: '식비',
         budget: "500000",
         userId: "2",
         emoji: "sushi",
         createdAt,
         updatedAt,
      }, {
         categoryname: '여가비',
         budget: "1000000",
         userId: "2",
         emoji: "golf",
         createdAt,
         updatedAt,
      }, {
         categoryname: '경조사비',
         budget: "100000",
         userId: "2",
         emoji: "",
         createdAt,
         updatedAt,
      }, {
         categoryname: '세금',
         budget: "500000",
         userId: "2",
         emoji: "dollar",
         createdAt,
         updatedAt,
      }, {
         categoryname: '반려동물비',
         budget: "1000000",
         userId: "2",
         emoji: "feet",
         createdAt,
         updatedAt,
      }, {
         categoryname: '보험비',
         budget: "200000",
         userId: "2",
         emoji: "",
         createdAt,
         updatedAt,
      }, {
         categoryname: '해외 파견비',
         budget: "500000",
         userId: "2",
         emoji: "",
         createdAt,
         updatedAt,
      }, {
         categoryname: '해외 숙박비',
         budget: "2000000",
         userId: "2",
         emoji: "hotel",
         createdAt,
         updatedAt,
      }, {
         categoryname: '교제비',
         budget: "100000",
         userId: "2",
         emoji: "books",
         createdAt,
         updatedAt,
      }, {
         categoryname: '모바일 가챠',
         budget: "500000",
         userId: "2",
         emoji: "iphone",
         createdAt,
         updatedAt,
         ////////////////// user 2 End ///////////////////
      }, {
         ////////////////// user 3 Start /////////////////
         categoryname: '지정되지 않은 카테고리',
         budget: "0",
         userId: "3",
         emoji: "grey_question",
         createdAt,
         updatedAt,
      }, {  
         categoryname: '식비',
         budget: "500000",
         userId: "3",
         emoji: "rice",
         createdAt,
         updatedAt,
      }, {
         categoryname: '통신비',
         budget: "1000000",
         userId: "3",
         emoji: "iphone",
         createdAt,
         updatedAt,
      }, {
         categoryname: '교통비',
         budget: "100000",
         userId: "3",
         emoji: "bus",
         createdAt,
         updatedAt,
      }, {
         categoryname: '육아비',
         budget: "500000",
         userId: "3",
         emoji: "baby",
         createdAt,
         updatedAt,
      }, {
         categoryname: '학원비',
         budget: "1000000",
         userId: "3",
         emoji: "school_satchel",
         createdAt,
         updatedAt,
      }, {
         categoryname: '외식',
         budget: "300000",
         userId: "3",
         emoji: "fork_and_knife",
         createdAt,
         updatedAt,
      }, {
         categoryname: '하이패스',
         budget: "500000",
         userId: "3",
         emoji: "car",
         createdAt,
         updatedAt,
      }, {
         categoryname: '카드값',
         budget: "3000000",
         userId: "3",
         emoji: "credit_card",
         createdAt,
         updatedAt,
      }, {
         categoryname: '여행',
         budget: "1000000",
         userId: "3",
         emoji: "airplane",
         createdAt,
         updatedAt,
      }, {
         categoryname: '관리비',
         budget: "500000",
         userId: "3",
         emoji: "house",
         createdAt,
         updatedAt,
      } ], {});
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
