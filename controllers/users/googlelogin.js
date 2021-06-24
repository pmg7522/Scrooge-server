const axios = require("axios");

module.exports = (req, res) => {
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
        .then((response) => {
          if (response.data) {
            googleUserInfo.email = response.data.email;
            googleUserInfo.username = response.data.name;
          }
          return res.
          status(200)
          .cookie("refreshToken", refresh_token, {
            sameSite: "none",
            secure: true,
            httpOnly: true
          })
          .send({ user: googleUserInfo, accessToken: access_token, refreshToken: refresh_token })
        })
    })
    .catch((e) => console.log(e));
};