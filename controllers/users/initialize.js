const { isAuthorized } = require("../functions")
const { user } = require("../../models");
const fs = require("fs");
const imageDataUri = require("image-data-uri");

module.exports = async (req, res) => {
//  try{
    const data = isAuthorized(req);
    
    if(data){
      await user.findOne({ where: { id: data.id }, raw: true})
      .then((userData) => {
        const { username, email, experience, darkmode, redirect } = userData;
        let result = fs.readFileSync(`.${data.photo}`);
        let realphoto = imageDataUri.encode(result, "jpg");
        
        return res.status(200).send({ data: 
          { userInfo: { username, email, photo: realphoto, level: 1, experience }, userset: { darkmode, redirect }}});
      })
      .catch(err => {
        console.log(err)
        return res.status(500).send({ message: "We Don't Know" });
    })
    }
    else{
      return res.status(409).send({ message: "Invalid Data" });
    }
  // }
  // catch(err){
  //   console.log(err)
  // }
}