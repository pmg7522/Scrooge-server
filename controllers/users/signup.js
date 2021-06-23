const { user, money, achievement, category, level } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const crypto = require('crypto');
dotenv.config();

module.exports = async (req, res) => {
    const { email, password, username } = req.body
        await user.findOne({
            where: { email }
        })
    .then(async (data) => {
        if (data) {
            return res.status(409).send({ message: "email exists" })
            }
        const hash = crypto.createHmac('sha256', process.env.SALT).update(password).digest('hex');
        await user.create({ email, password: hash, username, photo: "/uploads/" + req.file.filename })
        return res.status(201).send({ "message": "signup successed" })
        })
    .catch(err => {
        console.log(err)
        res.status(500).send({ message: "Internal Server Error" })
    })
}
