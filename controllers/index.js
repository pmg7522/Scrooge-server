module.exports = {
    signup: require("./users/signup"),

    login: require("./users/login"),

    fixuserinfo: require("./users/fixuserinfo"),

    signout: require("./users/signout"),

    deleteuser: require("./users/deleteuser"),

    initialize: require("./users/initialize"),

    kakaologin: require("./users/kakaologin"),

    googlelogin: require("./users/googlelogin"),

    kakaosignup: require("./users/kakaosignup"),

    googlesignup: require("./users/googlesignup"),

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

    daypage: require("./day/daypage"),

    editspendmoney: require("./day/editspendmoney"),

    createspendmoney: require("./day/createspendmoney"),

    deletespendmoney: require("./day/deletespendmoney"),

    getmonthlydata: require("./month/getmonthlydata"),
    
    getyearlydata: require("./year/getyearlydata"),
}