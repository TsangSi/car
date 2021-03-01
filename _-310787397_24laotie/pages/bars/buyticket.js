var t = getApp(), e = require("../../utils/util.js");

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        price: "",
        lineId: "",
        lineTime: "",
        monthDay: "",
        lineAddress: "",
        lineRemark: "",
        userName: "",
        userPhone: "",
        lineInfo: {},
        linePrice: "",
        ticketNum: 1
    },
    onLoad: function(e) {
        var a = this;
        wx.getStorage({
            key: "status",
            success: function(t) {
                console.log(t), 1 == t.data && a.setData({
                    canIUse: !1
                });
            },
            fail: function(t) {
                a.setData({
                    canIUse: !0
                });
            }
        });
        var n = e.id;
        this.setData({
            lineTime: e.time,
            lineId: n,
            monthDay: e.monthDate.substring(5)
        }), wx.showLoading({
            title: "加载中..."
        }), wx.request({
            url: t.d.hostImgUrl + "bars/showdetail",
            data: {
                id: n
            },
            success: function(t) {
                if (1 == t.data.status) {
                    for (var e = t.data.data.specDate.split(","), n = !1, i = 0; i < e.length; i++) e[i] == a.data.monthDay && (n = !0);
                    a.setData({
                        lineInfo: t.data.data,
                        linePrice: n ? t.data.data.holdayPrice : t.data.data.price,
                        price: n ? t.data.data.holdayPrice : t.data.data.price
                    });
                }
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    getMD: function() {
        var t = new Date(), e = (t.getFullYear(), t.getMonth() + 1);
        e < 10 && (e = "0" + e);
        var a = t.getDate();
        return a < 10 && (a = "0" + a), e + "-" + a;
    },
    addTicket: function() {
        if (this.data.ticketNum < 5) {
            var t = this.data.ticketNum + 1, e = this.data.price * t;
            this.setData({
                ticketNum: t,
                linePrice: e
            });
        } else wx.showToast({
            title: "一次最多五张票",
            icon: "none",
            mask: !0,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    delTicket: function() {
        if (this.data.ticketNum > 1) {
            var t = this.data.ticketNum - 1, e = this.data.price * t;
            this.setData({
                ticketNum: t,
                linePrice: e
            });
        }
    },
    formSubmit: function(a) {
        var n = this, i = a.detail.value, o = i.lineRemark, s = i.userName, r = i.userPhone;
        return null == t.globalData.userInfo ? (e.isError("需要登录才可以购买", n), void t.login()) : "" == s ? (e.isError("请输入您的姓名", n), 
        !1) : "" == r ? (e.isError("请输入手机号码", n), !1) : /^1[345789]\d{9}$/.test(r) ? (this.setData({
            lineRemark: o,
            userName: s,
            userPhone: r
        }), void this.wxpay()) : (e.isError("手机号码错误", n), !1);
    },
    bindGetUserInfo: function(e) {
        e.detail.userInfo ? (wx.setStorage({
            key: "status",
            data: "1"
        }), this.setData({
            canIUse: !1
        }), t.login()) : (wx.showModal({
            content: "您已拒绝授权",
            showCancel: !1,
            confirmText: "关闭",
            success: function(t) {}
        }), this.setData({
            canIUse: !0
        }));
    },
    wxpay: function() {
        var e = this;
        wx.showLoading({
            title: "加载中..."
        }), wx.login({
            success: function(a) {
                console.log(a), a.code ? wx.request({
                    url: t.serverConfig.ip_address + "api/index/payopenid",
                    data: {
                        code: a.code
                    },
                    success: function(t) {
                        console.log(t);
                        var a = t.data.openid;
                        t.data.session_key;
                        e.submitForm(t, a);
                    }
                }) : console.log("登录失败！" + a.errMsg);
            }
        });
    },
    submitForm: function(a, n) {
        var i = this;
        wx.request({
            url: t.serverConfig.ip_address + "Api/index/makeorder",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                openid: n,
                data_total: i.data.linePrice,
                goods: i.data.lineInfo.depart + "---" + i.data.lineInfo.dest
            },
            success: function(a) {
                var n = a.data.out_trade_no;
                1 == a.data.state ? wx.requestPayment({
                    timeStamp: a.data.timeStamp,
                    nonceStr: a.data.nonceStr,
                    package: a.data.package,
                    signType: a.data.signType,
                    paySign: a.data.paySign,
                    success: function(a) {
                        e.req("api/bars/carAdd", {
                            userName: i.data.userName,
                            userPhone: i.data.userPhone,
                            lineId: i.data.lineId,
                            remark: i.data.lineRemark,
                            price: i.data.price,
                            num: i.data.ticketNum,
                            lineName: i.data.lineInfo.depart + "---" + i.data.lineInfo.dest,
                            lineTime: i.data.lineTime,
                            sk: t.globalData.sk,
                            orderNo: n
                        }, function(t) {
                            console.log(t), 1 == t.status ? wx.showToast({
                                title: t.message,
                                icon: "none",
                                duration: 1e3,
                                success: function() {
                                    wx.navigateBack({
                                        delta: 1
                                    });
                                }
                            }) : wx.showToast({
                                title: t.message,
                                icon: "none",
                                duration: 1e3
                            });
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "发布失败",
                            icon: "fail",
                            duration: 1e3
                        });
                    },
                    complete: function(t) {
                        console.log(t.errMsg);
                    }
                }) : 0 == a.data.state ? wx.showToast({
                    title: a.data.Msg,
                    icon: "fail",
                    duration: 1e3
                }) : wx.showToast({
                    title: "系统繁忙，请稍后重试~",
                    icon: "fail",
                    duration: 1e3
                });
            }
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