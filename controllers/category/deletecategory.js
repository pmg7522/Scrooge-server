const { category, money } = require('../../models');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const authorization = req.headers["authorization"];
  
    if (!authorization) { 
      return res.status(401).send({ "message": "Unauthorized" })
    }

    const token = authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const { categoryname } = req.body

    const noneCategory = await category.findOne({ where: { categoryname: "지정되지 않은 카테고리", userId: data.id } })
    const noneCategoryId = noneCategory.dataValues.id

    const categoryData = await category.findOne({ where: { categoryname } })
    const categoryDataId = categoryData.dataValues.id

      await money.update({ categoryId: noneCategoryId } ,{ where: { categoryId: categoryDataId } })

      await category.destroy({ where: { categoryname } })
    
    return res.status(205).send({ "message": '카테고리 삭제 완료' })
}