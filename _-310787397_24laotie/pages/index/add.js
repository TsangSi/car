function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = require("../../utils/util.js"), a = (require("../../utils/citys.js"), require("../../utils/JsonUtils.js"), 
require("../../utils/base64.js"), getApp());

t.formatTime(new Date()).split(" ")[0], t.formatTime(new Date(new Date().getTime() + 307584e5)).split(" ")[0];

Page({
    data: {
        files: [],
        content: "",
        gender: 1,
        dytype: 1,
        phone: "",
        isAgree: !0,
        itemIndex: "",
        index: "",
        departCondition: !1,
        animationAddressMenu: {},
        departProvince: "请选择地区",
        departCity: "",
        departCounty: "",
        departProvinces: [],
        departCitys: [],
        departCountys: [],
        departValue: [ 0, 0, 0 ],
        departValues: [ 0, 0, 0 ],
        typesway: [ {
            name: "1",
            value: "招聘",
            checked: !1
        }, {
            name: "2",
            value: "求职",
            checked: !1
        }, {
            name: "3",
            value: "出售",
            checked: !1
        }, {
            name: "4",
            value: "求购",
            checked: !1
        }, {
            name: "5",
            value: "打听事",
            checked: !1
        }, {
            name: "6",
            value: "租赁",
            checked: !1
        }, {
            name: "7",
            value: "其它",
            checked: !1
        } ],
        remark: "",
        type: 1
    },
    onLoad: function(t) {
        var i = this;
        this.data.typesway.forEach(function(a, n) {
            a.name == parseInt(t.id) && i.setData(e({}, "typesway[" + n + "].checked", !0));
        }), wx.getStorage({
            key: "sk",
            success: function(e) {},
            fail: function(e) {
                a.login();
            }
        });
        var n = wx.createAnimation({
            duration: 500,
            transformOrigin: "50% 50%",
            timingFunction: "ease"
        });
        a.globalData.userInfo && this.setData({
            phone: a.globalData.userInfo.phone
        }), this.animation = n;
    },
    bindPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index: e.detail.value
        });
    },
    departOpen: function(e) {
        var t = this.data.departProvince, a = this.data.departCity, i = this.data.departCounty;
        "ok" != e.currentTarget.dataset.id || a || (t = this.data.departProvinces[0], a = this.data.departCitys[0], 
        this.data.departCountys && (i = this.data.departCountys[0])), this.setData({
            departProvince: t,
            departCity: a,
            departCounty: i,
            departCondition: !this.data.departCondition
        }), this.startAddressAnimation(!0);
    },
    startAddressAnimation: function(e) {
        var t = this;
        e ? t.animation.translateY("0vh").step() : t.animation.translateY("40vh").step(), 
        t.setData({
            animationAddressMenu: t.animation.export()
        });
    },
    bindPickerType: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            itemIndex: e.detail.value
        });
    },
    chooseImage: function(e) {
        var i = this;
        wx.chooseImage({
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                console.log("res.tempFilePaths 1 : " + e.tempFilePaths), e.tempFilePaths.forEach(function(e) {
                    wx.uploadFile({
                        url: a.serverConfig.ip_address + "/api/upload",
                        filePath: e,
                        name: "file",
                        formData: {
                            user: a.globalData.userInfo.id
                        },
                        success: function(e) {
                            console.log("res.tempFilePaths 2 : " + JSON.stringify(e));
                            var a = JSON.parse(e.data);
                            console.log(a), 1 == a.status ? (i.setData({
                                files: i.data.files.concat(a.data)
                            }), t.clearError(i)) : (console.log(a.msg), t.isError(a.msg, i));
                        },
                        fail: function() {
                            t.isError("图片上传失败", i);
                        }
                    });
                });
            }
        });
    },
    bindinput: function(e) {
        this.setData({
            content: e.detail.value
        });
    },
    bindphone: function(e) {
        this.setData({
            phone: e.detail.value
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
        t.clearError(this);
    },
    getPhone: function(e) {
        this.setData({
            phone: e.detail.value
        });
    },
    submit: function() {
        var e = this, i = e.data.content;
        if ("" == i) return t.isError("请输入内容", e), !1;
        if ("" == e.data.phone) return t.isError("请输入手机号码", e), !1;
        if (!/^1[345789]\d{9}$/.test(e.data.phone)) return t.isError("手机号码错误", e), !1;
        if (!this.data.isAgree) return t.isError("请阅读发布须知确认是否同意条款", e), !1;
        if (t.isOrder(i)) {
            var n = "/pages/info/add?t=1&c=" + i;
            wx.navigateTo({
                url: n
            });
        } else {
            var r = "";
            1 == e.data.type && (r = "招聘"), 2 == e.data.type && (r = "求职"), 3 == e.data.type && (r = "出售"), 
            4 == e.data.type && (r = "求购"), 5 == e.data.type && (r = "打听事"), 6 == e.data.type && (r = "租赁"), 
            7 == e.data.type && (r = "其它"), t.req("api/dynamic/add", {
                content: e.data.content,
                sk: a.globalData.sk,
                isEncode: !0,
                dyType: e.data.type,
                dyTypeText: r,
                remark: e.data.remark,
                phone: e.data.phone
            }, function(e) {
                1 == e.status ? wx.navigateBack({
                    delta: 1
                }) : wx.showToast({
                    title: e.msg,
                    icon: "fail",
                    duration: 1e3
                });
            });
        }
    },
    selectType: function(e) {
        e.detail.value;
        this.setData({
            type: e.detail.value
        });
    },
    bindremark: function(e) {
        this.setData({
            remark: e.detail.value
        });
    }
});