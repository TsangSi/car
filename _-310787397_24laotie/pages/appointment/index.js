var t = require("../../utils/util.js"), i = (require("../../utils/JsonUtils.js"), 
getApp()), a = 1, s = 0;

Page({
    data: {},
    onLoad: function(a) {
        var o = this;
        s = a.id, console.log("function 1 : " + a.id), t.req("api/appointment/detail", {
            id: a.id,
            sk: i.globalData.sk
        }, function(i) {
            i.data.time = t.formatTime(new Date(1e3 * i.data.time)), o.setData({
                data: i.data
            });
        });
    },
    formSubmit: function(o) {
        var e = this;
        wx.showLoading({
            title: "",
            mask: !0
        }), setTimeout(function() {
            t.req("api/appointment/submit", {
                id: s,
                sk: i.globalData.sk,
                type: a,
                form_id: o.detail.formId
            }, function(i) {
                wx.hideLoading(), 1 == i.status ? (1 == a ? wx.showToast({
                    title: "拼车成功,请留意与乘客联系",
                    icon: "success",
                    duration: 2e3
                }) : wx.showToast({
                    title: "拒绝成功",
                    icon: "success",
                    duration: 2e3
                }), e.setData({
                    "data.status": a
                })) : t.isError(i.msg, e);
            });
        }, 1e3);
    },
    no: function() {
        a = 2;
    }
});