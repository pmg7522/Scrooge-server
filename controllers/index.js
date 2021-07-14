module.exports = {
  refreshTokenRequest: require("./users/refreshTokenRequest"),

  changepassword: require("./users/changepassword"),

  socialsignup: require("./users/socialsignup"),

  findpassword: require("./users/findpassword"),

  fixuserinfo: require("./users/fixuserinfo"),

  googlelogin: require("./users/googlelogin"),

  googlecheck: require("./users/googlecheck"),

  deleteuser: require("./users/deleteuser"),

  initialize: require("./users/initialize"),

  kakaologin: require("./users/kakaologin"),

  kakaocheck: require("./users/kakaocheck"),

  checkemail: require("./users/checkemail"),

  signout: require("./users/signout"),

  signup: require("./users/signup"),

  login: require("./users/login"),

  changemainpage: require("./settings/changemainpage"),

  importexcel: require("./settings/importexcel"),

  deletedata: require("./settings/deletedata"),

  darkmode: require("./settings/darkmode"),

  createcategoryinfo: require("./category/createcategoryinfo"),

  fixcategoryinfo: require("./category/fixcategoryinfo"),

  deletecategory: require("./category/deletecategory"),

  categorysort: require("./category/categorysort"),

  budget: require("./category/budget"),

  createspendmoney: require("./day/createspendmoney"),

  deletespendmoney: require("./day/deletespendmoney"),

  editspendmoney: require("./day/editspendmoney"),

  daypage: require("./day/daypage"),

  getmonthlydata: require("./month/getmonthlydata"),

  getyearlydata: require("./year/getyearlydata"),

  getPhoto: require("./settings/getPhoto"),
};
