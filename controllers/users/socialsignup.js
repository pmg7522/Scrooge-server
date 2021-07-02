const { user, category } = require("../../models");

module.exports = async (req, res) => {
    const { email, username } = req.body

    const userInfo = await user.create({ email, username, photo: "/uploads/" + req.file.filename })
    await category.create({ categoryname: "지정되지 않은 카테고리", budget:0, userId: userInfo.dataValues.id });

    return res.status(200).send({ message: "회원가입 완료" })
}