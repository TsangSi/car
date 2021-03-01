var t = getApp(), e = require("../../utils/util.js"), a = require("../../utils/base64.js"), n = 1;

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        seecomment: !1,
        comments: Array(),
        reply: "",
        itemIndex: 0,
        index: 0,
        imgUrls: [],
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        menuList: []
    },
    bindPickerChange: function(t) {
        this.setData({
            index: t.detail.value
        }), n = 1, this.getList({
            dyType: this.data.itemIndex,
            dyAddress: this.data.index
        });
    },
    bindPickerType: function(t) {
        this.setData({
            itemIndex: t.detail.value
        }), n = 1, this.getList({
            dyType: this.data.itemIndex,
            dyAddress: this.data.index
        });
    },
    bindGetUserInfo: function(t) {
        if (t.detail.userInfo) {
            t.currentTarget.dataset.url;
            wx.navigateTo({
                url: "/pages/barsDynamic/add"
            });
        } else wx.showModal({
            content: "您已拒绝授权",
            showCancel: !1,
            confirmText: "知道了",
            success: function(t) {}
        });
    },
    previeimg: function(t) {
        var e = this;
        wx.previewImage({
            current: t.currentTarget.id,
            urls: e.data.list[t.currentTarget.dataset.name].img
        });
    },
    getList: function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = this, s = 0, d = 0;
        a.dyAddress && (s = a.dyAddress), a.dyType && (d = a.dyType);
        var r = {
            page: n,
            sk: t.globalData.sk,
            dyAddress: s,
            dyType: d
        };
        null == t.globalData.sk && (r = {
            page: n,
            dyAddress: s,
            dyType: d
        }), e.req("api/bardynamic/getlist", r, function(t) {
            var e = t.list, a = new Array();
            1 == n || (a = i.data.list), e && e.forEach(function(t) {
                t.comment && t.comment.forEach(function(t) {
                    t.content && (t.content = t.content), t.reply && (t.reply = t.reply);
                });
                var e = "";
                t.content.length > 18 ? (e = t.content.substr(0, 18), e += "...") : e = t.content;
                var n = {
                    avatarUrl: t.avatarUrl,
                    content: e,
                    id: t.id,
                    uid: t.uid,
                    img: JSON.parse(t.img),
                    nickName: t.nickName,
                    type: t.type,
                    address: t.address,
                    phone: t.phone
                };
                a.push(n);
            }), i.setData({
                list: a
            });
        });
    },
    call: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    zan: function(a) {
        if (e.isLogin()) {
            var n = this;
            e.req("api/Dynamic/zan", {
                cid: a.currentTarget.dataset.id,
                sk: t.globalData.sk
            }, function(t) {
                if (1 == t.status) {
                    var e = t.zan;
                    t.zan > 1e3 && (e = "1000+");
                    var i = a.target.dataset.id, s = n.data.list;
                    s.forEach(function(t) {
                        t.id == i && (t.zan = e, t.iszan = !0);
                    }), n.setData({
                        list: s
                    });
                } else wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1,
                    success: function(t) {}
                });
            }, "成功点赞", "点赞失败");
        } else t.login();
    },
    onShow: function(t) {
        this.data.itemIndex = 0, this.data.index = 0, this.getList({
            dyType: this.data.itemIndex,
            dyAddress: this.data.index
        });
    },
    onReachBottom: function() {
        this.data.nomore || (n++, this.getList({
            dyType: this.data.itemIndex,
            dyAddress: this.data.index
        }));
    },
    seecomment: function(e) {
        if (t.globalData && t.globalData.userInfo && null != t.globalData.userInfo) {
            var a = e.target.dataset.name ? "回复" + e.target.dataset.name : "";
            this.setData({
                reply: a,
                seecomment: !0,
                nowid: e.currentTarget.id
            });
        } else t.login();
    },
    comment: function(n) {
        var i = this, s = n.detail.value;
        if ("" == s) return !1;
        if (e.isOrder(s)) {
            var d = "/pages/info/add?t=1&c=" + s;
            wx.navigateTo({
                url: d
            });
        } else e.req("api/comment/add", {
            iid: i.data.list[i.data.nowid].id,
            reply: i.data.reply.replace("回复", ""),
            type: "dynamic",
            content: a.encode(n.detail.value),
            sk: t.globalData.sk,
            isEncode: !0
        }, function(e) {
            if (1 == e.status) {
                var a = i.data.list;
                a[i.data.nowid].comments = a[i.data.nowid].comments ? a[i.data.nowid].comments : new Array(), 
                a[i.data.nowid].comments.push({
                    id: e.id,
                    iid: i.data.list[i.data.nowid].id,
                    content: n.detail.value,
                    nickName: t.globalData.userInfo.nickName,
                    reply: i.data.reply.replace("回复", "")
                });
            }
            i.setData({
                list: a
            });
        });
    },
    hidecomment: function() {
        this.setData({
            seecomment: !1
        });
    },
    onPullDownRefresh: function() {
        n = 1, this.getList({
            dyType: this.data.itemIndex,
            dyAddress: this.data.index
        }), wx.stopPullDownRefresh();
    }
});