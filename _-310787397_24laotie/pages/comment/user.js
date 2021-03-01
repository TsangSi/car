getApp(), require("../../utils/util.js");

Page({
    data: {
        tips: "如何分享到QQ ?\n点击下方图片，长按将图片保存到相册\n然后分享到QQ群或者朋友圈"
    },
    preImage: function() {
        wx.previewImage({
            current: "/img/shareqq.jpg",
            urls: [ "https://192.168.22.45/public/ad/shareqq.jpg" ]
        });
    }
});