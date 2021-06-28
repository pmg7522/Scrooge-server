const { isAuthorized } = require("../functions")
const { user, money } = require("../../models");

module.exports = async (req, res) => {
    const data = isAuthorized(req);

    if(data){
        await money.destroy({ where: { userId: data.id } });
    
        await user.destroy({ where: { id: data.id }});
    
        return res.status(205).send({ "message": '회원탈퇴 완료' });
    }
    else{
        console.log(err);
        return res.status(500).send({ message: "We Don't Know" });
    }
}