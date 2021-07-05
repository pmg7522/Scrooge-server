const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
    try{
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
            let month = new Date().getMonth()
    
            const categoryInfos = await category.findAll({
                attributes: ["budget"],
                include: [{ model: money, attributes: ["cost", "date"] }],
                where: { userId: data.id } , 
                raw: true 
            });
    
            const moneyInfos = await money.findAll({ where: { userId: data.id } });
    
            let monthlyUsed = 0;
            let exMonthlyUsed = 0;
            let monthlyBudget = 0;
    
            if(categoryInfos.length === 0){
                return res.status(200).send({ 
                    data: { 
                        top: {},
                        daily: []
                    }});
            }
            if(moneyInfos.length === 0){
                return res.status(200).send({ 
                    data: { 
                        top: {},
                        daily: []
                    }});
            }
            else{
                let categoryInfo;
                let categorymonth;
                let categoryexmonth;
                let noCategoryMoney;
                let noCategorymonth;

                if(month < 10){
                    categoryInfo = categoryInfos.filter(el => el["money.date"])
                    categorymonth = categoryInfo.filter(el => el["money.date"].split('-')[1] === `0${month + 1}`);
                    categoryexmonth = categoryInfo.filter(el => el["money.date"].split('-')[1] === `0${month}`);
                    noCategoryMoney = categoryInfos.filter(el => !el["money.date"])
                    noCategorymonth = noCategoryMoney.filter(el => el.date.getMonth() === month);
                }
                else{
                    categoryInfo = categoryInfos.filter(el => el["money.date"])
                    categorymonth = categoryInfo.filter(el => el["money.date"].split('-')[1] === `${month + 1}`);
                    categoryexmonth = categoryInfo.filter(el => el["money.date"].split('-')[1] === `${month}`);
                    noCategoryMoney = categoryInfos.filter(el => !el["money.date"])
                    noCategorymonth = noCategoryMoney.filter(el => el.date.getMonth() === month);
                }
                
                let noCategoryBudget = 0;
                for(let i = 0; i < noCategorymonth.length; i++){
                    noCategoryBudget = noCategoryBudget + noCategorymonth[i].budget
                }
                
                if(categorymonth.length !== 0 && categoryexmonth.length !== 0){ //이번달과 전달 둘 다 지출 내역이 있을 경우
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
                else if(categorymonth.length !== 0){ //이번달 지출 내역이 있을 경우
                    if(categorymonth[0]["money.cost"] === undefined){
                        monthlyUsed = 0;
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
                        monthlyBudget = monthlyBudget + noCategoryBudget
                    }
                }
                else if(categoryexmonth.length !== 0){ //전달 지출 내역이 있을 경우
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
            const moneyDates = await money.findAll({
                attributes: ["cost", "date"],
                order: [sequelize.col("date")],
                where: { userId: data.id, date: { [Op.lt]: nextYear, [Op.gt]: thisYear } },
                raw: true
            })
    
            let baseArr = new Array(32).fill(0)
            let daily = [];
            for(let i = 0; i < moneyDates.length; i++){
                let moneyDays = moneyDates[i].date.split("-")[2]
                if(moneyDays < 10){
                    let newMoneyDays = moneyDays.slice(1,2)
                    baseArr[newMoneyDays] = baseArr[newMoneyDays] + moneyDates[i].cost
                }
                else{
                    baseArr[moneyDays] = baseArr[moneyDays] + moneyDates[i].cost
                }
            }
            for(let i = 0; i < baseArr.length; i++){
                if(i < 10){
                    if(baseArr[i] !== 0){
                        daily.push({ date: thisYear +  "-0" + String(i), value: baseArr[i] })
                    }
                }
                else{
                    if(baseArr[i] !== 0){
                        daily.push({ date: thisYear +  "-" + String(i), value: baseArr[i] })
                    }
                }
            }
            return res.status(200).send({
                data: {
                    top: { monthlyBudget, monthlyUsed, exMonthlyUsed },
                    daily
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