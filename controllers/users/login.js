const { generateAccessToken, generateRefreshToken, sendToken } = require('../functions');
const { user } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
    const { email, password } = req.body
    const userInfo = await user.findOne({ where: { email } })

    if (!userInfo) {
        return res.status(404).send({ message: "찾을 수 없는 유저입니다." });
    }

//    const hash = crypto.createHmac("sha256", process.env.SALT).update(password).digest("hex");
    if (password !== userInfo.dataValues.password) {
      return res.status(404).send({ message: "정확한 정보를 입력해 주십시오." })
    }

    else {
      delete userInfo.dataValues.password
      const accessToken = generateAccessToken(userInfo.dataValues);
      const refreshToken = generateRefreshToken(userInfo.dataValues);

      sendToken(res, accessToken, refreshToken);
    }
  }