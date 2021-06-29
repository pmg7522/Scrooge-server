const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
    const data = isAuthorized(req);

    const thisYear = String(new Date().getFullYear())

    if(data){
        let month = new Date().getMonth()

        const categoryInfos = await category.findAll({
            attributes: ["budget","createdAt"],
            include: [{ model: money, attributes: ["cost", "createdAt"] }],
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
            const categoryInfo = categoryInfos.filter(el => el["money.createdAt"])
            const categorymonth = categoryInfo.filter(el => el["money.createdAt"].getMonth() === month);
            const categoryexmonth = categoryInfo.filter(el => el["money.createdAt"].getMonth() === month - 1);

            const noCategoryMoney = categoryInfos.filter(el => !el["money.createdAt"])
            const noCategorymonth = noCategoryMoney.filter(el => el.createdAt.getMonth() === month);
            
            let noCategoryBudget = 0;
            for(let i = 0; i < noCategorymonth.length; i++){
                noCategoryBudget = noCategoryBudget + noCategorymonth[i].budget
            }
            
            if(categorymonth.length !== 0 && categoryexmonth.length !== 0){ //이번달과 전달 둘 다 지출 내역이 있을 경우
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

            if(categorymonth.length !== 0){ //이번달 지출 내역이 있을 경우
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

            if(categoryexmonth.length !== 0){ //전달 지출 내역이 있을 경우
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
            where: { userId: data.id, date: { [Op.gt]: thisYear } },
            raw: true
        })

        let daily = [];
        let count = 1;
        let costSum = moneyDates[0].cost

        for(let i = 0; i < moneyDates.length; i++){
            let nowDate = moneyDates[i].date
            if(nowDate === moneyDates[count].date){
                costSum = costSum + moneyDates[count].cost
                count++
            }
            else{
                daily.push({ day: nowDate, value: costSum })
                count = 1
                costSum = moneyDates[i].cost
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