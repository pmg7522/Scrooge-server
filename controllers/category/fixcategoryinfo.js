const { category } = require('../../models');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const{ categoryId, categoryname, budget } = req.body;

    const authorization = req.headers["authorization"];
  
    if (!authorization) { 
      return res.status(401).send({ "message": "Unauthorized" })
    }

    await category.update({ categoryname, budget }, { where: { id: categoryId }})

    return res.status(200).send({ "message": "카테고리 정보 수정 완료" })
}