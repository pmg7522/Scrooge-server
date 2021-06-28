const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  const data = isAuthorized(req);

  if(data){
    const { cost, memo, date, categoryname } = req.body;
  
    const categoryInfo = await category.findOne({ where: { categoryname }, raw: true});
    const categoryId = categoryInfo.id;
  
    await money.findOne({ where: { userId: data.id } });
    await money.create({ cost, memo, date, userId: data.id, categoryId });
  
    return res.status(201).send({ "message": "생성 완료" });
  }
  else{
    console.log(err);
    return res.status(500).send({ message: "We Don't Know" });
  }
}