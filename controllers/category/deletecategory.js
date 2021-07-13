const { category, money } = require("../../models");
const { isAuthorized } = require("../functions");

module.exports = async (req, res) => {
  try {
    const data = isAuthorized(req);

    if (data) {
      const { categoryname } = req.body;
      const noneCategory = await category.findOne({
        where: { categoryname: "지정되지 않은 카테고리", userId: data.id },
      });
      const noneCategoryId = noneCategory.dataValues.id;

      const categoryData = await category.findOne({
        where: { categoryname, userId: data.id },
      });
      const categoryDataId = categoryData.dataValues.id;

      await category.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
      await category.destroy({ where: { categoryname, userId: data.id } });
      await category.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);

      await money.update(
        { categoryId: noneCategoryId },
        { where: { categoryId: categoryDataId } }
      );
      return res.status(205).send({ message: `카테고리 삭제 완료` });
    } else {
      console.log(err);
      return res.status(500).send({ message: "We Don't Know" });
    }
  } catch (err) {
    console.log(err);
  }
};
