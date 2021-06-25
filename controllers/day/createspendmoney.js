const { money, category } = require('../../models');
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

    const { cost, memo, date, categoryname } = req.body

    const categoryInfo = await category.findOne({ where: { categoryname }, raw: true})
    const categoryId = categoryInfo.id

    await money.findOne({ where: { userId: data.id } })
    await money.create({ cost, memo, date, userId: data.id ,categoryId })

    return res.status(201).send({ "message": "생성 완료" })
}