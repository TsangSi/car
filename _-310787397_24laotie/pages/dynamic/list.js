var t = require("../../utils/util.js"), n = getApp(), e = 0, a = 1, i = new Array();

Page({
    data: {},
    getList: function(e) {
        if (t.isLogin()) {
            var o = this;
            t.req("api/msg/get", {
                type: e,
                sk: n.globalData.sk,
                page: a
            }, function(n) {
                if (null == n.data) return o.setData({
                    isnull: !0,
                    nomore: !0
                }), !1;
                1 == a && (i = new Array()), n.data.forEach(function(n) {
                    var e = n.avatarUrl;
                    e || (e = "/img/account.png"), i.push({
                        time: t.getDateBiff(1e3 * n.time),
                        content: n.content,
                        nickName: n.nickName ? n.nickName : n.name,
                        avatarUrl: e,
                        url: n.url
                    });
                }), o.setData({
                    msg: i
                });
            });
        }
    },
    onLoad: function(t) {
        e = t.id, this.getList(t.id);
        var n = null;
        wx.createInterstitialAd && ((n = wx.createInterstitialAd({
            adUnitId: "adunit-60930b7e2fe9e9d4"
        })).onLoad(function() {}), n.onError(function(t) {}), n.onClose(function() {})), 
        n && n.show().catch(function(t) {
            console.error(t);
        });
    },
    onPullDownRefresh: function() {
        a = 1, this.getList(e), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.nomore || (a++, this.getList(e));
    }
});