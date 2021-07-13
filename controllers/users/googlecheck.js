const { user } = require("../../models");
const axios = require("axios");

module.exports = (req, res) => {
  if (!req.body.authorizationCode) {
    return res.status({ message: "Unauthorized" });
  }

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const GOOGLE_REDIRECT_URI = process.env.GOOGLE_SIGNUP_REDIRECT_URI;
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

            const realGoogleUser = await user.findOne({
              where: { email: googleUserInfo.email },
            });

            if (realGoogleUser) {
              return res
                .status(409)
                .send({ message: "이미 가입되어있는 이메일입니다." });
            } else {
              return res.status(200).send({ data: googleUserInfo.email });
            }
          } else {
            return res.status(500).send({ message: "구글 유저정보 없음" });
          }
        });
    })
    .catch((e) => console.log(e));
};
