var t = getApp(), e = require("../../utils/util.js"), i = 1, a = new Array();

Page({
    data: {
        tabs: [ "全部", "车找人", "人找车" ]
    },
    del: function(i) {
        var n = this, s = i.currentTarget.id;
        return wx.showModal({
            title: "提示",
            content: "确定删除?",
            success: function(i) {
                i.confirm && e.req("api/info/del", {
                    sk: t.globalData.sk,
                    id: a[s].id
                }, function(t) {
                    if (1 != t.status) return e.isError("删除失败,请重试", n), !1;
                    a.splice(s, 1), n.setData({
                        list: a
                    }), wx.showToast({
                        title: "删除成功",
                        icon: "success",
                        duration: 2e3
                    });
                });
            }
        }), !1;
    },
    edit: function(t) {
        var e = t.currentTarget.id;
        console.log("/pages/info/add?id=" + a[e].id), wx.navigateTo({
            url: "/pages/info/edit?id=" + a[e].id,
            complete: function(t) {
                console.log(t);
            }
        });
    },
    onReachBottom: function() {
        this.data.nomore || (i++, this.getList());
    },
    getList: function() {
        var n = this;
        e.req("api/info/mylist", {
            sk: t.globalData.sk,
            page: i
        }, function(t) {
            if (null == t.data) return 1 == i && (console.log(i), n.setData({
                isnull: !0
            })), n.setData({
                nomore: !0
            }), !1;
            1 == i && (a = new Array());
            var s = !1;
            t.data.length < 20 && (s = !0);
            var r = new Array("", "空位", "人");
            t.data.forEach(function(t) {
                var i = {
                    start: t.departCity + "-" + t.departDistrict,
                    over: t.destCity + "-" + t.destDistrict,
                    type: n.data.tabs[t.type],
                    tp: t.type,
                    time: e.formatTime(new Date(1e3 * t.time)),
                    surplus: t.surplus + r[t.type],
                    see: t.see,
                    gender: t.gender,
                    url: "/pages/info/index?id=" + t.id,
                    tm: e.getDateDiff(1e3 * t.time),
                    id: t.id
                };
                a.push(i);
            }), n.setData({
                list: a,
                nomore: s,
                isnull: !1
            });
        });
    },
    onPullDownRefresh: function() {
        i = 1, this.getList(), wx.stopPullDownRefresh();
    },
    onShow: function() {
        i = 1, this.getList();
    },
    itemClick: function(t) {
        var e = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: e
        });
    }
});