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

app.get("/", (req, res) => {
  // signup page //
  let signupPhotoOne = fs.readFileSync(
    "./uploads/f02d50ca5222a7cda46266ecd1ade34c"
  );
  let signupPhotoTwo = fs.readFileSync(
    "./uploads/1dd16f2b6cc5c530f28025a8f79db6b8"
  );

  let macbook = imageDataUri.encode(signupPhotoOne, "jpg");
  let iphone = imageDataUri.encode(signupPhotoTwo, "jpg");

  // landing page //
  let landingNotebook = fs.readFileSync(
    "./uploads/a222b36b2c238da368ddef6e6eec3e98"
  ); // 맥북
  let landingChromeBrower = fs.readFileSync(
    "./uploads/884e198a266486bc96e7a2d9235fd730"
  ); // 크롬 브라우저
  let landingMonthly = fs.readFileSync(
    "./uploads/ea0da3497e94651df1b3ec379415e14f"
  ); // monthly
  let landingDaily = fs.readFileSync(
    "./uploads/2cb21d1644686da9ac6d429f58c8e26c"
  ); // daily
  let landingIconImac = fs.readFileSync(
    "./uploads/83c9525c89d6b9aa4651b65766dc3559"
  ); // 3dIconImac
  let landingPieChart = fs.readFileSync(
    "./uploads/4d84f16e6e8574197a5b8b384769bfa5"
  ); // piechart
  let landingIconMacbook = fs.readFileSync(
    "./uploads/920592705f332b242356b189bb42beda"
  ); // 3dIconMacbook
  let landingIconTablet = fs.readFileSync(
    "./uploads/7883b21f690031c85c6cfb962ffb414f"
  ); // 3dIconTablet
  let landingIconPhone = fs.readFileSync(
    "./uploads/42de8817686327b5b04ef87b5cf0c908"
  ); // 3dIconPhone
  let landingTopper = fs.readFileSync(
    "./uploads/003fe7241b264157ecb91120e474ff93"
  ); // Topper
  let landingDailyPage = fs.readFileSync(
    "./uploads/360bac7ac283e00d1cf2724778b8a0b8"
  ); // DailyPage
  let landingMonthlyPage = fs.readFileSync(
    "./uploads/bbdd69662d35de7c1620abdd4409e6b8"
  ); // MonthlyPage
  let landingYearlyPage = fs.readFileSync(
    "./uploads/d434f8bcb72a3c0e915730f24683d2ef"
  ); // YearlyPage

  let notebook = imageDataUri.encode(landingNotebook, "jpg");
  let ChromeBrower = imageDataUri.encode(landingChromeBrower, "jpg");
  let Monthly = imageDataUri.encode(landingMonthly, "jpg");
  let Daily = imageDataUri.encode(landingDaily, "jpg");
  let IconImac = imageDataUri.encode(landingIconImac, "jpg");
  let IconMacbook = imageDataUri.encode(landingIconMacbook, "jpg");
  let IconTablet = imageDataUri.encode(landingIconTablet, "jpg");
  let IconPhone = imageDataUri.encode(landingIconPhone, "jpg");
  let Topper = imageDataUri.encode(landingTopper, "jpg");
  let DailyPage = imageDataUri.encode(landingDailyPage, "jpg");
  let MonthlyPage = imageDataUri.encode(landingMonthlyPage, "jpg");
  let YearlyPage = imageDataUri.encode(landingYearlyPage, "jpg");
  let PieChart = imageDataUri.encode(landingPieChart, "jpg");

  res.status(200).send({
    data: {
      signupPhotos: { macbook, iphone },
      landingPhotos: {
        notebook,
        ChromeBrower,
        Monthly,
        Daily,
        IconImac,
        IconMacbook,
        IconTablet,
        IconPhone,
        Topper,
        DailyPage,
        MonthlyPage,
        YearlyPage,
        PieChart,
      },
    },
  });
});

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
