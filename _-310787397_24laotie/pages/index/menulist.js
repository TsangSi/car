var t = getApp(), e = require("../../utils/util.js"), a = require("../../utils/base64.js"), i = 1;

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        seecomment: !1,
        comments: Array(),
        reply: "",
        menuList: [],
        id: 1
    },
    bindPickerChange: function(t) {
        console.log("picker1发送选择改变，携带值为", parseInt(t.detail.value) + 1), this.setData({
            index: t.detail.value
        }), i = 1, this.getList({
            id: this.data.id
        });
    },
    bindPickerType: function(t) {
        console.log("picker2发送选择改变，携带值为", parseInt(t.detail.value) + 1), this.setData({
            itemIndex: t.detail.value
        }), i = 1, this.getList({
            id: this.data.id
        });
    },
    bindGetUserInfo: function(t) {
        if (t.detail.userInfo) {
            t.currentTarget.dataset.url;
            wx.navigateTo({
                url: "/pages/index/add?id=" + this.data.id
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
        console.log(t), wx.previewImage({
            current: t.currentTarget.id,
            urls: e.data.list[t.currentTarget.dataset.name].img
        });
    },
    getList: function() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        var n = this, s = {
            page: i,
            sk: t.globalData.sk,
            id: this.data.id
        };
        null == t.globalData.sk && (s = {
            id: this.data.id
        }), e.req("api/dynamic/getlist", s, function(t) {
            var s = t.list, o = new Array();
            1 == i || (o = n.data.list), s && s.forEach(function(t) {
                t.comment && t.comment.forEach(function(t) {
                    t.content && (t.content = t.content), t.reply && (t.reply = t.reply);
                });
                var i = {
                    avatarUrl: t.avatarUrl,
                    content: a.decode(t.content),
                    id: t.id,
                    nickName: t.nickName,
                    time: e.getDateBiff(1e3 * t.time),
                    zan: t.zan,
                    iszan: t.iszan,
                    comments: t.comment,
                    dyType: t.dyType,
                    dyAddress: t.dyAddress,
                    phone: t.phone
                };
                o.push(i);
            }), n.setData({
                list: o
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
            var i = this;
            e.req("api/Dynamic/zan", {
                cid: a.currentTarget.dataset.id,
                sk: t.globalData.sk
            }, function(t) {
                if (1 == t.status) {
                    var e = t.zan;
                    t.zan > 1e3 && (e = "1000+");
                    var n = a.target.dataset.id, s = i.data.list;
                    s.forEach(function(t) {
                        t.id == n && (t.zan = e, t.iszan = !0);
                    }), i.setData({
                        list: s
                    });
                } else console.log(t.msg), wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1,
                    success: function(t) {}
                });
            }, "成功点赞", "点赞失败");
        } else t.login();
    },
    onLoad: function(t) {
        this.setData({
            id: t.id
        }), this.data.itemIndex = 0, this.data.index = 0, this.getList({
            id: t.id
        });
    },
    onReachBottom: function() {
        this.data.nomore || (i++, this.getList({
            id: this.data.id
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
    comment: function(i) {
        var n = this, s = i.detail.value;
        if ("" == s) return !1;
        if (e.isOrder(s)) {
            var o = "/pages/info/add?t=1&c=" + s;
            wx.navigateTo({
                url: o
            });
        } else e.req("api/comment/add", {
            iid: n.data.list[n.data.nowid].id,
            reply: n.data.reply.replace("回复", ""),
            type: "dynamic",
            content: a.encode(i.detail.value),
            sk: t.globalData.sk,
            isEncode: !0
        }, function(e) {
            if (1 == e.status) {
                var a = n.data.list;
                a[n.data.nowid].comments = a[n.data.nowid].comments ? a[n.data.nowid].comments : new Array(), 
                a[n.data.nowid].comments.push({
                    id: e.id,
                    iid: n.data.list[n.data.nowid].id,
                    content: i.detail.value,
                    nickName: t.globalData.userInfo.nickName,
                    reply: n.data.reply.replace("回复", "")
                });
            }
            n.setData({
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
        i = 1, this.getList({
            id: this.data.id
        }), wx.stopPullDownRefresh();
    }
});