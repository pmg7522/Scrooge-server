const { isAuthorized } = require("../functions");

module.exports = (req, res) => {
  try {
    const data = isAuthorized(req);

    if (data)
      res.status(200).cookie("refreshToken").send({ message: "로그아웃 완료" });

    return res.status(500).send({ message: "We Don't Know" });
  } catch (err) {
    console.log(err);
  }
};
