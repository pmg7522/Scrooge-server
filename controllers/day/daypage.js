const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const data = isAuthorized(req);

    const moneyData = await money.findOne({ where: { userId: data.id } });
    if(!moneyData){
        return res.status(404).send({ message: "카테고리 정보나 지출 정보가 없습니다." });
    }

    if(data){
        let month = new Date().getMonth()
        const categoryInfos = await category.findAll({
            attributes: ["budget", "createdAt"],
            include: [{ model: money, attributes: ["cost"], raw: true }],
            where: { userId: data.id }
        })
    
        const categorymonth = categoryInfos.filter(el => el.dataValues.createdAt.getMonth() === month);
        const categoryexmonth = categoryInfos.filter(el => el.dataValues.createdAt.getMonth() === month - 1);
    
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
    
        const bottom = await category.findAll({ 
            include: [{ model: money, attributes: ["id", "cost", "date", "memo"]}],
            where: { userId: data.id }, raw: true });
    
        const categoryList = await category.findAll({
            attributes: ["id", "categoryname"],
            where: { userId: data.id }});
    
        return res.status(200).send({ 
            data: { 
                top: { monthlyBudget, monthlyUsed, exMonthlyUsed }, 
                bottom,
                categoryList
            }});
    }
    else{
        console.log(err);
        return res.status(500).send({ message: "We Don't Know" });
    }
}