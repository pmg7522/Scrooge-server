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

    ////////////////////////////////////////// top //////////////////////////////////////////
    // 다른거 구현하고, 다시와서 생각해보자 ! 
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
    ////////////////////////////////////////// Bottom //////////////////////////////////////////

    const bottom = await category.findAll({ 
        include: [{ model: money, attributes: ["id", "cost", "date", "memo"]}],
        where: { userId: data.id }, raw: true })

    const categoryList = await category.findAll({
        attributes: ["id", "categoryname"],
        where: { userId: data.id }})

    return res.status(200).send({ 
        data: { 
            top: { monthlyBudget, monthlyUsed, exMonthlyUsed }, 
            bottom,
            categoryList
        }})
}