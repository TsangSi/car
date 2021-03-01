var a = getApp(), e = require("../../wxParse/wxParse.js");

Page({
    data: {
        newArr: []
    },
    onLoad: function(t) {
        console.log(t);
        var r = this;
        wx.request({
            url: a.d.hostImgNCUrl + "index/newdetail",
            data: {
                id: t.id
            },
            success: function(a) {
                r.setData({
                    newArr: a.data
                }), console.log(a.data);
                var t = a.data.n_content;
                e.wxParse("article", "html", t, r, 5);
            }
        });
    }
});