const { category } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  try{
    const data = isAuthorized(req);
    
    if(data){
        const{ categoryname, budget, emoji } = req.body;
        const newBudget = budget.split(",").join("")
    
        await category.create({ categoryname, budget: newBudget, emoji ,userId: data.id });
        
        return res.status(201).send({ "message": "생성 완료" });
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