const { user, category, achievement } = require("../../models");

module.exports = async (req, res) => {
  const { email, username } = req.body;
  try {
    if (!req.file) {
      const userInfo = await user.create({ email, username });
      await category.create({
        categoryname: "지정되지 않은 카테고리",
        budget: 0,
        emoji: "grey_question",
        userId: userInfo.dataValues.id,
      });
      await achievement.create({
        scrooge: 0,
        leastspend: 0,
        userId: userInfo.dataValues.id,
      });
    } else {
      const userInfo = await user.create({
        email,
        username,
        photo: "/uploads/" + req.file.filename,
      });
      await category.create({
        categoryname: "지정되지 않은 카테고리",
        budget: 0,
        emoji: "grey_question",
        userId: userInfo.dataValues.id,
      });
      await achievement.create({
        scrooge: 0,
        leastspend: 0,
        userId: userInfo.dataValues.id,
      });
    }
    return res.status(201).send({ message: "회원가입 완료" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "We Don't Know" });
  }
};
