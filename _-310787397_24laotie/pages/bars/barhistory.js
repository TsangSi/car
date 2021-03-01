var t = getApp(), e = require("../../utils/util.js"), s = 1, i = new Array();

Page({
    data: {
        tabs: [ "全部", "车找人", "人找车" ]
    },
    apply: function(s) {
        var a = this, n = s.currentTarget.id;
        return wx.showModal({
            title: "确定退款?",
            content: "成功退款会在三至七个工作日到账",
            success: function(s) {
                s.confirm && e.req("api/bars/barsreback", {
                    sk: t.globalData.sk,
                    id: i[n].id
                }, function(t) {
                    if (1 != t.status) return e.isError("申请退款失败,请重试", a), !1;
                    wx.showToast({
                        title: "申请请求成功",
                        icon: "success",
                        success: function() {
                            a.setTimeFun();
                        }
                    });
                });
            }
        }), !1;
    },
    copyLogis: function(t) {
        var e = t.currentTarget.id;
        wx.setClipboardData({
            data: e,
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
        this.data.nomore || (s++, this.getList());
    },
    getList: function() {
        var a = this;
        e.req("api/bars/tickInfo", {
            sk: t.globalData.sk,
            page: s
        }, function(t) {
            if (console.log(t), null == t.data) return 1 == s && (console.log(s), a.setData({
                isnull: !0
            })), a.setData({
                nomore: !0
            }), !1;
            1 == s && (i = new Array());
            var n = !1;
            t.data.length < 20 && (n = !0), t.data.forEach(function(t) {
                var s = {
                    time: e.formatTime(new Date(1e3 * t.firsttime)),
                    userPhone: t.userPhone,
                    userName: t.userName,
                    lineTime: t.lineTime,
                    tickNum: t.tickNum,
                    userPrice: t.userPrice,
                    lineName: t.lineName,
                    status: t.status,
                    remark: t.remark,
                    carNo: t.carNo,
                    id: t.id
                };
                i.push(s);
            }), a.setData({
                list: i,
                nomore: n,
                isnull: !1
            });
        });
    },
    onPullDownRefresh: function() {
        s = 1, this.getList(), wx.stopPullDownRefresh();
    },
    onShow: function() {
        s = 1, this.getList();
    }
});