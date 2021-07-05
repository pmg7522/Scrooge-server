const { generateAccessToken, generateRefreshToken } = require('../functions');
const { user } = require("../../models");
const axios = require("axios");

module.exports = (req, res) => {
  if (!req.body.authorizationCode) {
    return res.status({ message: "Unauthorized" });
  }

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
  const AUTHORIZATION_CODE = req.body.authorizationCode;
  const GOOGLE_TOKEN_URL = `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${GOOGLE_REDIRECT_URI}&code=${AUTHORIZATION_CODE}`;

  let googleUserInfo = {};

  axios
    .post(
      GOOGLE_TOKEN_URL,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          accept: "application/json",
        },
      }
    )
    .then((response) => {
      const { access_token, refresh_token } = response.data;
      const GOOGLE_USERINFO_URL = `https://www.googleapis.com/oauth2/v2/userinfo`;
      return axios
      .get(GOOGLE_USERINFO_URL, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          accept: "application/json",
        },
      })
      .then(async (response) => {
        if (response.data) {
          googleUserInfo.email = response.data.email;

          let accessToken;
          let refreshToken;

          const realGoogleUser = await user.findOne({ where: { email: googleUserInfo.email } });
          if(!realGoogleUser){
            return res.status(400).send({ message: "구글 회원가입을 해주세요." })
          }
          else{
            accessToken = generateAccessToken(realGoogleUser.dataValues);
            refreshToken = generateRefreshToken(realGoogleUser.dataValues);
          }
          if(realGoogleUser){
            return res.
            status(200)
            .cookie("refreshToken", refresh_token, {
              sameSite: "none",
              secure: true,
              httpOnly: true
            })
            .send({ data: { accessToken, refreshToken }, message: "구글 로그인 완료"  });
          }
          else{
            return res.status(202).send({ data: googleUserInfo.email, message: "회원가입을 위해 이메일을 제외한 정보를 입력해주세요." });
          }
        }
        else{
          return res.status(400).send({ message: "구글 유저정보 없음" });
        }
      })
  })
  .catch((e) => console.log(e));
};