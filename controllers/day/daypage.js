const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
    const data = isAuthorized(req);

    if(data){
        let month = new Date().getMonth()
        const categoryInfos = await category.findAll({
            attributes: ["budget", "createdAt"],
            include: [{ model: money, attributes: ["cost"], raw: true }],
            where: { userId: data.id }
        })
    
        let monthlyUsed = 0;
        let exMonthlyUsed = 0;
        let monthlyBudget = 0;

        if(!categoryInfos){
            return res.status(200).send({ 
                data: { 
                    top: [], 
                    bottom: [],
                    categoryList: []
                }});
        }
        else{
            const categorymonth = categoryInfos.filter(el => el.dataValues.createdAt.getMonth() === month);
            const categoryexmonth = categoryInfos.filter(el => el.dataValues.createdAt.getMonth() === month - 1);

            if(categorymonth.length !== 0){
                if(categorymonth[0].dataValues.money.length === 0){
                    monthlyUsed = 0;
                }
                else{
                    const costs = categorymonth.map(el => el.dataValues.money[0].cost)
                    for(let i = 0; i < costs.length; i++){
                        monthlyUsed = monthlyUsed + costs[i]
                    }

                    const budgets = categorymonth.map(el => el.dataValues.budget)
                    for(let i = 0; i < budgets.length; i++){
                        monthlyBudget = monthlyBudget + budgets[i]
                    }
                }
            }

            if(categoryexmonth.length !== 0){
                if(categoryexmonth[0].dataValues.money.length === 0){
                    exMonthlyUsed = 0;
                }
                else{
                    const exCosts = categoryexmonth.map(el => el.dataValues.money[0].cost)
                    for(let i = 0; i < exCosts.length; i++){
                        exMonthlyUsed = exMonthlyUsed + exCosts[i]
                    }
                }
            }

            if(categorymonth.length !== 0 && categoryexmonth.length !== 0){
                if(categorymonth[0].dataValues.money.length === 0 && categoryexmonth[0].dataValues.money.length === 0){
                    monthlyUsed = 0;
                    exMonthlyUsed = 0;
                }
                else{
                    const costs = categorymonth.map(el => el.dataValues.money[0].cost)
                    for(let i = 0; i < costs.length; i++){
                        monthlyUsed = monthlyUsed + costs[i]
                    }

                    const budgets = categorymonth.map(el => el.dataValues.budget)
                    for(let i = 0; i < budgets.length; i++){
                        monthlyBudget = monthlyBudget + budgets[i]
                    }
                    
                    const exCosts = categoryexmonth.map(el => el.dataValues.money[0].cost)
                    for(let i = 0; i < exCosts.length; i++){
                        exMonthlyUsed = exMonthlyUsed + exCosts[i]
                    }
                }
            }
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