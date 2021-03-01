var t = getApp(), a = require("../../utils/util.js"), s = require("../../utils/citys.js");

Page({
    data: {
        canIUse: !0,
        sex: [ "保密", "男", "女" ],
        provinces: [],
        province: "",
        citys: [],
        city: "",
        countys: [],
        county: "",
        value: [ 0, 0, 0 ],
        values: [ 0, 0, 0 ],
        condition: !1
    },
    bindChange: function(t) {
        var a = t.detail.value, s = this.data.values, e = this.data.cityData;
        if (a[0] == s[0]) if (a[1] == s[1]) a[2] == s[2] || this.setData({
            city: this.data.citys[a[1]],
            province: e[a[0]].n,
            county: this.data.countys[a[2]],
            values: a
        }); else {
            var n = [], i = "";
            if (e[a[0]].s[a[1]].s) {
                for (var o = 0; o < e[a[0]].s[a[1]].s.length; o++) n.push(e[a[0]].s[a[1]].s[o].n);
                i = n[0];
            }
            this.setData({
                city: this.data.citys[a[1]],
                county: i,
                countys: n,
                province: e[a[0]].n,
                values: a,
                value: [ a[0], a[1], 0 ]
            });
        } else {
            for (var r = [], c = [], i = "", u = 0; u < e[a[0]].s.length; u++) r.push(e[a[0]].s[u].n);
            if (e[a[0]].s[0].s) {
                for (var l = 0; l < e[a[0]].s[0].s.length; l++) c.push(e[a[0]].s[0].s[l].n);
                i = c[0];
            }
            this.setData({
                province: this.data.provinces[a[0]],
                city: e[a[0]].s[0].n,
                citys: r,
                county: i,
                countys: c,
                values: a,
                value: [ a[0], 0, 0 ]
            });
        }
    },
    closeErr: function() {},
    open: function() {
        if (this.data.condition) {
            var t = this.data.values;
            this.setData({
                city: this.data.citys[t[1]],
                province: this.data.provinces[t[0]],
                county: this.data.countys[t[2]]
            });
        }
        this.setData({
            condition: !this.data.condition
        });
    },
    selectsex: function(t) {
        this.setData({
            "userInfo.gender": t.detail.value
        });
    },
    dateAvatar: function() {
        var s = this;
        wx.chooseImage({
            count: 1,
            success: function(e) {
                var n = e.tempFilePaths;
                wx.uploadFile({
                    url: t.serverConfig.ip_address + "/api/upload",
                    filePath: n[0],
                    name: "file",
                    formData: {
                        user: t.globalData.userInfo.id
                    },
                    success: function(t) {
                        var e = JSON.parse(t.data);
                        console.log(e), 1 == e.status ? (s.setData({
                            "userInfo.avatarUrl": e.data
                        }), a.clearError(s)) : (console.log(e.msg), a.isError(e.msg, s));
                    },
                    fail: function() {
                        a.isError("上传失败", s);
                    }
                });
            }
        });
    },
    formSubmit: function(s) {
        var e = this;
        if (!/^1[34578]\d{9}$/.test(s.detail.value.phone)) return a.isError("手机号码错误", e), 
        !1;
        this.setData({
            "userInfo.province": this.data.province,
            "userInfo.city": this.data.city,
            "userInfo.county": this.data.county,
            "userInfo.nickName": s.detail.value.nickName,
            "userInfo.phone": s.detail.value.phone
        }), wx.request({
            url: t.serverConfig.ip_address + "/api/user/editUser",
            data: {
                userInfo: e.data.userInfo,
                sk: t.globalData.sk
            },
            method: "POST",
            header: {
                "Content-type": "application/json"
            },
            success: function(s) {
                console.log(s), "1" == s.data.status ? (a.clearError(e), t.setUserInfo(s.data.user), 
                wx.navigateBack({
                    delta: 1
                })) : a.isError(s.data.msg, e);
            },
            fail: function(t) {
                a.isError("修改失败", e);
            }
        });
    },
    onLoad: function() {
        var t = this;
        wx.getStorage({
            key: "userInfo",
            success: function(a) {
                t.setData({
                    canIUse: !1,
                    userInfo: a.data,
                    gender: a.data.gender,
                    province: a.data.province,
                    city: a.data.city,
                    county: a.data.county
                }), console.log(t.data.canIUse);
            },
            fail: function(a) {
                t.setData({
                    canIUse: !0
                });
            }
        }), console.log(this.data.canIUse), s.init(t);
        for (var a = t.data.cityData, e = [], n = [], i = [], o = 0; o < a.length; o++) e.push(a[o].n);
        console.log("省份完成");
        for (var r = 0; r < a[0].s.length; r++) n.push(a[0].s[r].n);
        if (console.log("city完成"), a[0].s[0].s) for (var c = 0; c < a[0].s[0].s.length; c++) i.push(a[0].s[0].s[c].n);
        t.setData({
            provinces: e,
            citys: n,
            countys: i
        }), console.log("初始化完成");
    }
});