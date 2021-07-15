const cookieParser = require("cookie-parser");
const models = require("./models");
const express = require("express");
const fs = require("fs");
const imageDataUri = require("image-data-uri");
const cors = require("cors");
const controllers = require("./controllers");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
const port = 3000; // 배포환경: 80

app.get("/", controllers.getPhoto);

// users
app.post("/socialsignup", upload.single("photo"), controllers.socialsignup);
app.post("/fixuserinfo", upload.single("photo"), controllers.fixuserinfo);
app.post("/signup", upload.single("photo"), controllers.signup);
app.post("/changepassword", controllers.changepassword);
app.post("/findpassword", controllers.findpassword);
app.post("/googlelogin", controllers.googlelogin);
app.post("/googlecheck", controllers.googlecheck);
app.post("/kakaologin", controllers.kakaologin);
app.post("/kakaocheck", controllers.kakaocheck);
app.post("/checkemail", controllers.checkemail);
app.post("/login", controllers.login);
app.get("/refreshTokenRequest", controllers.refreshTokenRequest);
app.get("/deleteuser", controllers.deleteuser);
app.get("/initialize", controllers.initialize);
app.get("/signout", controllers.signout);

// settings
app.post("/changemainpage", controllers.changemainpage);
app.post("/darkmode", controllers.darkmode);
app.get("/importexcel", controllers.importexcel);
app.get("/deletedata", controllers.deletedata);

// category
app.post("/createcategoryinfo", controllers.createcategoryinfo);
app.post("/fixcategoryinfo", controllers.fixcategoryinfo);
app.post("/deletecategory", controllers.deletecategory);
app.post("/categorysort", controllers.categorysort);
app.get("/budget", controllers.budget);

// day
app.post("/createspendmoney", controllers.createspendmoney);
app.post("/deletespendmoney", controllers.deletespendmoney);
app.post("/editspendmoney", controllers.editspendmoney);
app.get("/daypage", controllers.daypage);

// month
app.get("/getmonthlydata", controllers.getmonthlydata);

// year
app.get("/getyearlydata", controllers.getyearlydata);

let server;

server = app.listen(port, () => {
  console.log(`서버가 ${port}번에서 작동중입니다.`);
});

module.exports = server;
