const { user } = require('../../models');
const { isAuthorized } = require("../functions")

module.exports = async (req, res) => {
    try{
        const { darkmode } = req.body;
        const data = isAuthorized(req);
    
        if(data){
            await user.update( { darkmode }, { where: { id: data.id } });
    
            return res.status(200).send({ message: "다크모드 설정 변경 완료" });
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