var t = getApp();

require("../../utils/util.js");

Page({
    data: {
        arrTime: [],
        infoData: {},
        price: "",
        curtimestamp: "",
        cartimestamp: [],
        start: "",
        end: "",
        date: "",
        id: "",
        flagNum: 0,
        noNextTicket: !1,
        noPrevTicket: !0
    },
    onLoad: function(t) {
        var a = t.id;
        this.setData({
            date: this.getYMD(),
            start: this.getYMD(),
            end: this.GetDateStr(5),
            id: a
        }), this.getCarList(a, this.getYMD());
    },
    getCarList: function(a, e) {
        var i = this;
        wx.showLoading({
            title: "加载中..."
        }), wx.request({
            url: t.d.hostImgUrl + "bars/showdetail",
            data: {
                id: a
            },
            success: function(t) {
                if (1 == t.data.status) {
                    for (var a = t.data.data.gotime.split(","), s = [], n = 0; n < a.length; n++) s.push(Date.parse(e + " " + a[n]));
                    for (var o = !1, r = t.data.data.specDate.split(","), d = 0; d < r.length; d++) console.log(r), 
                    console.log(e.substr(-5)), r[d] == e.substr(-5) && (o = !0);
                    i.setData({
                        cartimestamp: s,
                        arrTime: a,
                        infoData: t.data.data,
                        price: o ? t.data.data.holdayPrice : t.data.data.price,
                        curtimestamp: Date.parse(i.getYMD() + " " + i.getHMS())
                    });
                }
            },
            fail: function(t) {
                console.log(t);
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    bindDateChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value);
        var a = this.datedifference(this.getYMD(), t.detail.value);
        console.log(a), a > 6 ? wx.showModal({
            title: "提示",
            content: "未到售票日期"
        }) : (this.setData({
            date: t.detail.value
        }), this.getCarList(this.data.id, t.detail.value));
    },
    datedifference: function(t, a) {
        var e;
        return t = Date.parse(t), a = Date.parse(a), e = a - t, e = Math.abs(e), Math.floor(e / 864e5);
    },
    GetDateStr: function(t) {
        var a = new Date();
        return a.setDate(a.getDate() + t), a.getFullYear() + "-" + (a.getMonth() + 1 < 10 ? "0" + (a.getMonth() + 1) : a.getMonth() + 1) + "-" + (a.getDate() < 10 ? "0" + a.getDate() : a.getDate());
    },
    buyTicket: function(t) {
        var a = this.data.date + " " + t.currentTarget.dataset.time, e = this.data.id, i = this.data.infoData.price;
        wx.navigateTo({
            url: "/pages/bars/buyticket?time=" + a + "&id=" + e + "&price" + i + "&monthDate=" + this.data.date
        });
    },
    call: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    },
    getYMD: function() {
        var t = new Date(), a = t.getFullYear(), e = t.getMonth() + 1;
        e < 10 && (e = "0" + e);
        var i = t.getDate();
        return i < 10 && (i = "0" + i), a + "-" + e + "-" + i;
    },
    getNextYMD: function() {
        var t = new Date(), a = t.getFullYear(), e = t.getMonth() + 1;
        e < 9 && (e = "0" + e + 1), 12 == e && (e = "01", a += 1);
        var i = t.getDate();
        return i < 10 && (i = "0" + i), a + "-" + e + "-" + i;
    },
    getHMS: function() {
        var t = new Date(), a = t.getHours() + 1, e = t.getMinutes(), i = t.getSeconds();
        return a < 10 && (a = "0" + a), e < 10 && (e = "0" + e), i < 10 && (i = "0" + i), 
        a + ":" + e + ":" + i;
    },
    prevDay: function() {
        var t = this.data.id;
        0 != this.data.flagNum ? (0 == --this.data.flagNum ? this.setData({
            noPrevTicket: !0
        }) : this.setData({
            noPrevTicket: !1
        }), this.setData({
            noNextTicket: !1,
            date: this.GetDateStr(this.data.flagNum)
        }), this.getCarList(t, this.GetDateStr(this.data.flagNum))) : wx.showToast({
            title: "不显示过期车票"
        });
    },
    nextDay: function() {
        var t = this.data.id;
        10 != this.data.flagNum ? (++this.data.flagNum > 9 ? this.setData({
            noNextTicket: !0
        }) : this.setData({
            noNextTicket: !1
        }), this.setData({
            noPrevTicket: !1,
            date: this.GetDateStr(this.data.flagNum)
        }), this.getCarList(t, this.GetDateStr(this.data.flagNum))) : wx.showToast({
            title: "只显示十天车票"
        });
    },
    onReady: function(t) {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});