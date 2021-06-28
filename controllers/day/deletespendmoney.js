const { money } = require('../../models');
const{ isAuthorized } = require("../functions");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  const data = isAuthorized(req);
  
  if(data){
    const { moneyId } = req.body
  
    await money.destroy({ where: { id: moneyId } })
  
    res.status(200).send({ message: "삭제 완료" })
  }
  else{
    console.log(err)
    return res.status(500).send({ message: "Internal Server Error" })
  }
}