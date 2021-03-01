var t = require("../../utils/util.js"), e = getApp(), a = t.formatTime(new Date()).split(" ")[0], i = t.formatTime(new Date(new Date().getTime() + 53568e5)).split(" ")[0];

Page({
    data: {
        sex: [ "请选择性别", "男", "女" ],
        type: 1,
        gender: 0,
        date: a,
        start: a,
        end: i,
        time: "请选择时间",
        types: [ {
            name: "1",
            value: "车找人",
            checked: !0
        }, {
            name: "2",
            value: "人找车"
        } ],
        Surpluss: [ "请选择", 1, 2, 3, 4, 5, 6 ],
        surplus: 0,
        isAgree: !0,
        vehicle: "",
        departure: "出发地",
        destination: "目的地"
    },
    setSex: function(t) {
        this.setData({
            "data.gender": t.detail.value
        });
    },
    bindDateChange: function(t) {
        this.setData({
            "data.date": t.detail.value
        });
    },
    bindTimeChange: function(t) {
        this.setData({
            "data.time": t.detail.value
        });
    },
    setsurplus: function(t) {
        this.setData({
            "data.surplus": t.detail.value
        });
    },
    bindAgreeChange: function(t) {
        this.setData({
            isAgree: !!t.detail.value.length
        });
    },
    formSubmit: function(a) {
        var i = a.detail.value, r = this;
        if (console.log(i), "" == i.name) return t.isError("请输入姓名", r), !1;
        if (0 == i.gender) return t.isError("请选择性别", r), !1;
        if ("" == i.phone) return t.isError("请输入手机号码", r), !1;
        if (!/^1[34578]\d{9}$/.test(i.phone)) return t.isError("手机号码错误", r), !1;
        if ("出发地" == r.data.data.departure) return t.isError("请选择出发地", r), !1;
        if ("目的地" == r.data.data.destination) return t.isError("请选择目的地", r), !1;
        if ("请选择时间" == i.time) return t.isError("请选择出发时间", r), !1;
        if ("0" == i.surplus) {
            var s = new Array("", "剩余空位", "乘车人数");
            return t.isError("请选择" + s[i.type], r), !1;
        }
        if (!i.isAgree[0]) return t.isError("请阅读并同意条款", r), !1;
        i.sk = e.globalData.sk, i.departure = r.data.data.departure, i.destination = r.data.data.destination, 
        i.id = r.data.data.id, t.req("api/info/add", i, function(e) {
            if (1 != e.status) return t.isError(e.msg, r), !1;
            wx.redirectTo({
                url: "/pages/info/index?id=" + e.info
            });
        }), t.clearError(r);
    },
    sexDeparture: function() {
        var t = this;
        wx.chooseLocation({
            success: function(e) {
                t.setData({
                    "data.departure": e.address
                });
            }
        });
    },
    sexDestination: function() {
        var t = this;
        wx.chooseLocation({
            success: function(e) {
                t.setData({
                    "data.destination": e.address
                });
            }
        });
    },
    onLoad: function(e) {
        var a = this;
        t.req("api/info/index", {
            id: e.id
        }, function(e) {
            console.log("=============" + JSON.stringify(e));
            var i = t.formatTime(new Date(1e3 * e.data.time)).split(" ")[1];
            e.data.time = i, a.setData({
                data: e.data
            });
        });
    }
});