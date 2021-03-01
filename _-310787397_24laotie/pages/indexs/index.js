var t = require("../../utils/util.js"), a = (require("../../utils/JsonUtils.js"), 
require("../../utils/citys.js")), e = require("../../utils/base64.js"), s = getApp(), i = (t.formatTime(new Date()).split(" ")[0], 
1);

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        departCondition: !1,
        destCondition: !1,
        startTimeCond: !1,
        animationAddressMenu: {},
        departCountys: [],
        departCitys: [],
        departValue: [ 0, 0, 0, 0 ],
        departValues: [ 0, 0 ],
        destCitys: [],
        destCountys: [],
        destValue: [ 0, 0, 0, 0 ],
        destValues: [ 0, 0 ],
        date: "",
        tabs: [ "全部", "车找人", "人找车", "筛选" ],
        navIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        start: "",
        over: "",
        nomore: !1,
        dayInfos: [],
        startTimeValue: 0,
        startTime: "",
        isQuery: !1,
        showModal: !1,
        hbStatus: !1,
        hbmsg: "",
        hbNum: "",
        carMsg: "",
        carStatus: !1,
        noticeStatus: !1,
        noticeMsg: "",
        bannerList: [],
        isLoadingList: !1,
        carList: [],
        carTempList: [],
        tipsStatus: !1
    },
    onShow: function() {
        var t = this;
        wx.showLoading({
            title: "正在加载中..."
        }), wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    sliderLeft: (a.windowWidth / t.data.tabs.length - 96) / 2,
                    sliderOffset: a.windowWidth / t.data.tabs.length * t.data.navIndex,
                    windowHeight: a.windowHeight,
                    windowWidth: a.windowWidth
                });
            }
        }), wx.getStorage({
            key: "showTips",
            fail: function(a) {
                (-1 != a.errMsg.indexOf("not found") || a.data.length < 1) && t.setData({
                    showModal: !0
                });
            }
        });
        var e = wx.createAnimation({
            duration: 500,
            transformOrigin: "50% 50%",
            timingFunction: "ease"
        });
        this.animation = e, a.init(t, !0), t.initAddressInfo(), t.initDataInfo(), this.judge(t.data.date, "");
    },
    judge: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", i = this;
        wx.getStorage({
            key: "sk",
            success: function(n) {
                wx.showLoading({
                    title: "加载中"
                }), n.data && wx.request({
                    url: s.d.hostImgUrl + "info/valid",
                    data: {
                        sk: n.data
                    },
                    success: function(s) {
                        i.setData({
                            tipsStatus: !1
                        }), 0 == s.data.userstatus && i.getList(t, a, e);
                    }
                });
            },
            fail: function(t) {
                i.setData({
                    tipsStatus: !0
                }), wx.hideLoading();
            }
        });
    },
    tabClick: function(t) {
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            navIndex: t.currentTarget.id
        });
    },
    getList: function() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "", d = this;
        if (this.data.isLoadingList) return !1;
        this.data.isQuery || (a = "", s = "", n = "");
        var r = "", o = "";
        if (s && -1 != s.indexOf("-")) {
            var u = s.split("-");
            r = u[0], o = "全市" == u[1] ? "" : u[1];
        }
        var h = "", l = "";
        if (n && -1 != n.indexOf("-")) {
            var f = n.split("-");
            h = f[0], l = "全市" == f[1] ? "" : f[1];
        }
        a && -1 != a.indexOf("-") || (a = "");
        var c = {
            departCity: r,
            departCounty: o,
            destCity: h,
            destCountry: l,
            date: a,
            page: i
        };
        t.req("api/info/lists", c, function(a) {
            wx.hideLoading();
            var s = [];
            console.log('aaaaaaaaaa=', a);
            if (1 == a.status && a.list) {
                s = [], d.data.carList.length > 140 && d.setData({
                    carList: []
                });
                var n = a.list.map(function(a) {
                    var s = {
                        phones: a.phone.substr(7, 4),
                        name: e.decode(a.nickname) || e.decode(a.name),
                        remark: e.decode(a.remark),
                        vehicle: e.decode(a.vehicle),
                        time: t.formatTime2(new Date(1e3 * a.time)),
                        start: a.departCity + "-" + a.departDistrict + (a.departTown ? "-" + a.departTown : ""),
                        over: a.destCity + "-" + a.destDistrict + (a.destTown ? "-" + a.destTown : "")
                    };
                    return Object.assign({}, a, s);
                });
                s = 1 == i ? n : d.data.carList.concat(n), JSON.parse(JSON.stringify(s)), d.setData({
                    isLoadingList: !1,
                    carList: s,
                    nomore: !a.list || a.list.length < 20
                });
            } else d.setData({
                isLoadingList: !1,
                nomore: !a.list || a.list.length < 20
            });
        });
    },
    initData: function() {
        var t = this;
        wx.request({
            url: s.d.hostImgUrl + "user/status",
            success: function(a) {
                s.d.dyPrice = a.data.dyPrice, 1 == a.data.hbStatus ? t.setData({
                    hbStatus: !0,
                    hbmsg: a.data.hbText,
                    hbNum: a.data.hbNum
                }) : t.setData({
                    hbStatus: !1,
                    hbmsg: "",
                    hbNum: ""
                }), 1 == a.data.ncStatus ? t.setData({
                    noticeStatus: !0,
                    ncText: a.data.ncText
                }) : t.setData({
                    noticeStatus: !1,
                    ncText: ""
                }), 1 == a.data.carStatus ? t.setData({
                    carStatus: !0,
                    carMsg: a.data.carText
                }) : t.setData({
                    carStatus: !1,
                    carMsg: ""
                });
            },
            fail: function(t) {}
        });
    },
    onPullDownRefresh: function() {
        if (3 == this.data.navIndex) return wx.stopPullDownRefresh(), !1;
        var t = this;
        t.data.departCondition || t.data.destCondition || (i = 1, this.judge(t.data.date, t.data.start, t.data.over)), 
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.data.nomore || 3 == this.data.navIndex || (i++, this.getList(this.data.date, this.data.start, this.data.over));
    },
    queryList: function() {
        var t = this.data.date, a = this.data.start, e = this.data.over;
        i = 1, this.setData({
            navIndex: 0,
            sliderOffset: 0,
            isQuery: "" != t || "" != a || "" != e
        }), this.getList(t, a, e);
    },
    resetQryCond: function() {
        this.initAddressInfo(), this.initDataInfo(), this.setData({
            start: "",
            over: "",
            startTime: "",
            isQuery: !1,
            date: "",
            time: "",
            startTimeValue: 0
        }), this.page = 1, this.getList("", "", "");
    },
    copyText: function() {
        var t = this.data.hbNum;
        console.log(t), wx.setClipboardData({
            data: t,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {}
                });
            }
        });
    },
    bindDepartChangeCityInfo: function(t) {
        var a = t.detail.value, e = this.data.departValues, s = this.data.cityData[a[1]];
        if (a[1] != e[0]) {
            var i = [];
            i.push("全市");
            for (var n = 0; n < s.s.length; n++) i.push(s.s[n].n);
            var d = s.n + "-" + i[0];
            this.setData({
                departCountys: i,
                start: d,
                departValues: [ a[1], 0 ],
                departValue: [ 0, a[1], 0, 0 ]
            });
        } else if (a[2] != e[1]) {
            var r = this.data.departCitys[a[1]] + "-" + this.data.departCountys[a[2]];
            this.setData({
                start: r,
                departValues: [ e[0], a[2] ],
                departValue: [ 0, e[0], a[2], 0 ]
            });
        }
    },
    bindDestChangeCityInfo: function(t) {
        var a = t.detail.value, e = this.data.destValues, s = this.data.cityData[a[1]];
        if (a[1] != e[0]) {
            var i = [];
            i.push("全市");
            for (var n = 0; n < s.s.length; n++) i.push(s.s[n].n);
            var d = s.n + "-" + i[0];
            this.setData({
                destCountys: i,
                over: d,
                destValues: [ a[1], 0 ],
                destValue: [ 0, a[1], 0, 0 ]
            });
        } else if (a[2] != e[1]) {
            var r = this.data.destCitys[a[1]] + "-" + this.data.destCountys[a[2]];
            this.setData({
                over: r,
                destValues: [ e[0], a[2] ],
                destValue: [ 0, e[0], a[2], 0 ]
            });
        }
    },
    initDataInfo: function(t) {
        var a = new Date(), e = a.getMonth() + 1, s = a.getDate(), i = (a.getDay(), new Array("今天", "明天", "后天")), n = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
        a.setDate(s + 3);
        for (var d = "", r = 0; r < 30; r++) e = a.getMonth() + 1, s = a.getDate(), d = n[a.getDay()], 
        i.push(e + "月" + s + "日  " + d), a.setDate(s + 1);
        this.setData({
            dayInfos: i
        });
    },
    initAddressInfo: function() {
        for (var t = this.data.cityData, a = [], e = [], s = 0; s < t.length; s++) a.push(t[s].n);
        e.push("全市");
        for (var i = 0; i < t[0].s.length; i++) e.push(t[0].s[i].n);
        this.setData({
            departCitys: a,
            departCountys: e,
            destCitys: a,
            destCountys: e,
            departValue: [ 0, 0, 0, 0 ],
            departValues: [ 0, 0 ],
            destValue: [ 0, 0, 0, 0 ],
            destValues: [ 0, 0 ],
            start: "",
            over: ""
        });
    },
    onCancel: function() {
        this.setData({
            showModal: !1
        }), wx.setStorage({
            key: "showTips",
            data: "1"
        });
    },
    bindGetUserInfo: function(t) {
        if (console.log(t), t.detail.userInfo) {
            s.globalData.userInfo || s.login();
            var a = t.currentTarget.dataset.url;
            wx.navigateTo({
                url: a
            }), wx.setStorage({
                key: "status",
                data: "1"
            });
        } else wx.showModal({
            content: "您已拒绝授权",
            showCancel: !1,
            confirmText: "关闭",
            success: function(t) {}
        });
    },
    addInfo: function(t) {
        if (null == s.globalData || null == s.globalData.userInfo) s.login(function() {
            var a = t.currentTarget.dataset.url;
            wx.navigateTo({
                url: a
            });
        }); else {
            var a = t.currentTarget.dataset.url;
            wx.navigateTo({
                url: a
            });
        }
    },
    departOpen: function(t) {
        if (this.data.departCondition) {
            var e = this.data.start, s = [], i = [], n = this.data.departCitys, d = this.data.departCountys, r = this.data.departValues, o = this.data.departValue, u = this.data.destValues, h = this.data.destValue;
            if ("nolimit" == t.target.id) this.setData({
                start: ""
            }), e = "", n = s = a.getProvinces(), d = i = a.findDistrictArray(0), r = [ 0, 0 ], 
            u = [ 0, 0 ], h = [ 0, 0, 0, 0 ], o = [ 0, 0, 0, 0 ]; else if (-1 == this.data.start.indexOf("梅州市")) {
                var l = a.getDefCityName();
                s = [ l ], i = a.findDistrictArray(a.getDefCityIndex(l));
            } else s = a.getProvinces(), i = a.findDistrictArray(0);
            this.setData({
                destCitys: s,
                destCountys: i,
                departCitys: n,
                departCountys: d,
                departValues: r,
                departValue: o,
                destValue: h,
                destValues: u
            });
        }
        if (!this.data.departCondition && "" == this.data.start) {
            e = this.data.departCitys[this.data.departValue[1]] + "-" + this.data.departCountys[this.data.departValue[2]];
            this.setData({
                start: e
            });
        }
        this.startAddressAnimation(!this.data.departCondition, !1);
    },
    destOpen: function(t) {
        if (!this.data.destCondition && "" == this.data.over) {
            var e = this.data.destCitys[this.data.destValue[1]] + "-" + this.data.destCountys[this.data.destValue[2]];
            this.setData({
                over: e
            });
        }
        if (this.data.destCondition) {
            this.data.over;
            var s = this.data.destCitys, i = this.data.destCountys, n = [], d = [], r = this.data.departValues, o = this.data.departValue, u = this.data.destValues, h = this.data.destValue;
            if ("destnolimit" == t.target.id) this.setData({
                over: ""
            }), "", n = s = a.getProvinces(), d = i = a.findDistrictArray(0), r = [ 0, 0 ], 
            u = [ 0, 0 ], h = [ 0, 0, 0, 0 ], o = [ 0, 0, 0, 0 ]; else if (-1 == this.data.over.indexOf("梅州市")) {
                var l = a.getDefCityName();
                n = [ l ], d = a.findDistrictArray(a.getDefCityIndex(l));
            } else n = a.getProvinces(), d = a.findDistrictArray(0);
            this.setData({
                destCitys: s,
                destCountys: i,
                departCitys: n,
                departCountys: d,
                departValues: r,
                destValues: u,
                destValue: h,
                departValue: o
            });
        }
        this.startAddressAnimation(!1, !this.data.destCondition);
    },
    startTimeOpen: function(t) {
        var a = this.data.startTime, e = this.data.date;
        if (this.data.startTimeCond) {
            if (this.animation.translateY("0vh").step(), "startTimeNoLimit" == t.currentTarget.id) a = "", 
            e = ""; else if ("startTimeTure" == t.currentTarget.id) {
                var s = this.data.startTimeValue;
                "" == a && (a = this.data.dayInfos[s]);
                var i = new Date(), n = i.getDate();
                i.setDate(n + s), e = i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate();
            }
        } else this.animation.translateY("40vh").step();
        var d = this;
        this.setData({
            startTime: a,
            animationAddressMenu: d.animation.export(),
            startTimeCond: !d.data.startTimeCond,
            date: e
        });
    },
    bindsStartTime: function(t) {
        var a = t.detail.value[0];
        this.initDataInfo();
        var e = this.data.dayInfos[a];
        this.setData({
            startTimeValue: a,
            startTime: e
        });
    },
    startAddressAnimation: function(t, a) {
        var e = this;
        t || a ? e.animation.translateY("0vh").step() : e.animation.translateY("40vh").step(), 
        e.setData({
            animationAddressMenu: e.animation.export(),
            departCondition: t,
            destCondition: a,
            destValue: [ 0, this.data.destValues[0], this.data.destValues[1], 0 ],
            departValue: [ 0, this.data.departValues[0], this.data.departValues[1], 0 ]
        });
    },
    onShareAppMessage: function() {
        return {
            title: "都是来回梅州的车，我用它成功拼到了车，你也来试试吧！",
            path: "pages/indexs/index"
        };
    },
    call: function(t) {
        wx.makePhoneCall({
            phoneNumber: t.currentTarget.dataset.tel
        });
    }
});