const { isAuthorized } = require('../functions');
const { user } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
  try{
    const { password, newpassword } = req.body;

    const data = isAuthorized(req);

    if (data) {
        const originHash = crypto.createHmac("sha256", process.env.SALT).update(password).digest("hex");
        const authUser = await user.findOne({ where: { id: data.id }, raw: true })

        if(String(password).length === 6) {
          originHash = password
        }

        if (authUser.password !== originHash) {
            return res.status(400).send({ message: "기존 비밀번호를 정확하게 입력해주세요" })
        }
        
        const hash = crypto.createHmac("sha256", process.env.SALT).update(newpassword).digest("hex");
        await user.update({ password: hash }, { where: { id: data.id } });

        const newUserInfo = await user.findOne({ where: { id: data.id }, raw: true });

        delete newUserInfo.password;

          return res.status(200).send({ 
            message: "비밀번호가 수정 되었습니다", 
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