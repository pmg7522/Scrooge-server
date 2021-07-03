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

        const costArr = []; // 날자, 카이름, 비용, 메모
        const budgetArr = []; // 년.월, 카이름, 예산, 예산 - 총지출()

        for(let i = 0; i < userMoneyinfo.length; i++){             // 날자, 카이름, 비용, 메모
            costArr.push([ 
                userMoneyinfo[i]['date'],
                userMoneyinfo[i]["category.categoryname"],
                userMoneyinfo[i]['cost'],
                userMoneyinfo[i]['memo']
            ])
        }

        // 년.월, 카이름, 예산, 예산 - 총지출(해당 월) => money + category
        // 해당 유저의 1년 간 현재 월 까지의 각 카테고리 별 총 지출을 구한다.
        // for => 12번 반복문을 돌린다.
        //     i = 1인 경우, 해당 i 달을 가진 모든 지출 내역의 date값을 찾는다.
        //     const categorynameArr = 해당 유저가 가진 카테고리 이름을 요소로 하는 배열을 만든다. findAll
        //     if => 카테고리 이름을 가지고 있는 지출 내역 정보가 있다면, 지출값을 더한다. categorynameArr.length만큼 반복문을 돌린다. 
        const month = new Date().getMonth() + 1
        let result = []
        let baseArr;
        let monthlyArr;

        const dateInfo = await category.findAll({  // 해당 유저의 모든 지출 정보
            attributes: ["id", "categoryname", "budget"],
            include: [ { model: money, attributes: ["id", "date"]}],
            where: { userId: data.id }
        })


        ////////////////////////////////// 해당 유저의 카테고리 이름 ///////////////////////////////
        const categoryNameInfo = await category.findAll({ 
            attributes: ["categoryname"],
            where: { userId: data.id } 
        })

        const caname = [];
        for (let i = 0; i < categoryNameInfo.length; i++) {
            caname.push(categoryNameInfo[i].categoryname)
        }
        /////////////////////////////////////////////////////////////////////////////////////////////////

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