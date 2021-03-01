var t = getApp(), a = require("../../utils/util.js");

Page({
    data: {
        text: "",
        back: ""
    },
    msg: function() {
        if (a.isLogin()) {
            var e = this;
            a.req("api/msg/getall", {
                sk: t.globalData.sk
            }, function(t) {
                var a = 0, o = 0, n = 0;
                if (null == t.data) {
                    t = {
                        zan: a,
                        comment: o,
                        notice: n
                    };
                    return e.setData({
                        data: t
                    }), !1;
                }
                t.data.forEach(function(t) {
                    "zan" == t.type && (a = t.count), "comment" == t.type && (o = t.count), "notice" == t.type && (n = t.count);
                });
                var t = {
                    zan: a,
                    comment: o,
                    notice: n
                };
                e.setData({
                    data: t
                });
            });
        }
    },
    sendEmoji: function(a) {
        console.log("sendEmojisendEmoji : " + this.data.text);
        var e = this;
        wx.request({
            url: t.serverConfig.ip_address + "/home/Emoji/index",
            data: {
                str: base64.encode(e.data.text)
            },
            method: "post",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log("sendEmoji success : " + JSON.stringify(t.data)), e.setData({
                    back: base64.decode(t.data)
                });
            },
            fail: function() {
                console.log("sendEmoji fail : " + JSON.stringify(res.data));
            }
        });
    },
    onPullDownRefresh: function() {
        this.msg(), wx.stopPullDownRefresh();
    },
    bindKeyInput: function(t) {
        this.setData({
            text: t.detail.value
        });
    },
    onShow: function() {
        var e = this;
        e.setData({
            userInfo: t.globalData.userInfo
        }), a.req("api/info/mycount", {
            sk: t.globalData.sk
        }, function(t) {
            -1 !== t.status && e.setData({
                infoCount: t.data
            });
        }), this.msg();
    },
    clearCache: function() {
        console.log("清除缓存数据"), wx.clearStorage();
    },
    scanCode: function() {
        console.log("长按识别二维码 "), wx.scanCode({
            success: function(t) {
                console.log(t);
            }
        });
    }
});