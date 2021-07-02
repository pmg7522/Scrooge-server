const { money, category } = require('../../models');
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const xlsx = require("xlsx");

module.exports = async (req, res) => {
    try{
        const data = isAuthorized(req);
        const book = xlsx.utils.book_new();
    
        const costArr = [];
        const budgetArr = [];
        let moneyDate;

        const moneyDates = await money.findAll({
            attributes: ["date"],
            order: [[sequelize.col("date"), "ASC"]],
            where: { userId: data.id },
            raw: true
        })
        // for(let i = 0; i < moneyDates.length; i++){
        //     moneyDate = moneyDates[i].slice(0,7)
        // }
        // console.log(moneyDate)

        const categoryInfo = await category.findAll({ 
            include: [{ model: money, attributes: ["id", "cost", "date", "memo"]}],
            order: [[sequelize.col("date"), "ASC"]],
            where: { userId: data.id },
            raw: true
        });

        const categoryInfos = await category.findAll({ 
            attributes: ["categoryname", "budget"],
            include: [{ model: money, attributes: [[ sequelize.fn("sum", sequelize.col("cost")), "allCost" ]] }],
            group: "category.id",
            where: { userId: data.id },
            raw: true
        })

        for(let i = 0; i < categoryInfo.length; i++){
            costArr.push([categoryInfo[i]['money.date'],categoryInfo[i].categoryname,categoryInfo[i]['money.cost'],categoryInfo[i]['money.memo']])
        }
        // for(let i = 0; i < categoryInfos.length; i++){
        //     budgetArr.push([categoryInfos[i][]])
        // }
        const costList = xlsx.utils.aoa_to_sheet([
            [ "날짜", "카테고리", "지출 금액", "메모" ],
            ...costArr,
            [ "", "", "", "" ],
            
        ])

        xlsx.utils.book_append_sheet( book, costList, "costList" );

        return res.status(200).send({ message: "엑셀파일 다운로드 완료" })
    }
    catch(err){
        console.log(err)
    }
}