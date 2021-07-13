const { money, category } = require("../../models");
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const xlsx = require("xlsx");

module.exports = async (req, res) => {
  try {
    const data = isAuthorized(req);

    const userMoneyinfo = await money.findAll({
      attributes: ["id", "cost", "date", "memo"],
      include: [{ model: category, attributes: ["categoryname"] }],
      group: "money.id",
      order: [[sequelize.col("date"), "ASC"]],
      where: { userId: data.id },
      raw: true,
    });

    const costArr = [];
    const budgetArr = [];

    for (let i = 0; i < userMoneyinfo.length; i++) {
      costArr.push([
        userMoneyinfo[i]["date"],
        userMoneyinfo[i]["category.categoryname"],
        userMoneyinfo[i]["cost"],
        userMoneyinfo[i]["memo"],
      ]);
    }

    const month = new Date().getMonth() + 1;
    const thisYear = new Date().getFullYear();

    let monthlyArr;

    for (let i = 1; i <= month; i++) {
      if (i < 10) {
        monthlyArr = await money.findAll({
          attributes: [[sequelize.fn("sum", sequelize.col("cost")), "allCost"]],
          include: [
            { model: category, attributes: ["categoryname", "budget"] },
          ],
          group: "category.id",
          where: { userId: data.id, date: { [Op.like]: "%-0" + i + "-%" } },
          raw: true,
        });
        for (let j = 0; j < monthlyArr.length; j++) {
          budgetArr.push([
            String(thisYear) + "-0" + String(i),
            monthlyArr[j]["category.categoryname"],
            monthlyArr[j]["category.budget"],
            monthlyArr[j]["category.budget"] - Number(monthlyArr[j].allCost),
          ]);
        }
      } else {
        monthlyArr = await money.findAll({
          attributes: [[sequelize.fn("sum", sequelize.col("cost")), "allCost"]],
          include: [
            { model: category, attributes: ["categoryname", "budget"] },
          ],
          group: "category.id",
          where: { userId: data.id, date: { [Op.like]: "%-" + i + "-%" } },
          raw: true,
        });
      }
    }

    const costList = xlsx.utils.aoa_to_sheet([
      ["날짜", "카테고리", "지출 금액", "메모"],
      ...costArr,
      ["", "", "", ""],
      ["날짜(달)", "카테고리", "예산", "남은 예산"],
      ...budgetArr,
    ]);

    return res
      .status(200)
      .send({ data: { costList }, message: "엑셀 데이터 전송 완료" });
  } catch (err) {
    console.log(err);
  }
};
