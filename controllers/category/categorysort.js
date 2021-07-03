const { category, money } = require('../../models');
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
    const { id } = req.body
    try{
        const data = isAuthorized(req);
    
        if(data){
            let bottom = [];
            const categoryInfo = await category.findAll({
                attributes:["id"],
                include: [{ model: money, attributes: ["id", "cost", "date", "memo"] }],
                where: { id },
                raw: true
            })
            for(let i = 0; i < categoryInfo.length; i++){
                bottom.push({
                    id: categoryInfo[i].id,
                    emoji: null,
                    moneyId: categoryInfo[i]['money.id'],
                    cost: categoryInfo[i]['money.cost'],
                    date: categoryInfo[i]['money.date'],
                    memo: categoryInfo[i]['money.memo']
                })
            }
            return res.status(200).send({ data: bottom, message: "정렬" })
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