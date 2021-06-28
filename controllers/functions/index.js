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
<<<<<<< HEAD:controllers/functions/index.js

  sendToken: (res, accessToken, refreshToken) => {
    return res.
    cookie("refreshToken", refreshToken, {
      httpOnly: true,
    })
    .json({ data: { accessToken, refreshToken }, message: "ok" });
=======
  sendToken: (res, accessToken, refreshToken) => {
    return res.cookie("refreshToken", refreshToken, {
      sameSite: "none",
      secure: true,
      httpOnly: true
    }).send({ data: { accessToken, refreshToken }, message: "로그인 완료" });
>>>>>>> caf65b5c16db07098af2690854d3bc776cf82f93:controllers/tokenFunctions/index.js
  },

  resendAccessToken: (res, accessToken, data) => {
    return res.send({ data: { accessToken, user: data }, message: "Token 재발급 완료" });
  },
<<<<<<< HEAD:controllers/functions/index.js
  

  isAuthorized: (req) => {
=======
  isAuthorized: (req, res) => {
>>>>>>> caf65b5c16db07098af2690854d3bc776cf82f93:controllers/tokenFunctions/index.js
    const authorization = req.headers["authorization"];
    if (!authorization) {
      return res.status(401).send({ "message": 'invalid access token'})
    }
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    if (!data) {
      return res.status(404).send({ data: null, message: "토큰이 없는 잘못된 접근입니다." })
    }
    return data;
  },
<<<<<<< HEAD:controllers/functions/index.js


  checkRefeshToken: (refreshToken) => {
=======
  checkRefreshToken: (refreshToken) => {
>>>>>>> caf65b5c16db07098af2690854d3bc776cf82f93:controllers/tokenFunctions/index.js
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
};
