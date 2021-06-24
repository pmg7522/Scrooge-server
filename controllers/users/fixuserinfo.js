const { user } = require("../../models");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

module.exports = async (req, res) => {
  const { username, password } = req.body
  
  const authorization = req.headers["authorization"];
  
  if (!authorization) { 
    return res.status(401).send({ "message": "Unauthorized" })
  }
  
  const token = authorization.split(" ")[1];
  const data = jwt.verify(token, process.env.ACCESS_SECRET);
  
  if (data) {
    const hash = crypto.createHmac("sha256", process.env.SALT).update(password).digest("hex");
    await user.update({ username, password: hash, photo: "/uploads/" + req.file.filename }, { where: { id: data.id } })

    const newUserInfo = await user.findOne({ where: { id: data.id }, raw: true })

    delete newUserInfo.password

    return res.status(200).send({ 
        message: "수정 되었습니다", 
        data: { user: newUserInfo }
    })
  }
}