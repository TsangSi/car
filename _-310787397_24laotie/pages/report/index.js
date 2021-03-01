var a = require("../../utils/util.js"), t = getApp();

Page({
    data: {
        typesway: [ {
            name: "1",
            value: "欺诈",
            checked: !0
        }, {
            name: "2",
            value: "色情"
        }, {
            name: "3",
            value: "不实信息"
        }, {
            name: "4",
            value: "违法违规"
        } ],
        skVal: "",
        uid: 0
    },
    formSubmit: function(e) {
        var i = e.detail.value;
        i.uid = this.data.uid, i.infoid = this.data.infoid, 1 == i.typesway && (i.text = "欺诈"), 
        2 == i.typesway && (i.text = "色情"), 3 == i.typesway && (i.text = "不实信息"), 4 == i.typesway && (i.text = "违法违规");
        var o = this;
        if (null == t.globalData.userInfo) return a.isError("需要登录才可以发单", o), void t.login();
        t.globalData.userInfo.phone || (t.globalData.userInfo.phone = i.phone), wx.getStorage({
            key: "sk",
            success: function(a) {
                o.setData({
                    skVal: a.data
                });
            }
        }), i.sk = t.globalData.sk ? t.globalData.sk : o.data.skVal, a.req("/api/info/report", i, function(a) {
            1 == a.status ? (wx.showToast({
                title: "举报成功"
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 2e3)) : wx.showToast({
                title: "举报失败"
            });
        });
    },
    onLoad: function(a) {
        console.log(a), this.setData({
            uid: a.uid,
            infoid: a.infoid
        });
    }
});