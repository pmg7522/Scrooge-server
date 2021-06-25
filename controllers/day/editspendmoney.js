const { money, category } = require('../../models');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const { cost, memo, categoryId } = req.body
  
    const authorization = req.headers["authorization"];
    
    if (!authorization) { 
      return res.status(401).send({ "message": "Unauthorized" })
    }
    
    const token = authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    
    if (data) {
    const categoryInfo = await category.findOne({ where: { id: categoryId }, raw: true})
    const categoryInfoId = categoryInfo.id
    const categoryName = categoryInfo.categoryname
    
    await money.update({ cost, memo }, { where: { categoryId: categoryInfoId } })
  
    const newMoneyInfo = await money.findOne({ where: { categoryId: categoryInfoId, userId: data.id }, raw: true })
    const newMoneyCost = newMoneyInfo.cost
    const newMoneyMemo = newMoneyInfo.memo
    const newMoneyDate = newMoneyInfo.date

    return res.status(200).send({ 
        message: "수정 완료", 
          data: { categoryname: categoryName , cost: newMoneyCost, memo: newMoneyMemo, date: newMoneyDate }
    })
    }
}