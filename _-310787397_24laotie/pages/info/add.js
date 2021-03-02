var utils = require("../../utils/util.js")
var a = require("../../utils/citys.js")
var e = (require("../../utils/JsonUtils.js"),
require("../../utils/base64.js"))
var s = getApp();
var i = utils.formatTime(new Date()).split(" ")[0]
var n = utils.formatTime(new Date(new Date().getTime() + 307584e5)).split(" ")[0];

Page({
    data: {
        animationAddressMenu: {},
        animationData: {},
        type: 1,
        date: i,
        start: i,
        end: n,
        time: "请选择时间",
        types: [ {
            name: "1",
            value: "车找人",
            checked: true
        }, {
            name: "2",
            value: "人找车"
        } ],
        typesway: [
            {
                name: "1",
                value: "顺路",
                checked: true
            },
            {
                name: "2",
                value: "专车"
            }
        ],
        surPluss: [ "请选择", 1, 2, 3, 4, 5, 6 ],
        surplus: 0,
        isAgree: true,
        vehicle: "",
        departure: "出发地",
        departCondition: false,
        departProvince: "请选择出发地",
        departCity: "",
        departCounty: "",
        departProvinces: [],
        departCitys: [],
        departCountys: [],
        departValue: [ 1, 3, 2 ],
        departValues: [ 1, 3, 2 ],
        destination: "目的地",
        destCondition: !1,
        destProvince: "请选择目的地",
        destCity: "",
        destCounty: "",
        destProvinces: [],
        destCitys: [],
        destCountys: [],
        destValue: [ 0, 0, 6 ],
        destValues: [ 0, 0, 6 ],
        startTimeCond: false,
        startTimeValues: [ 0, 0, 0 ],
        startTime: "",
        dayInfos: [],
        hourInfos: [],
        minuteInfos: [],
        showTextAreaHolder: true,
        skVal: "",
        price: 100,
        secondPrice: 1,
        isPay: false,
        addArr: [],
        addIsPay: false,
        items: [ {
            name: "none",
            value: "否",
            checked: "true"
        }, {
            name: "one",
            value: "置顶"
        } ],
        topType: "none"
    },
    departOpenMode: function(t) {},
    startTimeOpen: function(t) {
        var a = this, e = this.data.startTime, s = this.data.date, i = this.data.time;
        if (this.data.startTimeCond) {
            if (this.animation.translateY("0vh").step(), "startTimeNoLimit" == t.currentTarget.id) e = "", 
            s = ""; else if ("startTimeTure" == t.currentTarget.id) {
                var n = this.data.startTimeValues;
                "" == e && (e = this.data.dayInfos[n[0]] + " " + this.data.hourInfos[n[1]] + "点 " + this.data.minutInfos[n[2]] + "分");
                var r = new Date(), d = r.getDate();
                r.setDate(d + n[0]), s = r.getFullYear() + "-" + (r.getMonth() + 1) + "-" + r.getDate(), 
                i = this.data.hourInfos[n[1]] + ":" + this.data.minutInfos[n[2]] + ":0";
            }
        } else this.animation.translateY("40vh").step();
        console.log("我要动画:"), a.setData({
            animationAddressMenu: a.animation.export(),
            startTimeCond: !this.data.startTimeCond,
            startTime: e,
            date: s,
            time: i
        });
    },
    bindDepartChangeCityInfo: function(t) {
        var e = t.detail.value, s = this.data.departValues, i = this.data.cityData, n = e[0];
        if (1 == this.data.departProvinces.length && (n = a.getDefCityIndex()), e[0] == s[0]) {
            if (e[1] != s[1]) {
                var r = [];
                if (i[n].s[e[1]].s) for (var d = 0; d < i[n].s[e[1]].s.length; d++) r.push(i[n].s[e[1]].s[d].n);
                var o = "";
                return i[n].s[e[1]].s && (o = i[n].s[e[1]].s[0].n), void this.setData({
                    departProvince: this.data.departProvinces[e[0]],
                    departCity: this.data.departCitys[e[1]],
                    departCounty: o,
                    departCountys: r,
                    departValues: e,
                    departValue: [ n, e[1], 0 ]
                });
            }
            e[2] == s[2] || e && this.setData({
                departProvince: this.data.departProvinces[e[0]],
                departCity: this.data.departCitys[e[1]],
                departCounty: this.data.departCountys[e[2]],
                departValues: e
            });
        } else {
            var u, l = [], h = [], c = "";
            if (i[n].s) {
                for (var p = 0; p < i[n].s.length; p++) l.push(i[n].s[p].n);
                u = l[0];
            }
            if (i[n].s[0].s) {
                for (var f = 0; f < i[n].s[0].s.length; f++) h.push(i[n].s[0].s[f].n);
                c = h[0];
            }
            this.setData({
                departProvince: this.data.departProvinces[n],
                departCity: u,
                departCounty: c,
                departCitys: l,
                departCountys: h,
                departValues: e,
                departValue: [ n, 0, 0 ]
            });
        }
    },
    bindDestChangeCityInfo: function(t) {
        var e = t.detail.value, s = this.data.destValues, i = this.data.cityData, n = e[0];
        if (1 == this.data.destProvinces.length && (n = a.getDefCityIndex()), e[0] == s[0]) if (e[1] == s[1]) e[2] == s[2] || this.setData({
            destCity: this.data.destCitys[e[1]],
            destProvince: this.data.destProvinces[e[0]],
            destCounty: this.data.destCountys[e[2]],
            destValues: e
        }); else {
            var r = [], d = "";
            if (i[n].s[e[1]].s) {
                for (var o = 0; o < i[n].s[e[1]].s.length; o++) r.push(i[n].s[e[1]].s[o].n);
                d = r[0];
            }
            this.setData({
                destProvince: this.data.destProvinces[e[0]],
                destCity: this.data.destCitys[e[1]],
                destCounty: d,
                destCountys: r,
                destValues: e,
                destValue: [ n, e[1], 0 ]
            });
        } else {
            for (var u = [], l = [], d = "", h = 0; h < i[n].s.length; h++) u.push(i[n].s[h].n);
            if (i[n].s[0].s) {
                for (var c = 0; c < i[n].s[0].s.length; c++) l.push(i[n].s[0].s[c].n);
                d = l[0];
            }
            this.setData({
                destProvince: this.data.destProvinces[n],
                destCity: i[n].s[0].n,
                destCounty: d,
                destCitys: u,
                destCountys: l,
                destValues: e,
                destValue: [ n, 0, 0 ]
            });
        }
    },
    bindDateChange: function(t) {
        this.setData({
            date: t.detail.value
        });
    },
    bindTimeChange: function(t) {
        this.setData({
            time: t.detail.value
        });
    },
    selectType: function(t) {
        this.setData({
            type: t.detail.value
        });
    },
    setsurplus: function(t) {
        this.setData({
            surplus: t.detail.value
        });
    },
    bindAgreeChange: function(t) {
        this.setData({
            isAgree: !!t.detail.value.length
        });
    },
    formSubmit: function(a) {
        var i = a.detail.value, n = this;
        console.log('========i==', i);
        if (i.time = this.data.time, i.date = this.data.date, i.topType = this.data.topType, 
        null == s.globalData.userInfo) return utils.isError("需要登录才可以发单", n), void s.login();
        if ("" == i.name) return utils.isError("请输入姓名", n), !1;
        if ("" == i.phone) return utils.isError("请输入手机号码", n), !1;
        if (!/^1[3456789]\d{9}$/.test(i.phone)) return utils.isError("手机号码错误", n), !1;
        if ("出发地" == n.data.departure) return utils.isError("请选择出发地", n), !1;
        if ("目的地" == n.data.destination) return utils.isError("请选择目的地", n), !1;
        if (!i.time || "" == i.time || "请选择时间" == i.time) return utils.isError("请选择出发时间", n), 
        !1;
        if ("0" == i.surplus) {
            var r = new Array("", "剩余空位", "乘车人数");
            return utils.isError("请选择" + r[i.type], n), !1;
        }
        if ("" == i.vehicle) return utils.isError("请输入车型", n), !1;
        if (!i.isAgree[0]) return utils.isError("请阅读并同意条款", n), !1;
        s.globalData.userInfo.phone || (s.globalData.userInfo.phone = i.phone), !s.globalData.userInfo.vehicle && i.vehicle && (s.globalData.userInfo.vehicle = i.vehicle), 
        wx.getStorage({
            key: "sk",
            success: function(t) {
                n.setData({
                    skVal: t.data
                });
            }
        }), i.sk = s.globalData.sk ? s.globalData.sk : n.data.skVal, i.departure = n.data.departure, 
        i.destination = n.data.destination;
        var d = n.data.departure.split(";;"), o = n.data.destination.split(";;");
        i.departCity = d[0], i.departDistrict = d[1], d.length > 2 ? i.departTown = d[2] : i.departTown = "", 
        i.destCity = o[0], i.destDistrict = o[1], o.length > 2 ? i.destTown = o[2] : i.destTown = "", 
        i.name = e.encode(i.name), i.vehicle = e.encode(i.vehicle), i.remark = e.encode(i.remark), 
        i.isEncode = !0;
        var u = Date.parse(new Date());
        u /= 1e3;
        console.log('========s.d.viptime=', s.d.viptime);
        console.log('========u=', u);
        if (s.d.viptime > u) {
            n.addInfo(i)
        } else {
            if (this.data.isPay) {
                wx.showLoading({
                    title: "加载中..."
                });
                wx.request({
                    url: s.d.hostImgUrl + "info/userdel",
                    data: i,
                    success: function(t) {
                        if (t.data.data) {
                            for (var a = 0; a < n.data.addArr.length; a++) n.data.departProvince == n.data.addArr[a] && n.setData({
                                addIsPay: !0
                            });
                            for (var e = 0; e < n.data.addArr.length; e++) n.data.destProvince == n.data.addArr[e] && n.setData({
                                addIsPay: !0
                            });
                            n.data.addIsPay && n.wxpay(i);
                        } else s.login();
                    }
                });
            } else {
                n.addInfo(i);
            }
        }
    },
    radioChange: function(t) {
        this.setData({
            topType: t.detail.value
        });
    },
    addInfo: function(a) {
        utils.req("/api/info/add", a, (a)=> {
            utils.dddd(a, "infoAdd2 :");
            wx.hideLoading();
            if (1 != a.status) {
                return utils.isError(a.msg, this);
            }
            wx.redirectTo({
                url: "/pages/info/index?id=" + a.info
            });
            var e = getCurrentPages();
            console.log(e);
        }, "订单发布中..", "订单发布失败,请重试..");
        utils.clearError(this);
    },
    sexDeparture: function() {
        var t = this;
        wx.chooseLocation({
            success: function(a) {
                t.setData({
                    departure: a.address
                });
            }
        });
    },
    departOpen: function(t) {
        if (console.log("出发地选择了： " + this.data.departCondition + " ;; " + this.data.departProvince), 
        this.data.departCondition) {
            var e = this.data.destProvinces, s = this.data.destCitys, i = this.data.destCountys;
            console.log("关闭选择面板 : ");
            var n = a.getDefCityName(), r = this.data.destProvince, d = this.data.destCity, o = this.data.destCounty, u = this.data.destValue, l = this.data.destValues, h = this.data.departProvince, c = this.data.departCity, p = this.data.departCounty;
            if ("ok" != t.currentTarget.dataset.id || c || (h = this.data.departProvinces[0], 
            c = this.data.departCitys[0], this.data.departCountys && (p = this.data.departCountys[0])), 
            h == n) e = a.getProvinces(), s = a.findDistrictArray(l[0]), i = a.findCountyArray(l[0], l[1]); else if (c && h != n && (this.data.destProvince != n || 1 != this.data.destProvinces.length)) {
                e = [ n ];
                var f = a.getDefCityIndex();
                s = a.findDistrictArray(f), this.data.destProvince != n ? (i = a.findCountyArray(f, 0), 
                r = n, d = s[0], o = i[0], u = [ 0, 0, 0 ], l = [ 0, 0, 0 ]) : i = a.findCountyArray(f, u[1]);
            }
            var y = h + ";;" + c + ";;" + p;
            this.setData({
                departProvince: h,
                departCity: c,
                departCounty: p,
                departCondition: !this.data.departCondition,
                destProvinces: e,
                destCitys: s,
                destCountys: i,
                destValue: u,
                destValues: l,
                destProvince: r,
                destCity: d,
                destCounty: o,
                destination: r + ";;" + d + ";;" + o,
                departure: y,
                departValue: this.data.departValues
            });
        } else this.startAddressAnimation(!this.data.departCondition, !1);
    },
    startAddressAnimation: function(t, a) {
        var e = this;
        t || a ? e.animation.translateY("0vh").step() : e.animation.translateY("40vh").step(), 
        console.log("我要动画:" + t + " ;; " + a), e.setData({
            animationAddressMenu: e.animation.export(),
            departCondition: t,
            destCondition: a,
            destValue: this.data.destValues,
            departValue: this.data.departValues
        });
    },
    hideCitySelected: function(t) {
        console.log(t), this.startAddressAnimation(!1);
    },
    destOpen: function(t) {
        console.log("目的地选择了： " + this.data.destCondition + " ;; " + this.data.destProvince);
        h = this.data.destProvince;
        if (this.data.destCondition) {
            var e = this.data.departProvinces, s = this.data.departCitys, i = this.data.departCountys;
            console.log("关闭选择面板 : ");
            var n = a.getDefCityName(), r = this.data.departProvince, d = this.data.departCity, o = this.data.departCounty, u = this.data.departValue, l = this.data.departValues, h = this.data.destProvince, c = this.data.destCity, p = this.data.destCounty;
            if ("ok" != t.currentTarget.dataset.id || c || (h = this.data.destProvinces[0], 
            c = this.data.destCitys[0], this.data.destCountys && (p = this.data.destCountys[0])), 
            h == n) e = a.getProvinces(), s = a.findDistrictArray(l[0]), i = a.findCountyArray(l[0], l[1]); else if (c && (this.data.departProvince != n || 1 != this.data.departProvinces.length)) {
                e = [ n ];
                var f = a.getDefCityIndex();
                s = a.findDistrictArray(f), this.data.departProvince != n ? (i = a.findCountyArray(f, 0), 
                r = n, d = s[0], o = i[0], u = [ 0, 0, 0 ], l = [ 0, 0, 0 ]) : i = a.findCountyArray(f, u[1]);
            }
            var y = h + ";;" + c + ";;" + p;
            this.setData({
                destProvince: h,
                destCity: c,
                destCounty: p,
                destCondition: !this.data.destCondition,
                departProvinces: e,
                departCitys: s,
                departCountys: i,
                departValue: u,
                departValues: l,
                departProvince: r,
                departCity: d,
                departCounty: o,
                destination: y,
                departure: r + ";;" + d + ";;" + o,
                destValue: this.data.destValues
            });
            console.log('this.data=',this.data);
        } else this.startAddressAnimation(!1, !this.data.destCondition);
    },
    initDataInfo: function() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        var cur_date = new Date();
        let month = cur_date.getMonth() + 1;
        let day = cur_date.getDate();
        let hour = cur_date.getHours();
        let minu = cur_date.getMinutes();
        let w_day = cur_date.getDay();
        let wdays = new Array("今天", "明天", "后天");
        let arr_wday = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
        cur_date.setDate(w_day + 3);
        for (let d = "", o = 0; o < 30; o++) {
            month = cur_date.getMonth() + 1;
            w_day = cur_date.getDate();
            d = arr_wday[cur_date.getDay()]; 
            wdays.push(month + "月" + w_day + "日  " + d);
            cur_date.setDate(w_day + 1);
        }
        let hour_infos = [];
        let minu_infos = [];
        let start_h = 0;
        let start_m = 0;
        let first_start_time = this.data.startTimeValues[0];
        let second_start_time = this.data.startTimeValues[1];
        let cur_set_date = new Date(this.data.startTime);

        if (0 == first_start_time && 0 == second_start_time) {
            if (minu < 50) {
                start_h = hour;
                start_m = 10 * (parseInt(minu / 10) + 1);
            } else {
                start_h = hour + 1;
                start_m = 0;
            }
        } else {
            console.log('this.data=',this.data);
        }
        if (start_h == 24 && start_m == 0) {
            start_h = 0;
            start_m = 0;
            wdays.splice(0, 1);
        }
        for (let o = start_h; o < 24; o++) {
            hour_infos.push(o);
        }
        for (let o = start_m; o < 55; ) {
            minu_infos.push(o);
            o += 10;
        }
        this.setData({
            dayInfos: wdays,
            hourInfos: hour_infos,
            minutInfos: minu_infos
        });
    },
    bindsStartTime: function(t) {
        var a = t.detail.value, e = this.data.startTimeValues;
        this.data.cityData[a[1]];
        if (a[0] != e[0]) {
            if (0 == a[0]) {
                e[0] = 0;
                e[1] = 0;
                e[2] = 0;
            } else {
                e[0] = a[0];
                e[1] = a[1];
                e[2] = a[2];
            }
            this.initDataInfo(); 
        }
        else if (a[1] != e[1]) {
            e[2] = 0, e[1] = a[1];
            var s = 0;
            if (0 == a[0] && 0 == e[1]) {
                var i = new Date().getMinutes();
                s = 10 * (parseInt(i / 10) + 1);
            }
            for (var n = [], r = s; r < 55; ) {
                n.push(r);
                r += 10;
            }
            this.setData({
                minutInfos: n
            });
        } else {
            e[2] = a[2];
        }
        var d = this.data.dayInfos[e[0]], o = this.data.hourInfos[e[1]], u = this.data.minutInfos[e[2]];
        this.setData({
            startTimeValues: e,
            startTime: d + " " + o + "点 " + u + "分"
        });
    },
    textAreaFocus: function() {
        console.log("textAreaFocus 1"), this.setData({
            showTextAreaHolder: !1
        });
    },
    textAreaBlur: function(t) {
        console.log("textAreaBlur 1");
        var a = !0;
        t.detail.value.replace(/(^\s*)|(\s*$)/g, "").length > 0 && (a = !1), this.setData({
            showTextAreaHolder: a
        });
    },
    sexDestination: function() {
        var t = this;
        wx.chooseLocation({
            success: function(a) {
                t.setData({
                    destination: a.address
                });
            }
        });
    },

    initData: function() {
        if (null != s.globalData.userInfo) {
            this.setData({
                name: s.globalData.userInfo.name || s.globalData.userInfo.nickName,
                phone: s.globalData.userInfo.phone,
                vehicle: s.globalData.userInfo.vehicle
            });
            this.isVipFun();
        }
        // wx.cloud.callFunction({
        //     name: 'login',
        //     data: {weRunData: wx.cloud.CloudID(e.detail.cloudID)}
        //   }).then(res => {
        //     this.setData({
        //       mobile: res.result.weRunData.data.phoneNumber
        //     })
        // })
        var i = wx.createAnimation({
            duration: 500,
            transformOrigin: "50% 50%",
            timingFunction: "ease"
        });
        this.animation = i, a.init(this);
        for (var n = this.data.cityData, r = [], d = [], o = [], u = 0; u < n.length; u++) r.push(n[u].n);
        console.log("省份完成");
        for (var l = 0; l < n[0].s.length; l++) d.push(n[0].s[l].n);
        console.log("city完成");
        for (var h = 0; h < n[0].s[0].s.length; h++) o.push(n[0].s[0].s[h].n);
        this.initDataInfo();
        if (1 == e.t) t.parseOrderInfo(e.c);
        this.setData({
            departProvinces: r,
            departCitys: d,
            departCountys: o,
            destProvinces: r,
            destCitys: d,
            destCountys: o
        }), this.setWxPayStatus();
    },

    onLoad: function(e) {
        wx.getStorage({
            key: "sk",
            success: (t)=> {
                this.initData();
            },
            fail: (t)=> {
                s.login(this.initData);
            }
        });
        
    },
    isVipFun: function() {
        wx.getStorage({
            key: "sk",
            success: function(a) {
                utils.req("api/info/mytime", {
                    sk: a.data
                }, function(t) {
                    s.d.viptime = t.viptime;
                });
            }
        });
    },
    setWxPayStatus: function() {
        var t = this;
        wx.request({
            url: s.d.hostImgUrl + "user/status",
            success: function(a) {
                1 == a.data.isPay ? t.setData({
                    isPay: !0,
                    price: a.data.price,
                    secondPrice: a.data.secondPrice,
                    addArr: a.data.addArr.split(",")
                }) : t.setData({
                    isPay: !1
                });
            }
        });
    },
    wxpay: function(t) {
        var a = this;
        wx.showLoading({
            title: "加载中..."
        }), wx.login({
            success: function(e) {
                console.log(e), e.code ? wx.request({
                    url: s.serverConfig.ip_address + "api/index/payopenid",
                    data: {
                        code: e.code
                    },
                    success: function(e) {
                        console.log(e);
                        var s = e.data.openid;
                        e.data.session_key;
                        a.submitForm(e, s, t);
                    }
                }) : console.log("登录失败！" + e.errMsg);
            }
        });
    },
    submitForm: function(a, e, i) {
        var n = this;
        wx.request({
            url: s.serverConfig.ip_address + "Api/index/makeorder",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            data: {
                openid: e,
                data_total: 1 == n.data.type ? n.data.price : n.data.secondPrice
            },
            success: function(a) {
                i.orderNo = a.data.out_trade_no;
                console.log('a.data=', a.data);
                if (a.data.state == 1) {
                    wx.requestPayment({
                        timeStamp: a.data.timeStamp,
                        nonceStr: a.data.nonceStr,
                        package: a.data.package,
                        signType: a.data.signType,
                        paySign: a.data.paySign,
                        topType: a.data.topType,
                        success: function(a) {
                            console.log(a);
                            t.req("/api/info/add", i, function(a) {
                                t.dddd(a, "infoadd:");
                                wx.hideLoading();
                                if (1 != a.status) {
                                    return t.isError(a.msg, n);
                                }
                                wx.redirectTo({
                                    url: "/pages/info/index?id=" + a.info
                                });
                                var e = getCurrentPages();
                                console.log(e);
                            }, "订单发布中..", "订单发布失败,请重试.."), t.clearError(n);
                        },
                        fail: function(t) {
                            wx.showToast({
                                title: "发布失败",
                                icon: "fail",
                                duration: 1e3
                            });
                        },
                        complete: function(t) {
                            console.log(t.errMsg);
                        }
                    })
                } else if (0 == a.data.state) {
                    wx.showToast({
                        title: a.data.Msg,
                        icon: "fail",
                        duration: 1e3
                    })
                } else {
                    wx.showToast({
                        title: "系统繁忙，请稍后重试~",
                        icon: "fail",
                        duration: 1e3
                    });
                }
            }
        });
    }
});