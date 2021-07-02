module.exports = {
    signup: require("./users/signup"),

    login: require("./users/login"),

    fixuserinfo: require("./users/fixuserinfo"),

    signout: require("./users/signout"),

    deleteuser: require("./users/deleteuser"),

    initialize: require("./users/initialize"),

    kakaologin: require("./users/kakaologin"),

    googlelogin: require("./users/googlelogin"),

    kakaocheck: require("./users/kakaocheck"),

    googlecheck: require("./users/googlecheck"),

    socialsignup: require("./users/socialsignup"),

    findpassword: require("./users/findpassword"),

    checkemail: require("./users/checkemail"),

    refreshTokenRequest: require("./users/refreshTokenRequest"),

    darkmode: require("./settings/darkmode"),

    changemainpage: require("./settings/changemainpage"),

    deletedata: require("./settings/deletedata"),

    fixcategoryinfo: require("./category/fixcategoryinfo"),
    
    budget: require("./category/budget"),

    deletecategory: require("./category/deletecategory"),
    
    getcategoryinfo: require("./category/getcategoryinfo"),

    categorysort: require("./category/categorysort"),

    daypage: require("./day/daypage"),

    editspendmoney: require("./day/editspendmoney"),

    createspendmoney: require("./day/createspendmoney"),

    deletespendmoney: require("./day/deletespendmoney"),

    getmonthlydata: require("./month/getmonthlydata"),
    
    getyearlydata: require("./year/getyearlydata"),
}