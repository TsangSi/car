var e = getApp(), t = require("../../utils/util.js"), a = (require("../../utils/base64.js"), 
1);

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        seecomment: !1,
        comments: Array(),
        reply: "",
        itemType: [ "全部", "工作求职", "工作招聘", "房屋出售", "房屋出租", "房屋求租", "房屋求购", "生意转让", "汽车出售", "汽车求购", "二手物品", "失物招领", "寻物", "寻人", "打听事", "商家优惠", "其它" ],
        itemIndex: 0,
        addressItem: [ "全部", "梅江区", "梅县区", "兴宁市", "五华县", "平远县", "蕉岭县", "大浦县", "丰顺县" ],
        index: 0,
        imgUrls: [],
        indicatorDots: !0,
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        menuList: [ {
            id: 1,
            imgText: "招聘"
        }, {
            id: 2,
            imgText: "求职"
        }, {
            id: 3,
            imgText: "出售"
        }, {
            id: 4,
            imgText: "求购"
        }, {
            id: 5,
            imgText: "打听事"
        }, {
            id: 6,
            imgText: "租赁"
        } ]
    },
    bindPickerChange: function(e) {
        console.log("picker1发送选择改变，携带值为", parseInt(e.detail.value) + 1), this.setData({
            index: e.detail.value
        }), a = 1, this.getList({
            dyType: this.data.itemIndex,
            dyAddress: this.data.index
        });
    },
    bindPickerType: function(e) {
        console.log("picker2发送选择改变，携带值为", parseInt(e.detail.value) + 1), this.setData({
            itemIndex: e.detail.value
        }), a = 1, this.getList({
            dyType: this.data.itemIndex,
            dyAddress: this.data.index
        });
    },
    bindGetUserInfo: function(e) {
        if (e.detail.userInfo) {
            e.currentTarget.dataset.url;
            wx.navigateTo({
                url: "/pages/index/add"
            });
        } else wx.showModal({
            content: "您已拒绝授权",
            showCancel: !1,
            confirmText: "知道了",
            success: function(e) {}
        });
    },
    previeimg: function(e) {
        wx.previewImage({
            current: e.currentTarget.id,
            urls: [ "" + e.currentTarget.dataset.url ]
        });
    },
    getList: function() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = this, s = 0, d = 0;
        i.dyAddress && (s = i.dyAddress), i.dyType && (d = i.dyType);
        var o = {
            page: a,
            sk: e.globalData.sk,
            dyAddress: s,
            dyType: d
        };
        null == e.globalData.sk && (o = {
            page: a,
            dyAddress: s,
            dyType: d
        }), t.req("api/dynamic/getlist", o, function(e) {
            var i = e.list, s = new Array();
            1 == a || (s = n.data.list), i && i.forEach(function(e) {
                e.comment && e.comment.forEach(function(e) {
                    e.content && (e.content = e.content), e.reply && (e.reply = e.reply);
                });
                var a = {
                    avatarUrl: e.avatarUrl,
                    content: e.content,
                    id: e.id,
                    uid: e.uid,
                    nickName: e.nickName,
                    time: t.getDateBiff(1e3 * e.time),
                    zan: e.zan,
                    iszan: e.iszan,
                    comments: e.comment,
                    dyType: e.dyType,
                    dyAddress: e.dyAddress,
                    phone: e.phone
                }, i = "";
                e.img && (i = JSON.parse(e.img)), e.img && i.length > 0 ? (a.imgshow = !0, a.imgs = i[0]) : (a.imgshow = !1, 
                a.imgs = ""), s.push(a);
            }), n.setData({
                list: s
            });
        });
    },
    call: function(e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.tel
        });
    },
    zan: function(a) {
        if (t.isLogin()) {
            var i = this;
            console.log("赞 : " + a.currentTarget.dataset.id), t.req("api/Dynamics/zan", {
                cid: a.currentTarget.dataset.id,
                sk: e.globalData.sk
            }, function(e) {
                if (1 == e.status) {
                    var t = e.zan;
                    e.zan > 1e3 && (t = "1000+");
                    var n = a.target.dataset.id, s = i.data.list;
                    s.forEach(function(e) {
                        e.id == n && (e.zan = t, e.iszan = !0);
                    }), i.setData({
                        list: s
                    });
                } else console.log(e.msg), wx.showModal({
                    title: "提示",
                    content: e.msg,
                    showCancel: !1,
                    success: function(e) {}
                });
            }, "成功点赞", "点赞失败");
        } else e.login();
    },
    onLoad: function(e) {
        this.data.itemIndex = 0, this.data.index = 0, wx.showLoading({
            title: "加载中..."
        }), this.getList({
            dyType: this.data.itemIndex,
            dyAddress: this.data.index
        });
    },
    onReachBottom: function() {
        this.data.nomore || (a++, this.getList({
            dyType: this.data.itemIndex,
            dyAddress: this.data.index
        }));
    },
    seecomment: function(t) {
        if (e.globalData && e.globalData.userInfo && null != e.globalData.userInfo) {
            var a = t.target.dataset.name ? "回复" + t.target.dataset.name : "";
            this.setData({
                reply: a,
                seecomment: !0,
                nowid: t.currentTarget.id
            });
        } else e.login();
    },
    comment: function(a) {
        var i = this, n = a.detail.value;
        if ("" == n) return !1;
        if (t.isOrder(n)) {
            var s = "/pages/info/add?t=1&c=" + n;
            wx.navigateTo({
                url: s
            });
        } else t.req("api/comment/add", {
            iid: i.data.list[i.data.nowid].id,
            reply: i.data.reply.replace("回复", ""),
            type: "dynamic",
            content: a.detail.value,
            sk: e.globalData.sk,
            isEncode: !0
        }, function(t) {
            if (1 == t.status) {
                var n = i.data.list;
                n[i.data.nowid].comments = n[i.data.nowid].comments ? n[i.data.nowid].comments : new Array(), 
                n[i.data.nowid].comments.push({
                    id: t.id,
                    iid: i.data.list[i.data.nowid].id,
                    content: a.detail.value,
                    nickName: e.globalData.userInfo.nickName,
                    reply: i.data.reply.replace("回复", "")
                });
            }
            i.setData({
                list: n
            });
        });
    },
    hidecomment: function() {
        this.setData({
            seecomment: !1
        });
    },
    onPullDownRefresh: function() {
        a = 1, this.getList({
            dyType: this.data.itemIndex,
            dyAddress: this.data.index
        }), wx.stopPullDownRefresh();
    }
});