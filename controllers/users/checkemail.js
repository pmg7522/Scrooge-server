const { user } = require("../../models");

module.exports = async (req, res) => { 
    try{
        const { email } = req.body;
    
        const userInfo = await user.findOne({ where: { email: email } }) ;
        
            if (!userInfo) { 
                return res.status(200).send({ message: "데이터베이스에 없는 이메일입니다" });
            }
            else { 
                return res.status(409).send({ message: "가입 정보가 있습니다" });
            }
            console.log(err);
            return res.status(500).send({ message: "We Don't Know" });
        }
    catch(err){
        console.log(err)
    }
}

