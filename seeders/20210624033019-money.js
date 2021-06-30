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
     await queryInterface.bulkInsert('money', [{
        cost: "12000",
        memo: "피자",
        date: "2021-05-15",
        userId: "1",
        categoryId: "1",
        createdAt,
        updatedAt,
     },{
        cost: "20000",
        memo: "치킨",
        date: "2021-06-18",
        userId: "1",
        categoryId: "1",
        createdAt,
        updatedAt,
     },{
        cost: "8000",
        memo: "냉면",
       date: "2021-06-18",
       userId: "1",
       categoryId: "1",
        createdAt,
        updatedAt,
    },{
       cost: "32000",
       memo: "옷",
       date: "2021-06-01",
       userId: "1",
       categoryId: "2",
       createdAt,
       updatedAt,
   },{
    cost: "5000",
    memo: "졸리 간식",
    date: "2021-06-01",
    userId: "1",
    categoryId: "2",
    createdAt,
    updatedAt,
  },{
    cost: "20000",
    memo: "졸리 장난감",
    date: "2021-06-10",
    userId: "1",
    categoryId: "2",
    createdAt,
    updatedAt,
},{
  cost: "15000",
  memo: "운동",
  date: "2021-06-20",
  userId: "1",
  categoryId: "3",
  createdAt,
  updatedAt,
},{
  cost: "20000",
  memo: "운동",
  date: "2021-06-20",
  userId: "1",
  categoryId: "3",
  createdAt,
  updatedAt,
},{
  cost: "22000",
  memo: "택시",
  date: "2021-06-29",
  userId: "1",
  categoryId: "3",
  createdAt,
  updatedAt,
},{
  cost: "2000",
  memo: "음료수",
  date: "2021-05-29",
  userId: "2",
  categoryId: "4",
  createdAt,
  updatedAt,
},{
  cost: "1000",
  memo: "물",
  date: "2021-06-18",
  userId: "2",
  categoryId: "4",
  createdAt,
  updatedAt,
},{
  cost: "5000",
  memo: "오징어땅콩",
 date: "2021-06-05",
 userId: "2",
 categoryId: "4",
  createdAt,
  updatedAt,
},{
 cost: "52000",
 memo: "선풍기",
 date: "2021-06-20",
 userId: "2",
 categoryId: "5",
 createdAt,
 updatedAt,
},{
cost: "49000",
memo: "고슴도치 분양",
date: "2021-06-21",
userId: "2",
categoryId: "5",
createdAt,
updatedAt,
},{
cost: "820000",
memo: "컴퓨터",
date: "2021-06-10",
userId: "2",
categoryId: "5",
createdAt,
updatedAt,
},{
cost: "50000",
memo: "통신비",
date: "2021-06-15",
userId: "2",
categoryId: "6",
createdAt,
updatedAt,
},{
cost: "100000",
memo: "기름값",
date: "2021-06-15",
userId: "2",
categoryId: "6",
createdAt,
updatedAt,
},{
cost: "500000",
memo: "월세",
date: "2021-06-15",
userId: "2",
categoryId: "6",
createdAt,
updatedAt,
},{
  cost: "30000",
  memo: "회",
  date: "2021-05-29",
  userId: "3",
  categoryId: "7",
  createdAt,
  updatedAt,
},{
  cost: "15000",
  memo: "오징어",
  date: "2021-05-29",
  userId: "3",
  categoryId: "7",
  createdAt,
  updatedAt,
},{
  cost: "5000",
  memo: "쥐포",
 date: "2021-06-05",
 userId: "3",
 categoryId: "7",
  createdAt,
  updatedAt,
},{
 cost: "2000",
 memo: "노래방",
 date: "2021-06-20",
 userId: "3",
 categoryId: "8",
 createdAt,
 updatedAt,
},{
cost: "49000",
memo: "동물원",
date: "2021-06-21",
userId: "3",
categoryId: "8",
createdAt,
updatedAt,
},{
cost: "100000",
memo: "놀이공원",
date: "2021-06-25",
userId: "3",
categoryId: "8",
createdAt,
updatedAt,
},{
cost: "55000",
memo: "렌트비",
date: "2021-06-15",
userId: "3",
categoryId: "9",
createdAt,
updatedAt,
},{
cost: "500000",
memo: "침대",
date: "2021-06-15",
userId: "3",
categoryId: "9",
createdAt,
updatedAt,
},{
cost: "20000",
memo: "이불",
date: "2021-06-15",
userId: "3",
categoryId: "9",
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
     await queryInterface.bulkDelete('money', null, {});
  }
};
