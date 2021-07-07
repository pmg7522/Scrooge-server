const { user, money, category } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  try{
    const data = isAuthorized(req);

    if(data){
      const { cost, memo, date, categoryname } = req.body;
      const newCost = cost.split(",").join("")
  
      const categoryInfo = await category.findOne({ where: { emoji: categoryname, userId: data.id }, raw: true});
      const categoryId = categoryInfo.id;
    
      await money.findOne({ where: { userId: data.id } });
      await money.create({ cost: newCost, memo, date, userId: data.id, categoryId });
      const userInfo = await user.findOne({ where: { id: data.id } })
      await user.update({ experience: userInfo.dataValues.experience + 5 }, { where: { id: data.id }})
    
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