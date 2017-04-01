var url = require("../config/url");

angular.module('YApp').factory('wxsdkService', ['httpService', 'cacheService', function(httpService, cacheService) {
    return {
        init: function(params) {
            var params = params || {};
            params = angular.extend({
                method: 'com.wechat.config.jssdk.init',
                activityId: cacheService.activityId.get(),
                url: window.location.href.split('#')[0]
            }, params);
            return httpService.request(url.campaign, 'GET', params);
        },
        getLocation: function( success ) {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function(res) {
                    // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    // var speed = res.speed; // 速度，以米/每秒计
                    // var accuracy = res.accuracy; // 位置精度
                	success && success(res)
                }
            });
        },
        openLocation:function( params ){
            wx.openLocation({
                latitude: params.lat, // 纬度，浮点数，范围为90 ~ -90
                longitude: params.lon, // 经度，浮点数，范围为180 ~ -180。
                name: params.name || '', // 位置名
                address: params.address || '', // 地址详情说明
                scale: params.scale || 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: params.infoUrl || '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
        },
        //分享朋友
        shareAppMessage: function(options) {
            wx.onMenuShareAppMessage({
                title: options.title, // 分享标题
                link: options.link, // 分享链接
                imgUrl: options.imgUrl, // 分享图标
                desc: options.desc, // 分享描述
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    // 用户确认分享后执行的回调函数
                    // wx.closeWindow();
                    options.success && options.success()
                },
                cancel: function(e) {
                    // 用户取消分享后执行的回调函数
                    options.cancel && options.cancel()
                }
            });
        },
        //分享朋友圈
        shareTimeline: function(options) {
            wx.onMenuShareTimeline({
                title: options.title, // 分享标题
                link: options.link, // 分享链接
                imgUrl: options.imgUrl, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                    // wx.closeWindow();
                    options.success && options.success()
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                    options.cancel && options.cancel()
                }
            });
        },
        previewImage : function(params){
            wx.previewImage({
                current: params.current, // 当前显示图片的http链接
                urls: params.urls || [params.current] // 需要预览的图片http链接列表
            });
        }
    }
}])