var a = getApp(), t = require("../../utils/util.js");

Page({
    data: {
        files: [],
        content: "",
        gender: 1,
        data: {
            uid: "",
            iid: ""
        }
    },
    chooseImage: function(e) {
        var i = this;
        wx.chooseImage({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                e.tempFilePaths.forEach(function(e) {
                    wx.uploadFile({
                        url: a.serverConfig.ip_address + "/api/upload",
                        filePath: e,
                        name: "file",
                        formData: {
                            user: a.globalData.userInfo.id
                        },
                        success: function(a) {
                            var e = JSON.parse(a.data);
                            console.log(e), 1 == e.status ? (i.setData({
                                files: i.data.files.concat(e.data)
                            }), t.clearError(i)) : (console.log(e.msg), t.isError(e.msg, i));
                        },
                        fail: function() {
                            t.isError("图片上传失败", i);
                        }
                    });
                });
            }
        });
    },
    bindinput: function(a) {
        this.setData({
            content: a.detail.value
        });
    },
    previewImage: function(a) {
        wx.previewImage({
            current: a.currentTarget.id,
            urls: this.data.files
        });
    },
    bindfocus: function() {
        t.clearError(this);
    },
    submit: function() {
        var e = this, i = e.data.content;
        if ("" == i && 0 == e.data.files.length) return t.isError("请输入内容", e), !1;
        (function(a, t) {
            a = a.split("."), t = t.split(".");
            for (var e = Math.max(a.length, t.length); a.length < e; ) a.push("0");
            for (;t.length < e; ) t.push("0");
            for (var i = 0; i < e; i++) {
                var n = parseInt(a[i]), r = parseInt(t[i]);
                if (n > r) return 1;
                if (n < r) return -1;
            }
            return 0;
        })(wx.getSystemInfoSync().SDKVersion, "2.8.2") >= 0 ? wx.requestSubscribeMessage({
            tmplIds: [ "TOQmKOH-rrRUFS-yGl-6OR1fe0oaYhtSmx1H5V1JJ-8" ],
            success: function(n) {
                "accept" == n["TOQmKOH-rrRUFS-yGl-6OR1fe0oaYhtSmx1H5V1JJ-8"] ? t.req("api/comment/notice", {
                    iid: e.data.data.iid,
                    beid: e.data.data.uid,
                    reply: "楼主" == e.data.data.reply ? "" : e.data.data.reply,
                    type: "info",
                    content: i,
                    sk: a.globalData.sk
                }, function(a) {
                    1 == a.status ? wx.navigateBack({
                        delta: 1
                    }) : wx.showToast({
                        title: a.msg
                    });
                }) : (wx.showToast({
                    title: "你已拒绝评论推送",
                    icon: "none"
                }), t.req("api/comment/add", {
                    iid: e.data.data.id,
                    reply: "楼主" == e.data.data.reply ? "" : e.data.data.reply,
                    type: "info",
                    content: i,
                    img: JSON.stringify(e.data.files),
                    sk: a.globalData.sk
                }, function(a) {
                    1 == a.status && wx.navigateBack({
                        delta: 1
                    });
                }, "发布中...", "发布失败"));
            },
            fail: function(n) {
                t.req("api/comment/add", {
                    iid: e.data.data.id,
                    reply: "楼主" == e.data.data.reply ? "" : e.data.data.reply,
                    type: "info",
                    content: i,
                    img: JSON.stringify(e.data.files),
                    sk: a.globalData.sk
                }, function(a) {
                    0 == a.errcode && wx.navigateBack({
                        delta: 1
                    });
                }, "发布中...", "发布失败");
            }
        }) : t.req("api/comment/add", {
            iid: e.data.data.id,
            reply: "楼主" == e.data.data.reply ? "" : e.data.data.reply,
            type: "info",
            content: i,
            img: JSON.stringify(e.data.files),
            sk: a.globalData.sk
        }, function(a) {
            1 == a.status && wx.navigateBack({
                delta: 1
            });
        }, "发布中...", "发布失败");
    },
    onLoad: function(e) {
        if (this.setData({
            data: {
                uid: e.uid,
                iid: e.id
            }
        }), t.isLogin()) this.setData({
            "data.uid": e.uid,
            "data.id": e.id,
            "data.reply": e.reply ? e.reply : "楼主"
        }); else {
            var i = this;
            a.login(function() {
                i.setData({
                    "data.id": e.id,
                    "data.uid": e.uid,
                    "data.reply": e.reply ? e.reply : "楼主"
                });
            });
        }
    }
});