const { category } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  try{
    const data = isAuthorized(req);
    const{ categoryname, budget, emoji } = req.body;

    if(data){
        if (!emoji) {
          const newBudget = budget.split(",").join("")
          await category.create({ categoryname, budget: newBudget ,userId: data.id });
          return res.status(201).send({ "message": "생성 완료" });
        } 
        else {
          const newBudget = budget.split(",").join("")
          await category.create({ categoryname, budget: newBudget, emoji, userId: data.id });
          return res.status(201).send({ "message": "생성 완료" });
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