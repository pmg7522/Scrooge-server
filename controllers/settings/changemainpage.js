const { user } = require('../../models');
const { isAuthorized } = require("../functions")

module.exports = async (req, res) => {
    try{
        const { redirect } = req.body;
        const data = isAuthorized(req);
    
        if(data){
            await user.update({ redirect }, { where: { id: data.id } });
    
            return res.status(200).send({ message: "redirect 페이지 설정 완료" });
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