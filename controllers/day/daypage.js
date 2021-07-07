const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");

module.exports = async (req, res) => {

        const data = isAuthorized(req);
    
        if(data){
            let month = new Date().getMonth() + 1
            const categoryInfos = await category.findAll({
                attributes: ["budget"],
                include: [{ model: money, attributes: ["cost", "date"] }],
                where: { userId: data.id } , raw: true });

            let bottom = [];
            const categoryInfo = await category.findAll({ 
                include: [{ model: money, attributes: ["id", "cost", "date", "memo"]}],
                order: [sequelize.col("money.id")],
                where: { userId: data.id }, raw: true });
            for(let i = 0; i < categoryInfo.length; i++){
                if(categoryInfo[i]['money.cost'] === null){
                    continue;
                }
                else{
                    bottom.unshift({ 
                        id: categoryInfo[i].id,
                        emoji: categoryInfo[i].emoji,
                        categoryname: categoryInfo[i].categoryname,
                        moneyId: categoryInfo[i]['money.id'],
                        cost: categoryInfo[i]['money.cost'],
                        date: categoryInfo[i]['money.date'],
                        memo: categoryInfo[i]['money.memo']
                    })
                }
            }
            const categoryBudget = await category.findAll({
                attributes: ["budget"],
                where: { userId: data.id },
                raw: true
            })

            let monthlyUsed = 0;
            let exMonthlyUsed = 0;
            let monthlyBudget = 0;
            
            const budgets = categoryBudget.map(el => el.budget)
            for(let i = 0; i < budgets.length; i++){
                monthlyBudget = monthlyBudget + budgets[i]
            }

            const categoryLists = await category.findAll({
                attributes: ["id", "categoryname", "emoji"],
                where: { userId: data.id }});
            
            let categoryList = [];    
            for(let i = 0; i < categoryLists.length; i++){
                if(categoryLists[i].categoryname === "지정되지 않은 카테고리"){
                    continue;
                }
                else{
                    categoryList.push(categoryLists[i])
                }
            }

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
                    }
                })
            }
            else{
                for(let i = 0; i < categoryInfos.length; i++){
                    if(categoryInfos[i]['money.cost'] === null){
                        delete categoryInfos[i]
                    }
                }
                let categorymonth;
                let categoryexmonth;
                if(month < 10){
                    categorymonth = categoryInfos.filter(el => el["money.date"].split('-')[1] === `0${month}`);
                    categoryexmonth = categoryInfos.filter(el => el["money.date"].split('-')[1] === `0${month - 1}`);
                }
                else{
                    categorymonth = categoryInfos.filter(el => el["money.date"].split('-')[1] === `${month}`);
                    categoryexmonth = categoryInfos.filter(el => el["money.date"].split('-')[1] === `${month - 1}`);
                }
                if(categorymonth.length !== 0 && categoryexmonth.length !== 0){
                    if(categorymonth[0].length === 0 && categoryexmonth[0].length === 0){
                        monthlyBudget = 0;
                        monthlyUsed = 0;
                        exMonthlyUsed = 0;
                    }
                    else{
                        const costs = categorymonth.map(el => el["money.cost"])
                        for(let i = 0; i < costs.length; i++){
                            monthlyUsed = monthlyUsed + costs[i]
                        }
                        
                        const exCosts = categoryexmonth.map(el => el["money.cost"])
                        for(let i = 0; i < exCosts.length; i++){
                            exMonthlyUsed = exMonthlyUsed + exCosts[i]
                        }
                    }
                }

                else if(categorymonth.length !== 0){ 
                    if(categorymonth[0]["money.cost"] === undefined){
                        monthlyUsed = 0;
                        monthlyBudget = 0;
                    }
                    else{
                        const costs = categorymonth.map(el => el["money.cost"])
                        for(let i = 0; i < costs.length; i++){
                            monthlyUsed = monthlyUsed + costs[i]
                        }
                    }
                }

                else if(categoryexmonth.length !== 0){ 
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
            }
            
            res.status(200).send({ 
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