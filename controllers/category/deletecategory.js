const { category } = require('../../models');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const authorization = req.headers["authorization"];
  
    if (!authorization) { 
      return res.status(401).send({ "message": "Unauthorized" })
    }

    const { categoryname } = req.body

    await category.destroy({ where: { categoryname }})
    
    return res.status(205).send({ "message": '카테고리 삭제 완료' })
}