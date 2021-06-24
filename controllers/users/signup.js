const { user } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
    const { email, password, username } = req.body
    await user.findOne({ where: { email } })
    .then(async (data) => {
        if (data) {
            return res.status(409).send({ message: "email exists" })
        }
        const hash = crypto.createHmac("sha256", process.env.SALT).update(password).digest("hex");
        await user.create({ email, password: hash, username, photo: "/uploads/" + req.file.filename })
        return res.status(201).send({ "message": "회원가입 완료" })
        })
    .catch(err => {
        console.log(err)
        res.status(500).send({ message: "Internal Server Error" })
    })
}
