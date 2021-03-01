var t = getApp(), n = require("../../utils/util.js"), a = 1, e = new Array();

Page({
    data: {
        tabs: [ "全部", "车找人", "人找车" ]
    },
    del: function(a) {
        var i = this, s = a.currentTarget.id;
        return wx.showModal({
            title: "提示",
            content: "确定删除?",
            success: function(a) {
                a.confirm && n.req("api/Dynamic/del", {
                    sk: t.globalData.sk,
                    id: e[s].id
                }, function(t) {
                    if (1 != t.status) return n.isError("删除失败,请重试", i), !1;
                    e.splice(s, 1), i.setData({
                        list: e
                    }), wx.showToast({
                        title: "删除成功",
                        icon: "success",
                        duration: 2e3
                    });
                });
            }
        }), !1;
    },
    onReachBottom: function() {
        this.data.nomore || (a++, this.getList());
    },
    getList: function() {
        var i = this;
        n.req("api/dynamic/oneInfo", {
            sk: t.globalData.sk,
            page: a
        }, function(t) {
            if (null == t.data) return 1 == a && (console.log(a), i.setData({
                isnull: !0
            })), i.setData({
                nomore: !0
            }), !1;
            1 == a && (e = new Array());
            var n = !1;
            t.data.length < 20 && (n = !0);
            new Array("", "空位", "人");
            t.data.forEach(function(t) {
                var n = {
                    content: t.content,
                    id: t.id
                };
                e.push(n);
            }), i.setData({
                list: e,
                nomore: n,
                isnull: !1
            });
        });
    },
    onPullDownRefresh: function() {
        a = 1, this.getList(), wx.stopPullDownRefresh();
    },
    onShow: function() {
        a = 1, this.getList();
    },
    itemClick: function(t) {
        var n = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: n
        });
    }
});