var t = getApp(), s = require("../../utils/util.js"), e = 1, o = new Array();

Page({
    data: {
        tabs: [ "全部", "车找人", "人找车" ]
    },
    apply: function(e) {
        var i = this, n = e.currentTarget.id;
        return wx.showModal({
            title: "确定退款?",
            content: "成功退款会在三至七个工作日到账",
            success: function(e) {
                e.confirm && s.req("api/shop/shopreback", {
                    sk: t.globalData.sk,
                    id: o[n].id
                }, function(t) {
                    if (1 != t.status) return s.isError("申请退款失败,请重试", i), !1;
                    wx.showToast({
                        title: "申请退款成功",
                        icon: "success",
                        success: function() {
                            i.setTimeFun();
                        }
                    });
                });
            }
        }), !1;
    },
    copyLogis: function(t) {
        var s = t.currentTarget.id;
        wx.setClipboardData({
            data: s,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {}
                });
            }
        });
    },
    setTimeFun: function() {
        var t = this;
        setTimeout(function() {
            t.getList();
        }, 2e3);
    },
    onReachBottom: function() {
        this.data.nomore || (e++, this.getList());
    },
    getList: function() {
        var i = this;
        s.req("api/shop/shoplist", {
            sk: t.globalData.sk,
            page: e
        }, function(t) {
            if (console.log(t), null == t.data) return 1 == e && (console.log(e), i.setData({
                isnull: !0
            })), i.setData({
                nomore: !0
            }), !1;
            1 == e && (o = new Array());
            var n = !1;
            t.data.length < 20 && (n = !0), t.data.forEach(function(t) {
                var e = {
                    time: s.formatTime(new Date(1e3 * t.firsttime)),
                    shopName: t.userGoods,
                    shopAddress: t.userAddress,
                    userPhone: t.userPhone,
                    logisOrderNo: t.logisOrderNo ? t.logisOrderNo : "暂无物流号",
                    id: t.id
                };
                o.push(e);
            }), i.setData({
                list: o,
                nomore: n,
                isnull: !1
            });
        });
    },
    onPullDownRefresh: function() {
        e = 1, this.getList(), wx.stopPullDownRefresh();
    },
    onShow: function() {
        e = 1, this.getList();
    }
});