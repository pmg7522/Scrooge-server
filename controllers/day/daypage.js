const { user, money, achievement, category, level } = require('../../models');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    // 이번달 총 예산, 이번달 사용한 금액, 이전달 사용한 금액
    // 해당 유저의 모든 지출내역 money테이블 (아이디, 지출금액, 메모, 날자), 카테고리테이블(아이디, 카테고리 이름)
    // 유저 정보는 있다.
    // 
    const authorization = req.headers["authorization"];
  
    if (!authorization) { 
      return res.status(401).send({ "message": "Unauthorized" })
    }
    
    const token = authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    console.log(data.id)
    // findAll -> include: [ model: money, attributes: ["id", "cost", "memo", "date"]]
    // data.id 와 같은 money 테이블, 카테고리 테이블의 정보를 모두 가져온다. 
    const test = await money.findAll({
        include: [{ model: category, attributes: ["id", "categoryname"] }],
    })
    const test1 = await money.findAll({ where: { userId: data.id } })
    console.log(test)
    console.log(test1)
    
}