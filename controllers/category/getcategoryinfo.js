const { category } = require('../../models');
const { isAuthorized } = require("../functions");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  const data = isAuthorized(req);
  
  if(data){
      const{ categoryname, budget } = req.body;

      await category.create({ categoryname, budget, userId: data.id });
      
      return res.status(201).send({ "message": "생성 완료" });
    }
    else{
      console.log(err);
      return res.status(500).send({ message: "We Don't Know" });
    }
}