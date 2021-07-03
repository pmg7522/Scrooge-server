const { money, category, user } = require('../../models');
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const xlsx = require("xlsx");

module.exports = async (req, res) => {
    try{
        const data = isAuthorized(req);
        const book = xlsx.utils.book_new();

        const userMoneyinfo = await money.findAll({
            attributes: ["id", "cost", "date", "memo"],
            include: [{ model: category, attributes: ["categoryname"] }],
            group: "money.id",
            order: [[ sequelize.col("date"), "ASC" ]],
            where: { userId: data.id },
            raw: true
        })

        const costArr = []; 
        const budgetArr = []; 

        for(let i = 0; i < userMoneyinfo.length; i++){
            costArr.push([ 
                userMoneyinfo[i]['date'],
                userMoneyinfo[i]["category.categoryname"],
                userMoneyinfo[i]['cost'],
                userMoneyinfo[i]['memo']
            ])
        }

        const month = new Date().getMonth() + 1
        let result = []
        let baseArr;
        let monthlyArr;

        for(let i = 1; i <= month; i++){
            console.log(i)
            // baseArr = new Array(32).fill(0)
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
                // i 달
        }

        res.status(200).send({ userMoneyinfo, month, caname, dateInfo })

        const costList = xlsx.utils.aoa_to_sheet([
            [ "날짜", "카테고리", "지출 금액", "메모" ],
            ...costArr,
            [ "", "", "", "" ],
        ])
       

      //  xlsx.utils.book_append_sheet( book, costList, "costList" );

        return res.status(200).send({ data: costList, message: "엑셀 데이터 전송 완료" })
    }
    catch(err){
        console.log(err)
    }
}