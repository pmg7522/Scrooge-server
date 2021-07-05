const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");

module.exports = async (req, res) => {
    try{
        const data = isAuthorized(req);
        if(data){
            const categoryMoney = await money.findAll({ 
                attributes: [[ sequelize.fn("sum", sequelize.col("cost")), "allCost" ]],
                include: [{model: category, attributes: ["id","categoryname","budget", "emoji"]}],
                group: "category.id" ,
                where: { userId: data.id }})

                let categories = [];
                for(let i = 0; i < categoryMoney.length; i++){
                    let categoryname = categoryMoney[i].dataValues.category.categoryname;
                    let categorybudget = categoryMoney[i].dataValues.category.budget;
                    let categoryused = Number(categoryMoney[i].dataValues.allCost);
                    let categoryemoji = categoryMoney[i].dataValues.category.emoji;
                    let categoryrest = categoryMoney[i].dataValues.category.budget - categoryMoney[i].dataValues.allCost;
                    let allData = { categoryname, categorybudget, categoryused ,categoryrest, categoryemoji };
                    categories.push(allData);
                }
        
                let usedGraph = [];
                for(let i = 0; i < categoryMoney.length; i++){
                    let categorynames = categoryMoney[i].dataValues.category.categoryname;
                    let value = Number(categoryMoney[i].dataValues.allCost);
                    usedGraph.push([categorynames, value]);
                }
                
                let budgetGraph = [];
                for(let i = 0; i < categoryMoney.length; i++){
                    let categorynames = categoryMoney[i].dataValues.category.categoryname;
                    let value = categoryMoney[i].dataValues.category.budget;
                    budgetGraph.push([categorynames, value]);
                }

                usedGraph.unshift(['Task', '총 지출 금액']);
                budgetGraph.unshift(['Task', '총 예산 금액']);

                return res.status(200).send({ 
                    data: { categories, usedGraph, budgetGraph } 
                });
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