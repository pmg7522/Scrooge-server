const { user, money, achievement, category, level } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const crypto = require('crypto');
dotenv.config();

module.exports = async (req, res) => {
    const { email, password } = req.body
    const userInfo = await user.findOne({
        where: { email }
    })
    console.log(userInfo)
    if (!userInfo) {
        return res.status(404).send({ message: "찾을 수 없는 유저입니다." });
    } 
    const hash = crypto.createHmac('sha256', process.env.SALT).update(password).digest('hex');
    if (hash !== userInfo.dataValues.password) {
      return res.status(404).send({ message: '정확한 정보를 입력해 주십시오.' })
    }
    else {
      delete userInfo.dataValues.password
      const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET, {
        expiresIn: '1h'
      });
      const refreshToken = jwt.sign(userInfo.dataValues, process.env.REFRESH_SECRET, {
        expiresIn: '2h'
      });
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        sameSite: None,
        secure: true,
        httpOnly: true
      })
      .send({ 
        message: "로그인 완료",
        data: { accessToken, refreshToken }
      })
    }
  }
