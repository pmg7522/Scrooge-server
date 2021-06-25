const { money } = require('../../models');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const { moneyId } = req.body
    const authorization = req.headers["authorization"];
    
    if (!authorization) { 
      return res.status(401).send({ "message": "Unauthorized" })
    }

    await money.destroy({ where: { id: moneyId } })

    res.status(200).send({ message: "삭제 완료" })
}