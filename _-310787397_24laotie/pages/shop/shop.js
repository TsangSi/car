var t = getApp();

Page({
    data: {
        imglist: [],
        num: 1,
        loading: !0,
        totalNum: 0,
        totalPage: 0,
        pageNum: 0
    },
    onLoad: function(t) {
        this.getList();
    },
    getList: function() {
        var a = this;
        wx.showLoading({
            title: "加载中..."
        }), wx.request({
            url: t.d.hostImgUrl + "Shop/index",
            data: {
                page: a.data.num,
                type: 0
            },
            success: function(t) {
                wx.hideLoading(), 1 == t.data.status && (a.data.totalNum = t.data.count, a.data.pageNum = t.data.num, 
                a.data.totalPage = Math.ceil(a.data.totalNum / a.data.pageNum), t.data.data.forEach(function(t, i) {
                    a.data.imglist.push(t);
                }), a.setData({
                    imglist: a.data.imglist
                }));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            imglist: [],
            num: 1
        }), this.getList(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.loading && (this.data.num++, this.getList(), this.data.num > this.data.totalPage && (this.data.loading = !1));
    },
    onShareAppMessage: function() {}
});