var t = require("../../utils/util.js"), a = require("../../utils/base64.js"), e = getApp(), i = 1, n = new Array();

Page({
    data: {
        "data.id": 0,
        back: !1,
        nomore: !1,
        shoucang: !1,
        notme: !0,
        modalFlag: !1,
        type: 1,
        showModal: !1
    },
    tel: function() {
        var t = this;
        wx.makePhoneCall({
            phoneNumber: t.data.data.phone
        });
    },
    noTel: function() {
        wx.showModal({
            title: "提示",
            content: "你尚未发布或发布已过期无法查看联系方式,请在首页点击发布按钮发布即可查看联系方式",
            confirmText: "关闭",
            showCancel: !1,
            success: function(t) {}
        });
    },
    tocomment: function() {
        this.setData({
            toview: "comment_list"
        });
    },
    zan: function(a) {
        if (t.isLogin()) {
            var i = this, n = this.data.comment;
            t.req("api/comment/zan", {
                cid: n[a.currentTarget.id].id,
                sk: e.globalData.sk
            }, function(t) {
                1 == t.status ? (wx.showToast({
                    title: "成功点赞",
                    mask: !0,
                    icon: "success"
                }), n[a.currentTarget.id].zan = t.zan, n[a.currentTarget.id].iszan = !0, i.setData({
                    comment: n
                })) : (console.log(t.msg), wx.showModal({
                    title: "提示",
                    content: t.msg,
                    showCancel: !1,
                    success: function(t) {}
                }));
            }, "朕要赞一个", "点赞失败");
        } else e.login();
    },
    shoucang: function() {
        if (t.isLogin()) {
            var a = this;
            t.req("api/fav/addfav", {
                iid: a.data.data.id,
                sk: e.globalData.sk
            }, function(t) {
                1 == t.status && (a.setData({
                    shoucang: !0
                }), wx.showToast({
                    title: "收藏成功",
                    icon: "success",
                    duration: 2e3
                }));
            }, "朕要收藏", "收藏失败");
        } else e.login();
    },
    qxshoucang: function() {
        if (t.isLogin()) {
            var a = this;
            t.req("api/fav/delfav", {
                iid: a.data.data.id,
                sk: e.globalData.sk
            }, function(t) {
                1 == t.status && (a.setData({
                    shoucang: !1
                }), wx.showToast({
                    title: "取消收藏成功",
                    icon: "success",
                    duration: 2e3
                }));
            }, "朕要取消收藏", "取消收藏失败");
        } else e.login();
    },
    madal: function() {
        this.setData({
            modalFlag: !0
        });
    },
    modalOk: function() {
        this.setData({
            modalFlag: !1
        });
    },
    appointment: function(a) {
        var i = a.detail.formId, n = this;
        return console.log(a.detail.value.surplus), "" == a.detail.value.name ? (t.isError("请输入姓名", n), 
        !1) : "" == a.detail.value.phone ? (t.isError("请输入手机号", n), !1) : /^1[34578]\d{9}$/.test(a.detail.value.phone) ? 0 == a.detail.value.surplus ? (t.isError("请选择人数", n), 
        !1) : (t.clearError(n), void t.req("api/appointment/add", {
            form_id: i,
            iid: this.data.data.id,
            name: a.detail.value.name,
            phone: a.detail.value.phone,
            surplus: a.detail.value.surplus,
            sk: e.globalData.sk
        }, function(a) {
            if (console.log("appointment_add : " + a), 1 != a.status) return t.isError(a.msg, n), 
            !1;
            n.setData({
                modalFlag: !1
            }), wx.showToast({
                title: "预约成功",
                icon: "success",
                duration: 2e3
            });
        })) : (t.isError("手机号码错误", n), !1);
    },
    setsurplus: function(t) {
        this.setData({
            surplus: t.detail.value
        });
    },
    preventTouchMove: function() {},
    hideModal: function() {
        this.setData({
            showModal: !1
        });
    },
    onCancel: function() {
        this.hideModal(), wx.setStorage({
            key: "showTips",
            data: "1"
        });
    },
    onLoad: function(n) {
        var s = this;
        wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    height: t.windowHeight
                });
            }
        }), wx.getStorage({
            key: "showTips",
            fail: function(t) {
                (-1 != t.errMsg.indexOf("not found") || t.data.length < 1) && s.setData({
                    showModal: !0
                });
            }
        }), t.req("api/fav/isfav", {
            iid: n.id,
            sk: e.globalData.sk
        }, function(t) {
            1 == t.status && s.setData({
                shoucang: !0
            });
        }), t.req("api/info/index", {
            id: n.id
        }, function(e) {
            if (e) {
                var i = a.decode(e.data.nickName);
                i && i.length > 12 && (e.data.nickName = i.substr(0, 12));
                var n = a.decode(e.data.name);
                n && n.length > 9 ? e.data.name = n.substr(0, 9) : e.data.name = n, e.data.remark = a.decode(e.data.remark), 
                e.data.vehicle = a.decode(e.data.vehicle), e.data.actname = e.data.actname, s.setData({
                    data: e.data
                });
                var o = new Array("请选择人数"), d = e.data.departCity + "-" + e.data.departDistrict, r = e.data.destCity + "-" + e.data.destDistrict;
                e.data.departTown && (d += "-" + e.data.departTown), e.data.destTown && (r += "-" + e.data.destTown), 
                s.setData({
                    "data.tm": t.formatTime1(new Date(1e3 * e.data.time)),
                    "data.price": null == e.data.price ? "面议" : e.data.price,
                    "data.gender": e.data.gender,
                    notme: !1,
                    surPluss: o,
                    surplus: 0,
                    "data.departure": d,
                    "data.destination": r,
                    type: e.data.type
                });
            }
        }), i = 1, this.getComment(n.id), 1 == getCurrentPages().length && s.setData({
            back: !0
        });
    },
    saveHistory: function(a) {
        wx.getStorage({
            key: "sk",
            success: function(e) {
                t.req("api/info/history", {
                    infoid: a,
                    sk: e.data
                }, function() {});
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    previmg: function(t) {
        var a = this;
        wx.previewImage({
            current: a.data.comment[t.target.dataset.iid].img[t.target.dataset.id],
            urls: a.data.comment[t.target.dataset.iid].img
        });
    },
    getComment: function(a) {
        var e = this;
        t.req("api/comment/get", {
            id: a,
            type: "info",
            page: i
        }, function(a) {
            1 == a.status && (1 == i && (n = []), null == a.data ? e.setData({
                nomore: !0
            }) : a.data.forEach(function(a) {
                var e = a.avatarUrl, i = a.nickName;
                i.length > 18 && (i = i.substr(0, 18)), null == e && (e = "/img/account.png"), n.push({
                    id: a.id,
                    avatarUrl: e,
                    content: a.content,
                    fid: a.fid,
                    nickName: i,
                    zan: a.zan,
                    reply: a.reply,
                    time: t.getDateBiff(1e3 * a.time)
                });
            }), e.setData({
                comment: n
            }));
        });
    },
    toIndex: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        var t = "车找人，欢迎顺路的老乡联系，谢谢！";
        return 2 == this.data.type && (t = "人找车，欢迎顺路的老乡联系，谢谢！"), {
            title: t,
            path: "pages/info/index?id=" + this.data.data.id
        };
    },
    getCount: function(a) {
        var e = this;
        t.req("api/comment/get_count", {
            id: a,
            type: "info"
        }, function(t) {
            1 == t.status && e.setData({
                comnum: t.data
            });
        });
    },
    onShow: function() {
        i = 1, this.data.data && this.getComment(this.data.data.id);
    },
    tobottom: function() {
        this.data.nomore || (i++, this.getComment(this.data.data.id));
    }
});