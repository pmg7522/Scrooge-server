const { category, money, achievement } = require("../../models");
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
    try{
        const data = isAuthorized(req);
    
        let thisYear = String(new Date().getFullYear())
    
        if(data){
            const noMoney = await money.findAll({ where: { userId: data.id } })
            if(noMoney.length === 0){
                return res.status(200).send({ data: {
                    top: [],
                    bottom: {
                        best: [],
                        topthree: [],
                        achieve: [ { scrooge: 0, leastspend: 0 } ]
                    }
                }
            })
            }
    
            //매일 지출 횟수
            let top = [];
            let baseArr;
            let monthlyArr;
            for(let i = 1; i <= 12; i++){
                baseArr = new Array(32).fill(0)
                if(i < 10){
                    monthlyArr = await money.findAll({
                        attributes: ["date"],
                        where: { userId: data.id, date: { [Op.like]: "%-0" + i + "-%"} },
                        raw: true
                    })
                }
                else{
                    monthlyArr = await money.findAll({
                        attributes: ["date"],
                        where: { userId: data.id, date: { [Op.like]: "%-" + i + "-%"} },
                        raw: true
                    })
                }
                for(let j = 0; j < monthlyArr.length; j++){
                    let moneyDays = monthlyArr[j].date.split("-")[2]
                    baseArr[Number(moneyDays)] = baseArr[Number(moneyDays)] + 1
                }
                for(let k = 0; k < baseArr.length; k++){
                    if(baseArr[k] !== 0){
                        top.push([new Date().getFullYear(), i, k, baseArr[k]])
                    }
                }
            }
            
            //가장 잘 지킨 예산
            let best = [];
            let bestBudget = [];
            
            const categoryMoney = await money.findAll({ 
                attributes: [[ sequelize.fn("sum", sequelize.col("cost")), "allCost" ]],
                include: [{ model: category, attributes: ["categoryname", "budget"] }],
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
            
            bestBudget.sort((a,b) => (b.cost-a.cost));
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
            let achieve = [];
            let max = [];

            const allMoneyDate = await money.findAll({
                attributes: ["date"],
                order: [[sequelize.col("date"), "DESC"]],
                where: { userId: data.id },
            })

            const dateinfo = allMoneyDate.map(el => new Date(el.dataValues.date).getTime())
            dateinfo.unshift(new Date().getTime())

            dateinfo.reduce((acc, cur) => {
                max.push(acc - cur)
                return cur
            })
            max.sort((a, b) => (b - a))
            let ScroogeDay = Math.floor((max[0] / (1000*60*60*24)))

            const scroogeDayinfo = await achievement.findOne({ 
                attributes: ["scrooge"],
                where: { userId: data.id },
                raw: true
            })

            if(scroogeDayinfo.scrooge >= ScroogeDay){
                ScroogeDay = scroogeDayinfo.scrooge;
            }
            else{
                await achievement.update({ scrooge: ScroogeDay }, { where: { userId: data.id } })
            }

            const leastspend = await money.findAll({
                attributes: ["cost"],
                order: [[sequelize.col("cost"), "ASC"]],
                limit: 1,
                where:{ userId: data.id, createdAt: { [Op.gt]: thisYear }},
                raw: true
            })

            achieve.push({ scrooge: ScroogeDay, leastspend: leastspend[0].cost })
    
            return res.status(200).send({ data: {
                top,
                bottom: {
                    best,
                    topthree,
                    achieve
                }
            }
        })
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