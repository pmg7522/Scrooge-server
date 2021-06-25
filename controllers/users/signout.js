module.exports = (req, res) => {
    const authorization = req.headers["authorization"];

    if (!authorization) { 
        return res.status(401).send({ "message": 'invalid access token'})
    }
    else {
        return res.status(200).cookie('refreshToken', '').send({ message: "로그아웃 완료" });
    }

    return res.status(500).send({ message: "Internal Server Error" })
}