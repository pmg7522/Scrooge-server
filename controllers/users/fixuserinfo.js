const { isAuthorized } = require('../functions');
const { user } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
  try{
    const { username, password } = req.body;

    const data = isAuthorized(req);
  
    if (data) {
      // const hash = crypto.createHmac("sha256", process.env.SALT).update(password).digest("hex");
      await user.update({ username, password, photo: "/uploads/" + req.file.filename }, { where: { id: data.id } });

      const newUserInfo = await user.findOne({ where: { id: data.id }, raw: true });
      delete newUserInfo.password;
      console.log(req.body)
      return res.status(200).send({ 
          message: "수정 되었습니다", 
          data: { user: newUserInfo }
      });
    }
    else{
      console.log(err);
      return res.status(500).send({ message: "We Don't Know" });
    }
  }
  catch(err){
    console.log(err)
  }
}