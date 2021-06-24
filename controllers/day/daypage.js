const { money, category } = require('../../models');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sequelize = require("sequelize")
dotenv.config();

module.exports = async (req, res) => {
    // 이번달 총 예산, 이번달 사용한 금액, 이전달 사용한 금액
    // 해당 유저의 모든 지출내역 money테이블 (아이디, 지출금액, 메모, 날자), 카테고리테이블(아이디, 카테고리 이름)
    // 유저 정보는 있다.
    const authorization = req.headers["authorization"];
  
    if (!authorization) { 
      return res.status(401).send({ "message": "Unauthorized" })
    }
    
    const token = authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    // findAll -> include: [ model: money, attributes: ["id", "cost", "memo", "date"]]
    // data.id 와 같은 money 테이블, 카테고리 테이블의 정보를 모두 가져온다. 
    let month = new Date().getMonth()

    const categoryInfos = await category.findAll({
        attributes: ["budget", "createdAt"],
        include: [{ model: money, attributes: ["cost"], raw: true }],
        where: { userId: data.id }
    })

    const categorymonth = categoryInfos.filter(el => el.dataValues.createdAt.getMonth() === month)
    const categoryexmonth = categoryInfos.filter(el => el.dataValues.createdAt.getMonth() === month - 1)

    let monthlyBudget = 0;
    const budgets = categorymonth.map(el => el.dataValues.budget)
    for(let i = 0; i < budgets.length; i++){
        monthlyBudget = monthlyBudget + budgets[i]
    }

    let monthlyUsed = 0;
    const costs = categorymonth.map(el => el.dataValues.money[0].cost)
    for(let i = 0; i < costs.length; i++){
        monthlyUsed = monthlyUsed + costs[i]
    }

    let exMonthlyUsed = 0;
    const exCosts = categoryexmonth.map(el => el.dataValues.money[0].cost)
    for(let i = 0; i < exCosts.length; i++){
        exMonthlyUsed = exMonthlyUsed + exCosts[i]
    }

    const categoryInfo = await category.findAll({
        include: [{ model: money, attributes: ["memo","cost","date"], raw: true }],
        where: { userId: data.id }
    })

    const categoryData = categoryInfo.map(el => el.dataValues)

    const bottom = [];
    for(let i = 0; i < categoryData.length; i++){
        const bottomData = await category.findAll({
            include: [{ model: money, attributes: ["memo","cost","date"], raw: true }],
            where: { userId: data.id }
        })

        const bottomDatas = {};
        bottomDatas.id = bottomData[i].id
        bottomDatas.categoryname = bottomData[i].categoryname
        bottomDatas.cost = bottomData[i].money[0].cost
        bottomDatas.memo = bottomData[i].money[0].memo
        bottomDatas.date = bottomData[i].money[0].date
        bottom.push(bottomDatas)
    }

    return res.status(200).send({ data: { top: { monthlyBudget, monthlyUsed, exMonthlyUsed }, bottom }})
}