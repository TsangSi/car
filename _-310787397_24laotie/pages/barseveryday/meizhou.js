require("../../utils/util.js");

Page({
    data: {
        itemList: [],
        addressList: [ {
            id: 1,
            value: "梅县"
        }, {
            id: 2,
            value: "兴宁"
        }, {
            id: 3,
            value: "五华"
        }, {
            id: 4,
            value: "大埔"
        }, {
            id: 5,
            value: "丰顺"
        }, {
            id: 6,
            value: "平远"
        }, {
            id: 7,
            value: "蕉岭"
        }, {
            id: 8,
            value: "首页"
        } ],
        departList: [ {
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
        } ],
        address: "",
        fid: 0
    },
    onLoad: function(i) {
        console.log(this.data.departList[i.id]), this.setData({
            address: this.data.departList[i.id].value
        }), this.setData({
            fid: i.id
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