const { category } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  try{
    const data = isAuthorized(req);
    const{ categoryname, budget, emoji } = req.body;

    const categoryinfo = await category.findOne({ where: { userId: data.id, categoryname } })
    if (categoryinfo) {
      return res.status(409).send({ message: "중복된 카테고리가 존재합니다" })
    }

    if(data){
      if(!budget) {
        if (!emoji) {
          await category.create({ categoryname, userId: data.id });
          return res.status(201).send({ "message": "생성 완료" });
        } 
        else {
          await category.create({ categoryname, emoji, userId: data.id });
          return res.status(201).send({ "message": "생성 완료" });
        }
      }
      else {
        if (!emoji) {
          const newBudget = budget.split(",").join("")
          await category.create({ categoryname, budget: newBudget, userId: data.id });
          return res.status(201).send({ "message": "생성 완료" });
        } 
        else {
          const newBudget = budget.split(",").join("")
          await category.create({ categoryname, budget: newBudget, emoji, userId: data.id });
          return res.status(201).send({ "message": "생성 완료" });
        }
      }
    }
    else{
      console.log(err);
      return res.status(500).send({ message: "We Don't Know" });
    }
  }
  catch(err){
    console.log(err)
  }
}