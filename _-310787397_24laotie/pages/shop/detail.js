function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = getApp();

require("../../utils/util.js");

Page({
    data: {
        proDetail: {},
        infoDialog: !1,
        userName: "",
        userPhone: "",
        userAddress: "",
        timeArr: [],
        selecttime: "",
        reserve: [],
        cost: [],
        intro: []
    },
    onLoad: function(t) {
        wx.showLoading({
            title: "页面加载中..."
        });
        var a = this;
        wx.request({
            url: e.d.hostImgUrl + "Shop/getoneinfo",
            data: {
                id: t.id
            },
            success: function(t) {
                wx.hideLoading();
                var e = t.data.data.starttime.split(",");
                a.setData({
                    proDetail: t.data.data,
                    timeArr: e
                }), console.log(t.data.data);
                var o = t.data.data.shop_remark.split(","), s = t.data.data.shop_text.split(","), i = t.data.data.intro.split(",");
                a.setData({
                    reserve: o,
                    cost: s,
                    intro: i
                });
            }
        });
    },
    radioChange: function(t) {
        console.log(t), this.setData({
            selecttime: t.detail.value
        });
    },
    onceFun: function() {
        this.data.selecttime ? wx.navigateTo({
            url: "/pages/shop/buy?price=" + this.data.proDetail.shop_price + "&goods=" + this.data.proDetail.shop_title + "&time=" + this.data.selecttime
        }) : wx.showToast({
            title: "出发日期不能为空",
            icon: "none"
        });
    },
    previeimg: function(e) {
        var a = this;
        wx.previewImage(t({
            current: e.currentTarget.id,
            urls: a.data.proDetail.shop_textimg
        }, "current", a.data.proDetail.shop_textimg[0]));
    },
    buyShop: function() {
        this.setData({
            infoDialog: !0
        });
    },
    closeDialog: function() {
        this.setData({
            infoDialog: !1
        });
    },
    buyBtn: function() {
        var t = this;
        if ("" != t.data.userName) {
            if ("" != t.data.userPhone) return /^1[345789]\d{9}$/.test(t.data.userPhone) ? void ("" != t.data.userAddress ? e.wxpay(t.data.proDetail.shop_price, function() {
                t.setData({
                    infoDialog: !1
                }), wx.request({
                    url: e.d.hostImgUrl + "Shop/userinfo",
                    data: {
                        userName: t.data.userName,
                        userPhone: t.data.userPhone,
                        userAddress: t.data.userAddress,
                        userType: 1,
                        userPrice: t.data.proDetail.shop_price,
                        orderNo: e.globalData.orderNo
                    },
                    success: function(e) {
                        1 == e.status ? (t.setData({}), console.log(e.msg)) : console.log(e.msg);
                    }
                });
            }) : wx.showToast({
                title: "收件地址不能为空"
            })) : (wx.showToast({
                title: "手机号码错误"
            }), !1);
            wx.showToast({
                title: "联系号码不能为空"
            });
        } else wx.showToast({
            title: "联系人不能为空"
        });
    },
    userName: function(t) {
        this.setData({
            userName: t.detail.value
        });
    },
    userPhone: function(t) {
        this.setData({
            userPhone: t.detail.value
        });
    },
    userAddress: function(t) {
        this.setData({
            userAddress: t.detail.value
        });
    },
    call: function(t) {
        wx.makePhoneCall({
            phoneNumber: "19820130787"
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