var a = require("../../utils/util.js");

require("../../utils/base64.js"), getApp(), new Array();

Page({
    data: {
        "data.id": 0,
        back: !1,
        nomore: !1,
        shoucang: !1,
        notme: !0,
        modalFlag: !1,
        type: 1,
        showModal: !1,
        imgList: [],
        infoid: 0
    },
    tel: function() {
        var a = this;
        wx.makePhoneCall({
            phoneNumber: a.data.data.phone
        });
    },
    onLoad: function(t) {
        this.setData({
            infoid: t.id
        });
        var e = this;
        wx.getStorage({
            key: "showTips",
            fail: function(a) {
                (-1 != a.errMsg.indexOf("not found") || a.data.length < 1) && e.setData({
                    showModal: !0
                });
            }
        }), a.req("api/bardynamic/getCarInfo", {
            id: t.id
        }, function(a) {
            a && (e.setData({
                data: a.data
            }), e.setData({
                "data.concat": a.data.concat,
                "data.content": a.data.content,
                imgList: JSON.parse(a.data.img)
            }));
        });
    },
    previmg: function(a) {
        console.log(a);
        var t = this;
        console.log(t.data.imgList[a.target.id]), wx.previewImage({
            current: t.data.imgList[a.target.id],
            urls: t.data.imgList
        });
    },
    toIndex: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        return {
            title: "车队寻单,欢迎有需要的联系，谢谢！",
            path: "pages/barsDynamic/detail?id=" + this.data.data.id
        };
    }
});