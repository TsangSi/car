var t = require("../../utils/util.js");

Page({
    data: {},
    onLoad: function(a) {
        var i = this;
        t.req("api/notice/index", {
            id: a.id
        }, function(t) {
            1 == t.status && i.setData({
                data: t.data
            });
        });
    }
});