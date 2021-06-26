const { user } = require("../../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs")
const imageDataUri = require("image-data-uri")

module.exports = async (req, res) => {
  const authorization = req.headers["authorization"];
  
  if (!authorization) { 
    return res.status(401).send({ "message": "Unauthorized" })
  }
  else {
    const token = authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
  
    const { username, email, experience, darkmode } = await user.findOne({ where: { id: data.id }, raw: true})
  
    let result = fs.readFileSync(`.${data.photo}`)
    let realphoto = imageDataUri.encode(result, "jpg")

    return res.status(200).send({ data: 
      { userInfo: { username, email, photo: realphoto, level: 1, experience }}, userset: { darkmode }})
  }
  return res.status(500).send({ message: "Internal Server Error" })
}