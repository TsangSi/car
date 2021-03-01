var s = getApp();

require("../../utils/util.js");

Page({
    data: {
        list: "",
        pickBars: "/pages/image/banner2.jpg"
    },
    onLoad: function(s) {
        this.addressList();
    },
    addressList: function() {
        var t = this;
        wx.showLoading({
            title: "加载中..."
        }), wx.request({
            url: s.d.hostImgUrl + "bars/showlist",
            success: function(s) {
                wx.hideLoading(), 1 == s.data.status && t.setData({
                    list: s.data.data
                });
            }
        });
    },
    sAddress: function(s) {
        var t = s.currentTarget.id;
        wx.navigateTo({
            url: "/pages/bars/barslist?id=" + t,
            success: function() {},
            fail: function() {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.addressList(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});