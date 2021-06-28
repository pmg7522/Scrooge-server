const { category, money } = require('../../models');
const { isAuthorized } = require("../functions");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  const data = isAuthorized(req);

  if(data){
    const { categoryname } = req.body;

    const noneCategory = await category.findOne({ where: { categoryname: "지정되지 않은 카테고리", userId: data.id } });
    const noneCategoryId = noneCategory.dataValues.id;

    const categoryData = await category.findOne({ where: { categoryname } });
    const categoryDataId = categoryData.dataValues.id;

    await money.update({ categoryId: noneCategoryId }, { where: { categoryId: categoryDataId } });

    await category.destroy({ where: { categoryname } });
    
    return res.status(205).send({ "message": '카테고리 삭제 완료' });
  }
  else{
    console.log(err);
    return res.status(500).send({ message: "We Don't Know" });
  }
}