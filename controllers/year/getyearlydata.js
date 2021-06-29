const { category, money } = require("../../models");
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
    const data = isAuthorized(req);

    const thisYear = String(new Date().getFullYear())

    if(data){
        //매일 지출 횟수
        const moneyDates = await money.findAll({
            attributes: ["date"],
            order: [sequelize.col("date")],
            where: { userId: data.id },
            raw: true
        })
        moneyDates.push({ date: '0' })

        let count = 1;
        let top = [];

        for(let i = 0; i < moneyDates.length; i++){
            let nowDate = moneyDates[i].date
            if(nowDate === moneyDates[count].date){
                count++
            }
            else{
                top.push({ day: nowDate, value: count })
                count = 1
                nowDate = moneyDates[i].date
            }
        }
        top.pop();
        //가장 잘 지킨 예산
        let best = [];
        let bestBudget = [];
        
        const categoryMoney = await money.findAll({ 
            attributes: [[ sequelize.fn("sum", sequelize.col("cost")), "allCost" ]],
            include: [{ model: category, attributes: ["categoryname","budget"] }],
            group: "category.id",
            where: { userId: data.id, createdAt: { [Op.gt]: thisYear }}
        })
        
        const moneyDate = await money.findAll({ 
            attributes: ["date"],
            where: { userId: data.id, createdAt: { [Op.gt]: thisYear }}
        })
        
        for(let i = 0; i < categoryMoney.length; i++){
            let categoryname = categoryMoney[i].dataValues.category.categoryname;
            let date = moneyDate[i].dataValues.date
            let cost = categoryMoney[i].dataValues.category.budget - categoryMoney[i].dataValues.allCost
            bestBudget.push({ date, categoryname, cost })
        }
        
        bestBudget.sort((a,b) => (b.saveMoney-a.saveMoney));
        best.push(bestBudget[0], bestBudget[1], bestBudget[2])
        //가장 큰 지출
        const topthree = await money.findAll({
            attributes: ["cost", "date", "memo"],
            order: [[sequelize.col("cost"), "DESC"]],
            limit: 3,
            where:{ userId: data.id, createdAt: { [Op.gt]: thisYear }},
            raw: true
        })
        //업적
        let achievement = [];

        const allMoneyDate = await money.findAll({
            attributes: ["date"],
            order: [[sequelize.col("date"), "DESC"]],
            where: { userId: data.id }
        })

        let longest = allMoneyDate[0].dataValues.date
        let longestDate = longest.split("-")
        let shortest = allMoneyDate[allMoneyDate.length - 1].dataValues.date
        let shortestDate = shortest.split("-")

        let longDate = new Date(longestDate[0], longestDate[1], longestDate[2])
        let shortDate = new Date(shortestDate[0], shortestDate[1], shortestDate[2])

        let difference = longDate.getTime() - shortDate.getTime()
        let differenceDay = difference / (1000*60*60*24) + 1

        const leastspend = await money.findAll({
            attributes: ["cost"],
            order: [[sequelize.col("cost"), "ASC"]],
            limit: 1,
            where:{ userId: data.id, createdAt: { [Op.gt]: thisYear }},
            raw: true
        })

        achievement.push({ scrooge: differenceDay, leastspend: leastspend[0].cost })

        return res.send({ data: {
            top,
            bottom: {
                best,
                topthree,
                achievement
            }
        }
    })
    }
    else{
        console.log(err);
        return res.status(500).send({ message: "We Don't Know" });
    }
}