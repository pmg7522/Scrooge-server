const { user, category } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
    const { email, password, username } = req.body
    await user.findOne({ where: { email } })
    .then(async (data) => {
        if (data) {
            return res.status(409).send({ message: "email exists" })
        }
        // const hash = crypto.createHmac("sha256", process.env.SALT).update(password).digest("hex");
        const userInfo = await user.create({ email, password, username, photo: "/uploads/" + req.file.filename })
        
        await category.create({ categoryname: "지정되지 않은 카테고리", budget:0, userId: userInfo.dataValues.id })
        return res.status(201).send({ "message": "회원가입 완료" })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).send({ message: "Internal Server Error" })
    })
}
