require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1h" });
  },

  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "2h" });
  },
  sendToken: (res, accessToken, refreshToken) => {
    return res.cookie("refreshToken", refreshToken, {
      sameSite: "none",
      secure: true,
      httpOnly: true
    }).send({ data: { accessToken, refreshToken }, message: "로그인 완료" });
  },

  resendAccessToken: (res, accessToken, data) => {
    return res.send({ data: { accessToken, user: data }, message: "Token 재발급 완료" });
  },
  isAuthorized: (req, res) => {
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res.status(401).send({ message: "Unauthorized" })
    }
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    if (!data) {
      return res.status(400).send({ message: "토큰이 없는 잘못된 접근입니다." })
    }
    return data;
  },
  checkRefreshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
};
