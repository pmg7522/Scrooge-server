const { isAuthorized } = require("../functions");
const { user } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { username } = req.body;

    const data = isAuthorized(req);

    if (data) {
      if (username) {
        if (!req.file) {
          await user.update({ username }, { where: { id: data.id } });

          const newUserInfo = await user.findOne({
            where: { id: data.id },
            raw: true,
          });

          delete newUserInfo.password;
          return res.status(200).send({
            message: "수정 되었습니다",
            data: { user: newUserInfo },
          });
        } else {
          await user.update(
            { username, photo: "/uploads/" + req.file.filename },
            { where: { id: data.id } }
          );

          const newUserInfo = await user.findOne({
            where: { id: data.id },
            raw: true,
          });

          delete newUserInfo.password;
          return res.status(200).send({
            data: { user: newUserInfo },
            message: "수정 되었습니다",
          });
        }
      } else {
        if (req.file) {
          await user.update(
            { photo: "/uploads/" + req.file.filename },
            { where: { id: data.id } }
          );

          const newUserInfo = await user.findOne({
            where: { id: data.id },
            raw: true,
          });

          delete newUserInfo.password;
          return res.status(200).send({
            data: { user: newUserInfo },
            message: "수정 되었습니다",
          });
        } else {
          res
            .status(400)
            .send({ message: "수정하고 싶은 정보를 입력해주세요" });
        }
      }
    } else {
      console.log(err);
      return res.status(500).send({ message: "We Don't Know" });
    }
  } catch (err) {
    console.log(err);
  }
};
