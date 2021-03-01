function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = getApp();

require("../../utils/util.js");

Page({
    data: {
        proDetail: {},
        infoDialog: !1,
        userName: "",
        userPhone: "",
        userAddress: ""
    },
    onLoad: function(e) {
        wx.showLoading({
            title: "页面加载中..."
        });
        var a = this;
        wx.request({
            url: t.d.hostImgUrl + "Shop/getoneinfo",
            data: {
                id: e.id
            },
            success: function(e) {
                wx.hideLoading(), a.setData({
                    proDetail: e.data.data
                });
            }
        });
    },
    previeimg: function(t) {
        var a = this;
        wx.previewImage(e({
            current: t.currentTarget.id,
            urls: a.data.proDetail.shop_textimg
        }, "current", a.data.proDetail.shop_textimg[t.currentTarget.dataset.name]));
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
        var e = this;
        if ("" != e.data.userName) {
            if ("" != e.data.userPhone) return /^1[345789]\d{9}$/.test(e.data.userPhone) ? void ("" != e.data.userAddress ? t.wxpay(e.data.proDetail.shop_price, function() {
                e.setData({
                    infoDialog: !1
                }), wx.request({
                    url: t.d.hostImgUrl + "Shop/userinfo",
                    data: {
                        userName: e.data.userName,
                        userPhone: e.data.userPhone,
                        userAddress: e.data.userAddress,
                        userType: 1,
                        userPrice: e.data.proDetail.shop_price,
                        orderNo: t.globalData.orderNo
                    },
                    success: function(t) {
                        1 == t.status ? (e.setData({}), console.log(t.msg)) : console.log(t.msg);
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
    userName: function(e) {
        this.setData({
            userName: e.detail.value
        });
    },
    userPhone: function(e) {
        this.setData({
            userPhone: e.detail.value
        });
    },
    userAddress: function(e) {
        this.setData({
            userAddress: e.detail.value
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