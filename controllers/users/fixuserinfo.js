const { isAuthorized } = require('../functions');
const { user } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
<<<<<<< HEAD
  const { username, password } = req.body;

  const data = isAuthorized(req);

  if (data) {
    const hash = crypto.createHmac("sha256", process.env.SALT).update(password).digest("hex");
    await user.update({ username, password: hash, photo: "/uploads/" + req.file.filename }, { where: { id: data.id } });

    const newUserInfo = await user.findOne({ where: { id: data.id }, raw: true });

    delete newUserInfo.password;

    return res.status(200).send({ 
        message: "수정 되었습니다", 
        data: { user: newUserInfo }
    });
=======
  try{
    const { username, password } = req.body;
  
    const data = isAuthorized(req);
  
    if (data) {
      // const hash = crypto.createHmac("sha256", process.env.SALT).update(password).digest("hex");
      await user.update({ username, password, photo: "/uploads/" + req.file.filename }, { where: { id: data.id } });
  
      const newUserInfo = await user.findOne({ where: { id: data.id }, raw: true });
  
      delete newUserInfo.password;
  
      return res.status(200).send({ 
          message: "수정 되었습니다", 
          data: { user: newUserInfo }
      });
    }
    else{
      console.log(err);
      return res.status(500).send({ message: "We Don't Know" });
    }
>>>>>>> ef94641d0622daccd81870b7a9d280fe58f2b7f9
  }
  catch(err){
    console.log(err)
  }
}