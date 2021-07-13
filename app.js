require("dotenv").config();
const cors = require("cors");
const controllers = require("./controllers");
const cookieParser = require("cookie-parser");
const models = require("./models");
const express = require("express")
const fs = require("fs");
const imageDataUri = require("image-data-uri");


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
    // signup page // 
    let signupPhotoOne = fs.readFileSync("./uploads/f02d50ca5222a7cda46266ecd1ade34c"); // 
    let signupPhotoTwo = fs.readFileSync("./uploads/1dd16f2b6cc5c530f28025a8f79db6b8");

    let macbook = imageDataUri.encode(signupPhotoOne, "jpg");
    let iphone = imageDataUri.encode(signupPhotoTwo, "jpg");

    // randing page // 
    let landingNotebook = fs.readFileSync("./uploads/a222b36b2c238da368ddef6e6eec3e98"); // 맥북
    let landingChromeBrower = fs.readFileSync("./uploads/884e198a266486bc96e7a2d9235fd730"); // 크롬 브라우저
    let landingMonthly = fs.readFileSync("./uploads/ea0da3497e94651df1b3ec379415e14f"); // monthly
    let landingDaily = fs.readFileSync("./uploads/2cb21d1644686da9ac6d429f58c8e26c"); // daily

    let landingIconImac = fs.readFileSync("./uploads/83c9525c89d6b9aa4651b65766dc3559"); // 3dIconImac
    let landingIconMacbook = fs.readFileSync("./uploads/920592705f332b242356b189bb42beda"); // 3dIconMacbook
    let landingIconTablet = fs.readFileSync("./uploads/7883b21f690031c85c6cfb962ffb414f"); // 3dIconTablet
    let landingIconPhone = fs.readFileSync("./uploads/42de8817686327b5b04ef87b5cf0c908"); // 3dIconPhone

    let notebook = imageDataUri.encode(landingNotebook, "jpg");
    let ChromeBrower = imageDataUri.encode(landingChromeBrower, "jpg");
    let Monthly = imageDataUri.encode(landingMonthly, "jpg");
    let Daily = imageDataUri.encode(landingDaily, "jpg");
    let IconImac = imageDataUri.encode(landingIconImac, "jpg");
    let IconMacbook = imageDataUri.encode(landingIconMacbook, "jpg");
    let IconTablet = imageDataUri.encode(landingIconTablet, "jpg");
    let IconPhone = imageDataUri.encode(landingIconPhone, "jpg");
    res.status(200).send({ data: { 
        signupPhotos: { macbook, iphone }, 
        landingPhotos: { notebook, ChromeBrower, Monthly, Daily, IconImac, IconMacbook, IconTablet, IconPhone } 
        } 
    })
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
app.post("/changepassword", controllers.changepassword);
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
app.post("/createcategoryinfo", controllers.createcategoryinfo);
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