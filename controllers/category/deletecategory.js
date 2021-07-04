const { category, money } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  try{
    const data = isAuthorized(req);
  
    if(data){
      const { categoryname } = req.body;
  
      const noneCategory = await category.findOne({ where: { categoryname: "지정되지 않은 카테고리", userId: data.id } });
      console.log(noneCategory)
      const noneCategoryId = noneCategory.dataValues.id;
      const noneCategoryName = noneCategory.dataValues.categoryname;
  
      const categoryData = await category.findOne({ where: { categoryname, userId: data.id } });
      
      const categoryDataId = categoryData.dataValues.id;
      
      await money.update({ categoryId: noneCategoryId }, { where: { categoryId: categoryDataId } });
  
      await category.destroy({ where: { categoryname, userId: data.id } });
      
      return res.status(205).send({ "message": `카테고리 삭제 완료, 삭제된 카테고리의 지출 정보의 카테고리는 ${noneCategoryName}로 변경됩니다.` });
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