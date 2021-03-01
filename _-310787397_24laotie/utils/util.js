function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

function t(e, t) {
    t.setData({
        showTopTips: !0,
        errorMsg: e
    }), setTimeout(function() {
        t.setData({
            showTopTips: !1
        });
    }, 2e3);
}

function n(e) {
    e.setData({
        showTopTips: !1,
        errorMsg: ""
    });
}

function r(e, t) {
    var n = "";
    if (e instanceof Array) for (var i = 0; i < e.length; i++) o(e[i]) ? (n += "\n", 
    r(e[i], t)) : n += "[" + i + "] => " + e[i] + "\n"; else if (e instanceof Object) for (var a in e) o(a) ? (n += "\n", 
    r(e[a], t)) : n += a + ":" + e[a] + "\n"; else n = "" + e;
    t || (t = "dddd"), console.log(t + " start =================== "), console.log(n + ""), 
    console.log(t + "end =================== ");
}

function o(e) {
    return e instanceof Object || e instanceof Array;
}

var i = "https://192.168.22.45/index.php/";

module.exports = {
    formatTime: function(t) {
        var n = t.getFullYear(), r = t.getMonth() + 1, o = t.getDate(), i = t.getHours(), a = t.getMinutes(), s = t.getSeconds();
        return [ n, r, o ].map(e).join("-") + " " + [ i, a, s ].map(e).join(":");
    },
    req: function(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "拼命加载中...", o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "数据加载失败";
        wx.showLoading({
            title: r,
            mask: !0
        }), wx.request({
            url: i + e,
            data: t,
            method: "post",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                return wx.hideLoading(), "function" == typeof n && n(e.data);
            },
            fail: function() {
                return wx.hideLoading(), wx.showToast({
                    title: o,
                    mask: "true",
                    image: "/img/load_fail.png"
                }), "function" == typeof n && n(!1);
            }
        });
    },
    trim: function(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
    },
    isError: t,
    clearError: n,
    getReq: function(e, t, n) {
        wx.request({
            url: i + e,
            data: t,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                return "function" == typeof n && n(e.data);
            },
            fail: function() {
                return "function" == typeof n && n(!1);
            }
        });
    },
    getDateDiff: function(e) {
        var t = 864e5, n = e - new Date().getTime();
        if (!(n < 0)) {
            var r = n / 2592e6, o = n / (7 * t), i = n / t, a = n / 36e5, s = n / 6e4, f = new Date(), u = new Date();
            u.setDate(f.getDate() + 1), u.setHours(0), u.setMinutes(0), u.setSeconds(0);
            var d = new Date();
            return d.setDate(f.getDate() + 2), d.setHours(0), d.setMinutes(0), d.setSeconds(0), 
            e >= u.getTime() && e < u.getTime() + t ? "明天" : e >= d.getTime() && e < d.getTime() + t ? "后天" : r >= 1 ? parseInt(r) + "月后" : o >= 1 ? parseInt(o) + "周后" : 1 == i ? "明天" : 2 == i ? "后天" : i > 2 ? parseInt(i) + "天后" : a >= 1 ? parseInt(a) + "小时后" : s >= 1 ? parseInt(s) + "分钟后" : "刚刚";
        }
    },
    escape2Html: function(e) {
        var t = {
            lt: "<",
            gt: ">",
            nbsp: " ",
            amp: "&",
            quot: '"'
        };
        return e.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(e, n) {
            return t[n];
        });
    },
    getDateBiff: function(e) {
        var t = new Date().getTime() - e;
        if (!(t < 0)) {
            var n = t / 2592e6, r = t / 6048e5, o = t / 864e5, i = t / 36e5, a = t / 6e4;
            return n >= 1 ? parseInt(n) + "月前" : r >= 1 ? parseInt(r) + "周前" : o >= 1 ? parseInt(o) + "天前" : i >= 1 ? parseInt(i) + "小时前" : a >= 1 ? parseInt(a) + "分钟前" : "刚刚";
        }
    },
    isErrorOnAutoHide: function(e, r) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3;
        t(e, r);
        var i = setInterval(function() {
            n(r), console.log("清除错误"), clearInterval(i);
        }, o);
    },
    formatTime1: function(t) {
        var n = t.getFullYear(), r = t.getMonth() + 1, o = t.getDate(), i = t.getHours(), a = t.getMinutes();
        return [ n, r, o ].map(e).join("-") + " " + [ i, a ].map(e).join(":");
    },
    formatTime2: function(t) {
        var n = t.getFullYear(), r = t.getMonth() + 1, o = t.getDate(), i = new Date(), a = i.getFullYear(), s = i.getMonth() + 1, f = i.getDate(), u = t.getHours(), d = t.getMinutes();
        if (a == n && r == s) {
            if (o == f) return "今天 " + [ u, d ].map(e).join(":");
            if (o == f + 1) return "明天 " + [ u, d ].map(e).join(":");
            if (o == f + 2) return "后天 " + [ u, d ].map(e).join(":");
        }
        return [ r, o ].map(e).join("-") + " " + [ u, d ].map(e).join(":");
    },
    isLogin: function() {
        var e = getApp();
        return e.globalData && e.globalData.userInfo && null != e.globalData.userInfo;
    },
    isOrder: function(e) {
        if (!e) return !1;
        var t = new RegExp("\\d+\\s*[人|座|座位|位|个人|个座位]");
        return e && (-1 != e.indexOf("车找人") || -1 != e.indexOf("人找车") || -1 != e.indexOf("顺风车") || -1 != e.indexOf("拼车") || -1 != e.indexOf("顺路") || -1 != e.indexOf("包车") || -1 != e.indexOf("专车") || -1 != e.indexOf("顺路") || -1 != e.indexOf("天天班") || -1 != e.indexOf("有去") || -1 != e.indexOf("有回")) || -1 != e.indexOf("车主") || -1 != e.indexOf("乘客") || t.test(e);
    },
    parseOrderInfo: function(e) {
        var t = {};
        return -1 != e.indexOf("车找人") || -1 != e.indexOf("包车") || -1 != e.indexOf("专车") || -1 != e.indexOf("顺风车") || -1 != e.indexOf("承接") || -1 != e.indexOf("天天班") ? t.type = 1 : -1 != e.indexOf("人找车") && (t.type = 2), 
        t;
    },
    dddd: r
};