const { user } = require("../../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
  const authorization = req.headers["authorization"];
  
  if (!authorization) { 
    return res.status(401).send({ "message": "Unauthorized" })
  }
  
  const token = authorization.split(" ")[1];
  const data = jwt.verify(token, process.env.ACCESS_SECRET);

  const { username, email, photo, experience, darkmode } = await user.findOne({ where: { id: data.id }, raw: true})

  res.status(200).send({ data: 
    { userInfo: { username, email, photo, experience }}, userset: { darkmode }})
}