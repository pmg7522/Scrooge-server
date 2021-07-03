const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const xlsx = require("xlsx");

module.exports = async (req, res) => {
    try{
        const data = isAuthorized(req);
        const book = xlsx.utils.book_new();
    
        // const moneyDates = await money.findAll({
            //     attributes: ["date"],
            //     order: [[sequelize.col("date"), "ASC"]],
            //     where: { userId: data.id },
            //     raw: true
            // })
            
            // for(let i = 0; i < moneyDates.length; i++){
                //     moneyDate = moneyDates[i].slice(0,7)
                // }
                // console.log(moneyDate)
                

        const userMoneyinfo = await money.findAll({
            attributes: ["id", "cost", "date", "memo", [ sequelize.fn("sum", sequelize.col("cost")), "allCost" ]],
            include: [{ model: category, attributes: ["id", "categoryname", "budget"] }],
            group: "category.id",
            order: [[ sequelize.col("date"), "ASC" ]],
            where: { userId: data.id },
            raw: true
        })

        const costArr = []; // 날자, 카이름, 비용, 메모
        const budgetArr = []; // 년.월, 카이름, 예산, 예산 - 총지출
        
        for(let i = 0; i < userMoneyinfo.length; i++){
            // 날자, 카이름, 비용, 메모
            costArr.push([ 
                userMoneyinfo[i]['date'],
                userMoneyinfo[i]["category.categoryname"],
                userMoneyinfo[i]['cost'],
                userMoneyinfo[i]['memo']
            ])
            // 년.월, 카이름, 예산, 예산 - 총지출
        }
        res.status(200).send({ userMoneyinfo })
        
        let result = []
        let baseArr;
        let monthlyArr;
        for(let i = 1; i <= 12; i++){
            baseArr = new Array(32).fill(0)
                if(i < 10) {
                    monthlyArr = await money.findAll({
                        attributes: ["date"],
                        where: { userId: data.id, date: { [Op.like]: "%-0" + i + "-%"} },
                        raw: true
                    })
                } else {
                    monthlyArr = await money.findAll({
                        attributes: ["date"],
                        where: { userId: data.id, date: { [Op.like]: "%-" + i + "-%"} },
                        raw: true
                    })
                }
                // i달의 지출 정보를 sum한 값을 가져온다. 
                // 
            for(let j = 0; j < monthlyArr.length; j++) {
                let moneyDays = monthlyArr[j].date.split("-")[2]
                baseArr[Number(moneyDays)] = baseArr[Number(moneyDays)] + baseArr[j]
            }
            for(let k = 0; k < baseArr.length; k++) {
                if(baseArr[k] !== 0){
                    result.push(`[new Date(${new Date().getFullYear()}, ${i}, ${k}), ${baseArr[k]}]`)
                }
            }
        }

        const costList = xlsx.utils.aoa_to_sheet([
            [ "날짜", "카테고리", "지출 금액", "메모" ],
            ...costArr,
            [ "", "", "", "" ],
        ])
        console.log(costList, costArr)
       


        // xlsx.utils.book_append_sheet( book, costList, "costList" );

        return res.status(200).send({ data: costList, message: "엑셀 데이터 전송 완료" })
    }
    catch(err){
        console.log(err)
    }
}