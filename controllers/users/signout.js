const { user, money, achievement, category, level } = require('../../models');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res) => {
    res
    .status(200)
    .cookie('refreshToken', '')
    .send({message: "로그아웃 완료"})
}