const { category } = require('../../models');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const{ categoryname, budget } = req.body;

    const authorization = req.headers["authorization"];
  
    if (!authorization) { 
      return res.status(401).send({ "message": "Unauthorized" })
    }
    
    const token = authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    await category.create({ categoryname, budget, userId: data.id })

    return res.status(201).send({ "message": "생성 완료" })
}