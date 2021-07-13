const { user, money, category, achievement } = require("../../models");
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  try {
    const data = isAuthorized(req);
    if (data) {
      await category.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
      await category.destroy({ where: { userId: data.id } });
      await category.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);

      await money.destroy({ where: { userId: data.id } });
      await achievement.destroy({ where: { userId: data.id } });
      await user.destroy({ where: { id: data.id } });

      return res.status(205).send({ message: "회원탈퇴 완료" });
    } else {
      console.log(err);
      return res.status(500).send({ message: "We Don't Know" });
    }
  } catch (err) {
    console.log(err);
  }
};
