var e = getApp();

require("../../utils/util.js");

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        userName: "",
        userPhone: "",
        userAddress: "",
        price: "",
        goods: "",
        selecttime: ""
    },
    buyBtn: function() {
        var t = this;
        if ("" != t.data.userName) if ("" != t.data.userPhone) {
            if (!/^1[345789]\d{9}$/.test(t.data.userPhone)) return wx.showToast({
                title: "手机号码错误",
                icon: "none"
            }), !1;
            wx.showLoading({
                title: "加载中..."
            }), e.globalData.sk ? e.wxpay(t.data.price, t.data.goods, function() {
                wx.request({
                    url: e.d.hostImgUrl + "Shop/userinfo",
                    data: {
                        method: "post",
                        userName: t.data.userName,
                        selecttime: t.data.selecttime,
                        userPhone: t.data.userPhone,
                        userAddress: t.data.userAddress,
                        userType: 1,
                        userPrice: t.data.price,
                        userGoods: t.data.goods,
                        orderNo: e.globalData.orderNo,
                        sk: e.globalData.sk
                    },
                    success: function(e) {
                        wx.hideLoading(), console.log(e), 1 == e.data.status ? wx.showToast({
                            title: "提交成功",
                            icon: "none"
                        }) : wx.showToast({
                            title: "联系客服",
                            icon: "none"
                        });
                    }
                });
            }) : wx.showLoading({
                title: "尚未登录"
            });
        } else wx.showToast({
            title: "联系号码不能为空",
            icon: "none"
        }); else wx.showToast({
            title: "联系人不能为空",
            icon: "none"
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
    onLoad: function(t) {
        var s = this;
        wx.getStorage({
            key: "status",
            success: function(e) {
                console.log(e), 1 == e.data && s.setData({
                    canIUse: !1
                });
            },
            fail: function(e) {
                s.setData({
                    canIUse: !0
                });
            }
        }), e.globalData.userInfo && this.setData({
            userPhone: e.globalData.userInfo.phone,
            userName: e.globalData.userInfo.nickName
        }), this.data.price = t.price, this.data.goods = t.goods, this.data.selecttime = t.time;
    },
    bindGetUserInfo: function(t) {
        t.detail.userInfo ? (wx.setStorage({
            key: "status",
            data: "1"
        }), this.setData({
            canIUse: !1
        }), e.login()) : (wx.showModal({
            content: "您已拒绝授权",
            showCancel: !1,
            confirmText: "关闭",
            success: function(e) {}
        }), this.setData({
            canIUse: !0
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});