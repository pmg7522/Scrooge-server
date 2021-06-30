const { category, money, achievement } = require("../../models");
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
    const data = isAuthorized(req);

    const test = new Date().getMonth()
    let thisMonth = ""
    let thisYear = ""

    let exMonth = ""
    let exYear = ""

    let nextMonth = ""
    let nextYear = ""

    if(test > 8){
        thisMonth = String(new Date().getMonth() + 1)
        thisYear = String(new Date().getFullYear()) + "-" + thisMonth
        exMonth = String(new Date().getMonth())
        exYear = String(new Date().getFullYear()) + "-" + exMonth
        nextMonth = String(new Date().getMonth() + 2)
        nextYear = String(new Date().getFullYear()) + "-" + nextMonth
    }
    else{
        thisMonth = String(new Date().getMonth() + 1)
        thisYear = String(new Date().getFullYear()) + "-" + "0" + thisMonth
        exMonth = String(new Date().getMonth())
        exYear = String(new Date().getFullYear()) + "-" + "0" + exMonth
        nextMonth = String(new Date().getMonth() + 2)
        nextYear = String(new Date().getFullYear()) + "-" + "0" + nextMonth
    }

    if(data){
        const noMoney = await money.findAll({ where: { userId: data.id } })
        if(noMoney.length === 0){
            return res.status(200).send({ data: {
                top: [],
                bottom: {
                    best: [],
                    topthree: [],
                    achievement: [
                        {
                            scrooge: null,
                            leastspend: null
                        }
                    ]
                }
            }
        })
        }

        //매일 지출 횟수
        let top = [];
        let baseArr;
        const moneyDates = await money.findAll({
            attributes: ["date"],
            order: [sequelize.col("date")],
            where: { userId: data.id, date: { [Op.lt]: nextYear, [Op.gt]: exYear } },
            raw: true
        })
        let monthlyArr;
        for(let i = 1; i <= 12; i++){
            if(i < 10){
                baseArr = new Array(32).fill(0)
                monthlyArr = await money.findAll({
                    attributes: ["date"],
                    where: { userId: data.id, date: { [Op.like]: "%-0" + i + "-%"} },
                    raw: true
                })
                for(let j = 0; j < monthlyArr.length; j++){
                    let moneyDays = monthlyArr[j].date.split("-")[2]
                    baseArr[moneyDays] = baseArr[moneyDays] + 1
                }
                for(let k = 0; k < baseArr.length; k++){
                    if(baseArr[k] !== 0){
                        top.push(`[new Date(${new Date().getFullYear()}, ${i - 1}, ${k + 1}), ${baseArr[k]}]`)
                    }
                }
            }else{
                baseArr = new Array(32).fill(0)
                monthlyArr = await money.findAll({
                    attributes: ["date"],
                    where: { userId: data.id, date: { [Op.like]: "%-" + i + "-%"} },
                    raw: true
                })
                for(let j = 0; j < monthlyArr.length; j++){
                    let moneyDays = monthlyArr[j].date.split("-")[2]
                    baseArr[moneyDays] = baseArr[moneyDays] + 1
                }
                for(let k = 0; k < baseArr.length; k++){
                    if(baseArr[k] !== 0){
                        top.push(`[new Date(${new Date().getFullYear()}, ${i - 1}, ${k + 1}), ${baseArr[k]}]`)
                    }
                }
            }
        }
        top.unshift([{ type: 'date', id: 'Date' }, { type: 'number', id: 'Won/Loss' }])
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
        let achieve = [];

        const allMoneyDate = await money.findAll({
            attributes: ["date"],
            order: [[sequelize.col("date"), "DESC"]],
            where: { userId: data.id }
        })

        let now = new Date();

        let longest = allMoneyDate[0].dataValues.date
        let longestDate = longest.split("-")
        let year = now.getFullYear()
        let month = now.getMonth()+1
        let day = now.getDate();

        let longDate = new Date(longestDate[0], longestDate[1], longestDate[2])
        let shortDate = new Date(year, month, day)

        let difference = shortDate.getTime() - longDate.getTime()
        let differenceDay = difference / (1000*60*60*24) + 1

        const scroogeDay = await achievement.findOne({ 
            attributes: ["scrooge"],
            where: { userId: data.id } ,
            raw: true
        })

        if(scroogeDay.scrooge >= differenceDay){
            differenceDay = scroogeDay.scrooge;
        }
        else{
            await achievement.update({ scrooge: differenceDay }, { where: { userId: data.id } })
        }

        const leastspend = await money.findAll({
            attributes: ["cost"],
            order: [[sequelize.col("cost"), "ASC"]],
            limit: 1,
            where:{ userId: data.id, createdAt: { [Op.gt]: thisYear }},
            raw: true
        })

        achieve.push({ scrooge: differenceDay, leastspend: leastspend[0].cost })

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