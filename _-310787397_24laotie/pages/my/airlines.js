var i = getApp(), n = require("../../utils/util.js");

Page({
    openAirLines: function() {
        console.log("消息被点击");
    },
    onLoad: function() {
        n.isLogin() || i.login();
    }
});