var i = require("../../utils/util.js");

Page({
    data: {
        itemList: [],
        addressList: [ {
            id: 1,
            value: "广州"
        }, {
            id: 2,
            value: "深圳"
        }, {
            id: 3,
            value: "佛山"
        }, {
            id: 4,
            value: "东莞"
        }, {
            id: 5,
            value: "惠州"
        }, {
            id: 6,
            value: "珠海"
        }, {
            id: 7,
            value: "中山"
        }, {
            id: 8,
            value: "汕头"
        } ]
    },
    onLoad: function(n) {
        var a = this;
        i.req("api/dynamic/getbarslist", "", function(i) {
            a.setData({
                itemList: i.data
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});