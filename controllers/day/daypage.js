const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
    try{
        const data = isAuthorized(req);
    
        if(data){
            let month = new Date().getMonth()
            const categoryInfos = await category.findAll({
                attributes: ["budget"],
                include: [{ model: money, attributes: ["cost", "createdAt"] }],
                where: { userId: data.id } , raw: true });

            const bottom = await category.findAll({ 
                include: [{ model: money, attributes: ["id", "cost", "date", "memo"]}],
                where: { userId: data.id }, raw: true });

            const categoryList = await category.findAll({
                attributes: ["id", "categoryname"],
                where: { userId: data.id }});

            let monthlyUsed = 0;
            let exMonthlyUsed = 0;
            let monthlyBudget = 0;

            if(!categoryInfos){
                return res.status(200).send({ 
                    data: { 
                        top: [],
                        bottom: [],
                        categoryList
                    }});
            }
            if(!categoryInfos[0]["money.cost"]){
                return res.status(200).send({ 
                    data: { 
                        top: [],
                        bottom: [],
                        categoryList
                    }});
            }
            else{
                const categorymonth = categoryInfos.filter(el => el["money.createdAt"].getMonth() === month);
                const categoryexmonth = categoryInfos.filter(el => el["money.createdAt"].getMonth() === month - 1);
    
                if(categorymonth.length !== 0){
                    if(categorymonth[0]["money.cost"] === undefined){
                        monthlyUsed = 0;
                        monthlyBudget = 0;
                    }
                    else{
                        const costs = categorymonth.map(el => el["money.cost"])
                        for(let i = 0; i < costs.length; i++){
                            monthlyUsed = monthlyUsed + costs[i]
                        }
    
                        const budgets = categorymonth.map(el => el.budget)
                        for(let i = 0; i < budgets.length; i++){
                            monthlyBudget = monthlyBudget + budgets[i]
                        }
                    }
                }
    
                if(categoryexmonth.length !== 0){
                    if(categoryexmonth[0]["money.cost"] === undefined){
                        exMonthlyUsed = 0;
                    }
                    else{
                        const exCosts = categoryexmonth.map(el => el["money.cost"])
                        for(let i = 0; i < exCosts.length; i++){
                            exMonthlyUsed = exMonthlyUsed + exCosts[i]
                        }
                    }
                }
    
                if(categorymonth.length !== 0 && categoryexmonth.length !== 0){
                    if(categorymonth[0].money.length === 0 && categoryexmonth[0].money.length === 0){
                        monthlyBudget = 0;
                        monthlyUsed = 0;
                        exMonthlyUsed = 0;
                    }
                    else{
                        const costs = categorymonth.map(el => el["money.cost"])
                        for(let i = 0; i < costs.length; i++){
                            monthlyUsed = monthlyUsed + costs[i]
                        }
    
                        const budgets = categorymonth.map(el => el.budget)
                        for(let i = 0; i < budgets.length; i++){
                            monthlyBudget = monthlyBudget + budgets[i]
                        }
                        
                        const exCosts = categoryexmonth.map(el => el["money.cost"])
                        for(let i = 0; i < exCosts.length; i++){
                            exMonthlyUsed = exMonthlyUsed + exCosts[i]
                        }
                    }
                }
            }
        
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
    catch(err){
        console.log(err)
    }
}