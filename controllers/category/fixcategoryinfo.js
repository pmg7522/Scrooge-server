const { category } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  const data = isAuthorized(req);
  
  try{
    if(data){
      const{ categoryId, categoryname, budget } = req.body;
      const newBudget = budget.split(",").join("")
  
      await category.update({ categoryname, budget: newBudget }, { where: { id: categoryId } });
  
      return res.status(200).send({ "message": "카테고리 정보 수정 완료" });
    }
    else{
      console.log(err);
      return res.status(500).send({ message: "We Don't Know" });
    }
  }
  catch(err){
    console.log(err);
  }
}