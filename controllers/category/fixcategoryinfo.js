const { category } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  const data = isAuthorized(req);
  const{ categoryId, categoryname, budget, emoji } = req.body;

  try{
    if(data){
      const categoryInfo = await category.findAll({ where: { userId: data.id }, raw: true })
      const categoryInfos = categoryInfo.filter(el => el.id !== Number(categoryId))
      const newBudget = budget.split(",").join("")
      for(let i = 0; i < categoryInfos.length; i++) {
        if(categoryInfos[i].categoryname === categoryname || categoryInfos[i].emoji === emoji) {
          return res.status(409).send({ message: "중복된 카테고리나 이모지가 존재합니다" })
        }
      }
      await category.update({ categoryname, emoji, budget: newBudget }, { where: { id: categoryId } })
      return res.status(200).send({ message: "카테고리 정보 수정 완료" })
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