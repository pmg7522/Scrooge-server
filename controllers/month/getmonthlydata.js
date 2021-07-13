const { money, category } = require("../../models");
const { isAuthorized } = require("../functions");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
  try {
    const data = isAuthorized(req);

    if (data) {
      let thisYear = String(new Date().getFullYear());
      let month = new Date().getMonth();

      const categoryInfos = await category.findAll({
        attributes: ["budget"],
        include: [{ model: money, attributes: ["cost", "date"] }],
        where: { userId: data.id },
        raw: true,
      });

      const moneyInfos = await money.findAll({ where: { userId: data.id } });

      const categoryBudget = await category.findAll({
        attributes: ["budget"],
        where: { userId: data.id },
        raw: true,
      });

      let monthlyUsed = 0;
      let exMonthlyUsed = 0;
      let monthlyBudget = 0;

      const budgets = categoryBudget.map((el) => el.budget);
      for (let i = 0; i < budgets.length; i++) {
        monthlyBudget = monthlyBudget + budgets[i];
      }

      if (categoryInfos.length === 0) {
        return res.status(200).send({
          data: {
            top: {},
            daily: [],
          },
        });
      }
      if (moneyInfos.length === 0) {
        return res.status(200).send({
          data: {
            top: {},
            daily: [],
          },
        });
      } else {
        let categoryInfo;
        let categorymonth;
        let categoryexmonth;

        if (month < 10) {
          categoryInfo = categoryInfos.filter((el) => el["money.date"]);
          categorymonth = categoryInfo.filter(
            (el) => el["money.date"].split("-")[1] === `0${month + 1}`
          );
          categoryexmonth = categoryInfo.filter(
            (el) => el["money.date"].split("-")[1] === `0${month}`
          );
        } else {
          categoryInfo = categoryInfos.filter((el) => el["money.date"]);
          categorymonth = categoryInfo.filter(
            (el) => el["money.date"].split("-")[1] === `${month + 1}`
          );
          categoryexmonth = categoryInfo.filter(
            (el) => el["money.date"].split("-")[1] === `${month}`
          );
        }

        if (categorymonth.length !== 0 && categoryexmonth.length !== 0) {
          if (
            categorymonth[0].length === 0 &&
            categoryexmonth[0].length === 0
          ) {
            monthlyBudget = 0;
            monthlyUsed = 0;
            exMonthlyUsed = 0;
          } else {
            const costs = categorymonth.map((el) => el["money.cost"]);
            for (let i = 0; i < costs.length; i++) {
              monthlyUsed = monthlyUsed + costs[i];
            }

            const exCosts = categoryexmonth.map((el) => el["money.cost"]);
            for (let i = 0; i < exCosts.length; i++) {
              exMonthlyUsed = exMonthlyUsed + exCosts[i];
            }
          }
        } else if (categorymonth.length !== 0) {
          if (categorymonth[0]["money.cost"] === undefined) {
            monthlyUsed = 0;
          } else {
            const costs = categorymonth.map((el) => el["money.cost"]);
            for (let i = 0; i < costs.length; i++) {
              monthlyUsed = monthlyUsed + costs[i];
            }
          }
        } else if (categoryexmonth.length !== 0) {
          if (categoryexmonth[0]["money.cost"] === undefined) {
            exMonthlyUsed = 0;
          } else {
            const exCosts = categoryexmonth.map((el) => el["money.cost"]);
            for (let i = 0; i < exCosts.length; i++) {
              exMonthlyUsed = exMonthlyUsed + exCosts[i];
            }
          }
        }
      }

      let daily = [];
      let baseArr;
      let monthlyArr;
      for (let i = 1; i <= 12; i++) {
        baseArr = new Array(32).fill(0);
        if (i < 10) {
          monthlyArr = await money.findAll({
            attributes: ["date", "cost"],
            where: { userId: data.id, date: { [Op.like]: "%-0" + i + "-%" } },
            raw: true,
          });
        } else {
          monthlyArr = await money.findAll({
            attributes: ["date", "cost"],
            where: { userId: data.id, date: { [Op.like]: "%-" + i + "-%" } },
            raw: true,
          });
        }
        for (let j = 0; j < monthlyArr.length; j++) {
          let moneyDays = monthlyArr[j].date.split("-")[2];
          baseArr[Number(moneyDays)] =
            baseArr[Number(moneyDays)] + monthlyArr[j].cost;
        }

        for (let k = 0; k < baseArr.length; k++) {
          if (i < 10) {
            if (baseArr[k] !== 0) {
              if (k < 10) {
                daily.push({
                  date: thisYear + "-0" + String(i) + "-0" + k,
                  title: `${baseArr[k]}`,
                });
              } else {
                daily.push({
                  date: thisYear + "-0" + String(i) + "-" + k,
                  title: `${baseArr[k]}`,
                });
              }
            }
          } else {
            if (baseArr[k] !== 0) {
              if (k < 10) {
                daily.push({
                  date: thisYear + "-" + String(i) + "-0" + k,
                  title: `${baseArr[k]}`,
                });
              } else {
                daily.push({
                  date: thisYear + "-" + String(i) + "-" + k,
                  title: `${baseArr[k]}`,
                });
              }
            }
          }
        }
      }

      return res.status(200).send({
        data: {
          top: { monthlyBudget, monthlyUsed, exMonthlyUsed },
          daily,
        },
      });
    } else {
      console.log(err);
      return res.status(500).send({ message: "We Don't Know" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "We Don't Know" });
  }
};
