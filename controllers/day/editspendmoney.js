const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  try{
    const data = isAuthorized(req);
    
    const { moneyId, cost, memo, emoji, date } = req.body;

      if (data) {
      const newCost = cost.split(",").join("")

      const categoryInfo = await category.findOne({ where: { userId: data.id, emoji }, raw: true});
      const newCategoryId = categoryInfo.id
      await money.update({ cost: newCost, memo, date, categoryId: newCategoryId }, { where: { id: moneyId }});
  
      return res.status(200).send({ message: "수정 완료" });
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