const { user } = require("../../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = async (req, res) => { 

  const { email } = req.body

  const userinfo = await user.findOne({ where: { email: email } }) 
  
    if (!userinfo) { 
        res.status(200).send({ message: "데이터베이스에 없는 이메일입니다" })
    }
    else { 
        res.status(409).send({ message: "가입 정보가 있습니다" })
    }

    res.status(500).send({ message: "서버에러" })
}

