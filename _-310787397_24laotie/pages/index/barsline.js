var n = require("../../utils/util.js");

Page({
    data: {
        itemList: [],
        addidArr: [ "", "wxcb98cf2b481e6c31", "wx7dc608d9c44b786d", "wx5fd2a437f46141b1", "wxf402fa93a64f284e", "wx9256a8ae1b1094f9", "wx414a5201f34d33fa" ]
    },
    onLoad: function(a) {
        var t = this;
        n.req("api/dynamic/getbarslist", "", function(n) {
            t.setData({
                itemList: n.data
            });
        });
    },
    onReady: function() {},
    redirectOther: function(n) {
        var a = this;
        console.log(n);
        var t = n.currentTarget.id;
        t && wx.navigateToMiniProgram({
            appId: a.data.addidArr[t],
            path: "pages/index/index",
            success: function(n) {},
            fail: function(n) {}
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});