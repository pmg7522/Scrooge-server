const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");

module.exports = async (req, res) => {
    const data = isAuthorized(req);

    if(data){
        const categoryMoney = await money.findAll({ 
            attributes: [[ sequelize.fn("sum", sequelize.col("cost")), "allCost" ]],
            include: [{model: category, attributes: ["id","categoryname","budget"]}],
            group: "category.id" ,
            where: { userId: data.id }})
            
            let categories = [];
            for(let i = 0; i < categoryMoney.length; i++){
                let categoryname = categoryMoney[i].dataValues.category.categoryname;
                let categorybudget = categoryMoney[i].dataValues.category.budget;
                let categoryused = categoryMoney[i].dataValues.allCost;
                let categoryrest = categoryMoney[i].dataValues.category.budget - categoryMoney[i].dataValues.allCost;
                let allData = { categoryname, categorybudget, categoryused ,categoryrest };
                categories.push(allData);
            }
    
            let usedGraph = [];
            for(let i = 0; i < categoryMoney.length; i++){
                let id = categoryMoney[i].dataValues.category.id;
                let label = categoryMoney[i].dataValues.category.categoryname;
                let value = categoryMoney[i].dataValues.allCost;
                let allUsedData = { id, label, value };
                usedGraph.push(allUsedData);
            }
            
            let budgetGraph = [];
            for(let i = 0; i < categoryMoney.length; i++){
                let id = categoryMoney[i].dataValues.category.id;
                let label = categoryMoney[i].dataValues.category.categoryname;
                let value = categoryMoney[i].dataValues.category.budget;
                let allBudgetData = { id, label, value };
                budgetGraph.push(allBudgetData);
            }
    
            const usedAll = await money.sum("cost", { where: { userId: data.id } });
            const budgetAll = await category.sum("budget", { where: { userId: data.id } });
    
            usedGraph.unshift(usedAll);
            budgetGraph.unshift(budgetAll);
    
            return res.status(200).send({ data: { categories, usedGraph, budgetGraph } });
    }
    else{
        console.log(err);
        return res.status(500).send({ message: "We Don't Know" });
    }
}