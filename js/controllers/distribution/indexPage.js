var link = require('../../config/link');

angular.module("YApp").controller('distributionIndexPageCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    '$location',
    'distributionModel',
    'cacheService',
    'wxsdkService',
    'toolsService',
    function($rootScope, $scope, $state, $stateParams, $timeout, $location, distributionModel, cacheService, wxsdkService, toolsService) {
        var distributionModel = new distributionModel(),
            userInfo = cacheService.userInfo.get(),
            userId = cacheService.userId.get(),
            shareLink = userInfo.isMember ? link.distribution+',distribution/index,'+userId:link.distribution,
            // shareDesc = userInfo.sort>0 ? '我已是翼起学第'+userInfo.sort+'位合伙人，敢问土豪你是谁？对我家宝宝如此不薄！':'敢问土豪你是谁？对我家宝宝如此不薄！';
            shareDesc = '有了翼起学暑期小特工，您至少可以休息两个月。';
            
            
        toolsService.setTitleForIphone("会员亲子年卡限时拼团中");
        $("#J_distributionIndexPage").css('minHeight',$(document.body)[0].scrollHeight);
        $rootScope.pageLoading = false;
        $scope.userInfo = userInfo;
        $scope.shareLink = shareLink;
        $scope.link = link;
        $scope.initPreview = initPreview;
        $scope.memberInfoList = [];

        $scope.pageConfig = {
            start:1,
            limit:35
        }
        
        function initShare(){
            wxsdkService.shareAppMessage({
                title: '翼起学为孩子们安排好暑期行程',
                link: shareLink,
                desc: shareDesc,
                imgUrl: 'http://cdn.4001583721.com/share-distribution-icon03.png',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:'翼起学为孩子们安排好暑期行程',
                link: shareLink,
                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
                success:function(){}
            });
        }

        // function onBridgeReady() {
        //     WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        //         WeixinJSBridge.invoke('sendAppMessage',{
        //             "link":"http://m.exmail.qq.com/",
        //             "desc":"desc",
        //             "title":"title for WeiXinJsBridge"
        //         }, function(res) {
        //             WeixinJSBridge.log(res.err_msg);
        //         });
        //     });
        //     WeixinJSBridge.on('menu:share:timeline', function(argv) {
        //         WeixinJSBridge.invoke("shareTimeline",{
        //             "link":"http://m.exmail.qq.com",
        //             "img_url":"http://rescdn.qqmail.com/bizmail/zh_CN/htmledition/images/bizmail/v3/logo1ca3fe.png",
        //             "img_width":"172",
        //             "img_height":"40",
        //             "desc":"i am description",
        //             "title":"just test from WeixinJsBridge"
        //         },function(e){
        //             WeixinJSBridge.log(res.err_msg);
        //         })
        //     });
        // }
        //   
        // if (typeof WeixinJSBridge === "undefined"){
        //     if(document.addEventListener){
        //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        //     }
        // }else{
        //   onBridgeReady();
        // }
         
        //已报名用户头像获取
        function getMemberInfo(){
            var self = $scope;
            distributionModel.memberInfo({
                start:self.pageConfig.start,
                limit:self.pageConfig.limit
            }).then(function( response ){
                self.memberInfoList = response;
            }, function(error){
                console.log(error)
            })
        }

        function initPreview( url ){
            var self = $scope;
            wxsdkService.previewImage({
                current: url
            });
        }

        function init(){
            wx.ready(function(){
                initShare();
            });
            getMemberInfo();
        }

        init();
    }
]);
