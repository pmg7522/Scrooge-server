const { user } = require('../../models');
const { isAuthorized } = require("../functions")

module.exports = (req, res) => {
    const { redirect } = req.body;
    const data = isAuthorized(req);

    if(data){
        await user.update( { redirect }, { where: { id: data.id } });

        return res.status(200).send({ message: "메인페이지 변경 완료" });
    }
    else{
        console.log(err);
        return res.status(500).send({ message: "We Don't Know" });
    }
}