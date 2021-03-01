function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t;

App((t = {
    d: {
        hostImgUrl: "https://192.168.22.45/index.php/api/",
        dyPrice: "",
        viptime: ""
    },
    onLaunch: function() {
        var e = this;
        wx.checkSession({
            success: function() {
                wx.getStorage({
                    key: "sk",
                    success: function(t) {
                        var a = t.data;
                        wx.request({
                            url: e.serverConfig.ip_address + "/api/user/vaild_sk",
                            data: {
                                sk: a,
                                t: 1
                            },
                            method: "POST",
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                1 != t.data.status || (e.globalData.sk = a);
                            }
                        });
                    },
                    fail: function() {}
                }), wx.getStorage({
                    key: "userInfo",
                    success: function(t) {
                        t.data && !t.data.actname && wx.removeStorage({
                            key: "userInfo",
                            success: function(t) {
                                e.login();
                            }
                        }), t.openId, null == t.data || (e.globalData.userInfo = t.data);
                    },
                    fail: function() {}
                });
            },
            fail: function() {
                wx.removeStorage({
                    key: "sk",
                    success: function(e) {}
                }), wx.removeStorage({
                    key: "userInfo",
                    success: function(e) {}
                });
            }
        });
    },
    globalData: {
        userInfo: null,
        orderNo: ""
    },
    login: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        wx.showLoading({
            title: "用户登录中",
            mask: !0
        });
        var t = this;
        wx.login({
            success: function(a) {
                wx.getUserInfo({
                    success: function(n) {
                        wx.request({
                            url: t.serverConfig.ip_address + "/api/user/login",
                            data: {
                                code: a.code,
                                encryptedData: n.encryptedData,
                                iv: n.iv
                            },
                            method: "POST",
                            header: {
                                "Content-type": "application/x-www-form-urlencoded"
                            },
                            success: function(a) {
                                a = a.data, t.setUserInfo(a.user), t.setSk(a.sk), wx.hideLoading(), wx.showToast({
                                    title: "登录成功",
                                    icon: "success",
                                    duration: 2e3
                                }), e && e();
                            },
                            fail: function(e) {
                                wx.hideLoading();
                            }
                        });
                    },
                    fail: function(e) {
                        t.loginFail(), wx.hideLoading();
                    }
                });
            },
            fail: function(e) {
                wx.hideLoading();
            }
        });
    },
    loginFail: function() {
        var e = this;
        wx.showModal({
            content: "当前操作,需要用户登录信息",
            showCancel: !0,
            success: function(t) {
                t.confirm && wx.openSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"] ? e.login() : wx.showModal({
                            content: "耐心等待10分钟后,才可以进行当前操作",
                            showCancel: !1
                        });
                    }
                });
            }
        });
    },
    setUserInfo: function(e) {
        this.globalData.userInfo = e, wx.setStorage({
            key: "userInfo",
            data: e
        });
    },
    setSk: function(e) {
        this.globalData.sk = e, wx.setStorage({
            key: "sk",
            data: e
        });
    }
}, e(t, "globalData", {
    userInfo: null,
    sk: null
}), e(t, "serverConfig", {
    ip_address: "https://192.168.22.45/index.php/"
}), e(t, "wxpay", function(e, t, a) {
    var n = this, o = this;
    wx.login({
        success: function(s) {
            s.code && wx.request({
                url: o.serverConfig.ip_address + "api/index/payopenid",
                data: {
                    code: s.code
                },
                success: function(o) {
                    var s = o.data.openid;
                    o.data.session_key;
                    n.submitForm(o, s, e, t, a);
                }
            });
        }
    });
}), e(t, "submitForm", function(e, t, a, n, o) {
    var s = this;
    wx.request({
        url: s.serverConfig.ip_address + "Api/index/makeorder",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
            openid: t,
            data_total: a,
            goods: n
        },
        success: function(e) {
            s.globalData.orderNo = e.data.out_trade_no, 1 == e.data.state ? wx.requestPayment({
                timeStamp: e.data.timeStamp,
                nonceStr: e.data.nonceStr,
                package: e.data.package,
                signType: e.data.signType,
                paySign: e.data.paySign,
                success: function(e) {
                    "requestPayment:ok" == e.errMsg && (wx.showToast({
                        title: "购买成功",
                        icon: "success",
                        duration: 1e3
                    }), o());
                },
                fail: function(e) {
                    wx.showToast({
                        title: "购买失败",
                        icon: "success",
                        duration: 1e3
                    });
                },
                complete: function(e) {}
            }) : 0 == e.data.state ? wx.showToast({
                title: e.data.Msg,
                icon: "fail",
                duration: 1e3
            }) : wx.showToast({
                title: "系统繁忙，请稍后重试~",
                icon: "fail",
                duration: 1e3
            });
        }
    });
}), e(t, "getAccessToken", function(e, t, a, n, o) {
    var s = this;
    wx.showLoading({
        title: "加载中..."
    }), wx.request({
        url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx28bcb619028deb7c&secret=955a64bcd33b1e49162e97634c8b574f",
        success: function(i) {
            console.log(i), i.data.access_token ? s.sendServiceMessage(i.data.access_token, e, t, a, n, o) : wx.showToast({
                title: i.data.errmsg
            });
        },
        fail: function() {
            wx.showToast({
                title: "获取失败"
            });
        },
        complete: function() {
            wx.hideLoading();
        }
    });
}), e(t, "sendServiceMessage", function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", a = arguments[2], n = arguments[3], o = arguments[4], s = arguments[5];
    wx.showLoading({
        title: "加载中..."
    }), wx.request({
        url: "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=" + e,
        method: "post",
        data: {
            touser: t,
            template_id: n,
            page: s,
            form_id: a,
            data: o,
            emphasis_keyword: "keyword1.DATA"
        },
        success: function(e) {
            wx.navigateBack({
                delta: 1
            });
        },
        complete: function() {
            wx.hideLoading();
        }
    });
}), t));