var t = require("../../utils/util.js"), e = require("../../utils/base64.js"), a = getApp();

Page({
    data: {
        text: "",
        back: ""
    },
    msg: function() {
        if (t.isLogin()) {
            var e = this;
            t.req("api/msg/getall", {
                sk: a.globalData.sk
            }, function(t) {
                var a = 0, n = 0, o = 0;
                if (null == t.data) {
                    t = {
                        zan: a,
                        comment: n,
                        notice: o
                    };
                    return e.setData({
                        data: t
                    }), !1;
                }
                t.data.forEach(function(t) {
                    "zan" == t.type && (a = t.count), "comment" == t.type && (n = t.count), "notice" == t.type && (o = t.count);
                });
                var t = {
                    zan: a,
                    comment: n,
                    notice: o
                };
                e.setData({
                    data: t
                });
            });
        }
    },
    onShow: function() {
        this.msg();
    },
    onPullDownRefresh: function() {
        this.msg(), wx.stopPullDownRefresh();
    },
    sendEmoji: function(t) {
        console.log("sendEmojisendEmoji : " + this.data.text);
        var n = this;
        wx.request({
            url: a.serverConfig.ip_address + "/home/Emoji/index",
            data: {
                str: e.encode(n.data.text)
            },
            method: "post",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log("sendEmoji success : " + JSON.stringify(t.data)), n.setData({
                    back: e.decode(t.data)
                });
            },
            fail: function() {
                console.log("sendEmoji fail : " + JSON.stringify(res.data));
            }
        });
    },
    bindKeyInput: function(t) {
        this.setData({
            text: t.detail.value
        });
    }
});