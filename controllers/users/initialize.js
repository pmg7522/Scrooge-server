const { isAuthorized } = require("../functions");
const { user } = require("../../models");
const fs = require("fs");
const imageDataUri = require("image-data-uri");

module.exports = async (req, res) => {
  try {
    const data = isAuthorized(req);

    if (data) {
      const userinfo = await user.findOne({
        where: { id: data.id },
        raw: true,
      });
      const { username, email, experience, darkmode, redirect, photo } =
        userinfo;

      let photoinfo;
      try {
        photoinfo = fs.readFileSync(`.${photo}`);
        let realphoto = imageDataUri.encode(photoinfo, "jpg");

        return res.status(200).send({
          data: {
            userInfo: {
              username,
              email,
              photo: realphoto,
              level: 1,
              experience,
            },
            userset: { darkmode, redirect },
          },
        });
      } catch (err) {
        if (err.code) {
          console.log("사진 정보를 찾을 수 없습니다");
        } else {
          throw err;
        }
        let defaultValue = "/uploads/c3195109635ceae9245b3e023ed673c8"; // 디폴트 사진
        photoinfo = fs.readFileSync(`.${defaultValue}`);
        let realphoto = imageDataUri.encode(photoinfo, "jpg");

        return res.status(200).send({
          data: {
            userInfo: {
              username,
              email,
              photo: realphoto,
              level: 1,
              experience,
            },
            userset: { darkmode, redirect },
          },
        });
      }
    } else {
      return res.status(409).send({ message: "Invalid Data" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "We Don't Know" });
  }
};

//   module.exports = async (req, res) => {
//     const data = isAuthorized(req);

//     if(data){
//       await user.findOne({ where: { id: data.id }, raw: true})
//       .then((userData) => {
//         const { username, email, experience, darkmode, redirect } = userData;
//         let result = fs.readFileSync(`.${data.photo}`);
//         let realphoto = imageDataUri.encode(result, "jpg");

//         return res.status(200).send({ data:
//           { userInfo: { username, email, photo: realphoto, level: 1, experience }, userset: { darkmode, redirect }}});
//       })
//       .catch(err => {
//         console.log(err)
//         return res.status(500).send({ message: "We Don't Know" });
//     })
//     }
//     else{
//       return res.status(409).send({ message: "Invalid Data" });
//     }
// }
