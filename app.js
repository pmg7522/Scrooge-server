require("dotenv").config();
const cors = require("cors");
const controllers = require("./controllers");
const cookieParser = require("cookie-parser");
const models = require("./models");
const express = require("express")
<<<<<<< HEAD
=======
const fs = require("fs");
const https = require("https");
>>>>>>> 19104740efc0c7fcfc0d041e918d839c09ab03e0

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
const port = 3000; // 배포환경: 80

app.get("/", (req, res) => {
    res.status(200).json("Hello World")
})

// users
app.post("/signup", upload.single('photo'), controllers.signup);
app.post("/fixuserinfo", upload.single('photo'), controllers.fixuserinfo);
app.post("/login", controllers.login);
app.post("/kakaologin", controllers.kakaologin);
app.post("/googlelogin", controllers.googlelogin);
app.post("/kakaocheck", controllers.kakaocheck);
app.post("/googlecheck", controllers.googlecheck);
app.post("/checkemail", controllers.checkemail);
app.post("/findpassword", controllers.findpassword);
app.post("/socialsignup", upload.single('photo'), controllers.socialsignup);
app.post("/categorysort", controllers.categorysort);
app.get("/refreshTokenRequest", controllers.refreshTokenRequest);
app.get("/signout", controllers.signout);
app.get("/deleteuser", controllers.deleteuser);
app.get("/initialize", controllers.initialize);

// settings
app.post("/darkmode", controllers.darkmode);
app.post("/changemainpage", controllers.changemainpage);
app.get("/deletedata", controllers.deletedata);
app.get("/importexcel", controllers.importexcel);

// category
app.post("/fixcategoryinfo", controllers.fixcategoryinfo);
app.post("/getcategoryinfo", controllers.getcategoryinfo);
app.post("/deletecategory", controllers.deletecategory);
app.get("/budget", controllers.budget);

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

module.exports = server;