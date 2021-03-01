function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var a, t = getApp(), s = require("../../utils/util.js");

require("../../utils/base64.js");

Page({
    data: (a = {
        files: [],
        content: "",
        gender: 1,
        type: 1,
        isAgree: !0,
        types: [ {
            name: "1",
            value: "个人车主",
            checked: !0
        }, {
            name: "2",
            value: "车队"
        } ],
        address: ""
    }, e(a, "type", "个人车主"), e(a, "phone", ""), e(a, "concat", ""), a),
    onLoad: function() {
        wx.getStorage({
            key: "sk",
            success: function(e) {},
            fail: function(e) {
                t.login();
            }
        }), t.globalData.userInfo && this.setData({
            phone: t.globalData.userInfo.phone
        });
    },
    bindconcat: function(e) {
        var a = e.detail.value;
        this.setData({
            concat: a
        });
    },
    chooseImage: function(e) {
        var a = this;
        wx.chooseImage({
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                e.tempFilePaths.forEach(function(e) {
                    wx.uploadFile({
                        url: t.serverConfig.ip_address + "/api/upload",
                        filePath: e,
                        name: "file",
                        formData: {
                            user: t.globalData.userInfo.id
                        },
                        success: function(e) {
                            console.log("res.tempFilePaths 2 : " + JSON.stringify(e));
                            var t = JSON.parse(e.data);
                            console.log(t), 1 == t.status ? (a.setData({
                                files: a.data.files.concat(t.data)
                            }), s.clearError(a)) : (console.log(t.msg), s.isError(t.msg, a));
                        },
                        fail: function() {
                            s.isError("图片上传失败", a);
                        }
                    });
                });
            }
        });
    },
    getPhone: function(e) {
        this.setData({
            phone: e.detail.value
        });
    },
    bindinput: function(e) {
        this.setData({
            content: e.detail.value
        });
    },
    bindremark: function(e) {
        this.setData({
            address: e.detail.value
        });
    },
    selectType: function(e) {
        this.setData({
            type: e.detail.value
        });
    },
    bindAgreeChange: function(e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },
    previewImage: function(e) {
        wx.previewImage({
            current: e.currentTarget.id,
            urls: this.data.files
        });
    },
    bindfocus: function() {
        s.clearError(this);
    },
    submit: function() {
        var e = this;
        return "" == e.data.content && 0 == e.data.files.length ? (s.isError("请输入内容或者至少选择一张图片", e), 
        !1) : this.data.isAgree ? void wx.request({
            url: t.d.hostImgUrl + "bardynamic/hascarinfo",
            data: {
                sk: t.globalData.sk
            },
            success: function(a) {
                1 == a.data.status ? s.isError("已存在车队信息，无法添加，请在个人中心删除后重新添加即可", e) : s.req("api/bardynamic/add", {
                    content: e.data.content,
                    phone: e.data.phone,
                    concat: e.data.concat,
                    img: JSON.stringify(e.data.files),
                    sk: t.globalData.sk,
                    isEncode: !0,
                    type: e.data.type,
                    address: e.data.address
                }, function(e) {
                    1 == e.status && wx.navigateBack({
                        delta: 1
                    }), wx.showToast({
                        title: "发布成功",
                        icon: "fail",
                        duration: 1e3
                    });
                });
            }
        }) : (s.isError("请阅读发布须知确认是否同意条款", e), !1);
    }
});