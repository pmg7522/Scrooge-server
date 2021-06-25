require("dotenv").config();
const cors = require("cors");
const controllers = require("./controllers");
const cookieParser = require("cookie-parser");
const models = require("./models");
const express = require("express")
const fs = require("fs");
const https = require("https");


const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();

app.use(express.json());
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
const port = 3000; // 배포환경 http: 80 // https: 443

app.get("/", (req, res) => {
    res.status(200).json("Hello World")
})

// users
app.post("/signup", upload.single('photo'), controllers.signup);
app.post("/fixuserinfo", upload.single('photo'), controllers.fixuserinfo);
app.post("/login", controllers.login);
app.post("/kakaologin", controllers.kakaologin);
app.post("/googlelogin", controllers.googlelogin);
app.post("/checkemail", controllers.checkemail);
app.get("/signout", controllers.signout);
app.get("/deleteuser", controllers.deleteuser);
app.get("/initialize", controllers.initialize);

// settings
app.post("/darkmode", controllers.darkmode);
app.post("/changemainpage", controllers.changemainpage);
app.get("/deletedata", controllers.deletedata);

// category
app.post("/fixcategoryinfo", controllers.fixcategoryinfo);
app.get("/budget", controllers.budget);
app.get("/deletecategory", controllers.deletecategory);
app.get("/getcategoryinfo", controllers.getcategoryinfo);

// day
app.post("/editspendmoney", controllers.editspendmoney);
app.post("/createspendmoney", controllers.createspendmoney);
app.post("/deletespendmoney", controllers.deletespendmoney);
app.get("/daypage", controllers.daypage);

// month
app.get("/getmonthlydata", controllers.getmonthlydata);

// year
app.get("/getyearlydata", controllers.getyearlydata);

let server;

server = app.listen(port, () => {
    console.log(`서버가 ${port}번에서 작동중입니다.`)
})
// let server;
// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(port, () => console.log(`https 서버가 ${port}번에서 작동중입니다.`));

// } else {
//   server = app.listen(port)
// }
module.exports = server;