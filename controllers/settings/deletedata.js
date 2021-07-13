const { money, achievement, category } = require("../../models");
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  try {
    const data = isAuthorized(req);

    if (data) {
      await category.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
      await category.destroy({ where: { userId: data.id } });
      await category.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
      await money.destroy({ where: { userId: data.id } });

      await category.create({
        categoryname: "지정되지 않은 카테고리",
        emoji: "grey_question",
        budget: 0,
        userId: data.id,
      });
      await achievement.create({ scrooge: 0, leastspend: 0, userId: data.id });

      return res.status(205).send({ message: "데이터 삭제 완료" });
    } else {
      console.log(err);
      return res.status(500).send({ message: "We Don't Know" });
    }
  } catch (err) {
    console.log(err);
  }
};
