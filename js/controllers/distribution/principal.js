var link = require('../../config/link');

angular.module("YApp").controller('distributionPrincipalCtrl', [
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
            shareLink = userInfo.isMember ? link.distributionPrincipal+',distribution/principal,'+userId:link.distributionPrincipal,
            shareDesc = userInfo.sort>0 ? '我已是翼起学第'+userInfo.sort+'位合伙人，前方高能预警，育儿福利太多接不住！':'前方高能预警，育儿福利太多接不住！';

        toolsService.setTitleForIphone("战略合伙人招募中");
        $("#J_distrbutionProducts").css('minHeight',$(document.body)[0].scrollHeight);
        $rootScope.pageLoading = false;
        $rootScope.isPageCover = false;
        $rootScope.isPageWhite = true;

        $scope.userInfo = userInfo;
        
        $scope.pageConfig = {
            type:3,
            buttonView:false,
        }

        function initShare(){
            wxsdkService.shareAppMessage({
                title:'国民老公邀请您一起学一起玩！',
                link:shareLink,
                desc:shareDesc,
                imgUrl:'http://cdn.4001583721.com/share-distribution-icon.png',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:'国民老公邀请您一起学一起玩！',
                link:shareLink,
                imgUrl:'http://cdn.4001583721.com/share-distribution-icon.png',
                success:function(){}
            });
        }

        function scrollTop() {
            $(window).bind('scroll',function () {
                var self = $scope;
                var scrollTop = $(window).scrollTop();
                if(scrollTop>0){
                    $timeout(function () {
                        self.pageConfig.buttonView = true;
                    })
                }else{
                    $timeout(function () {
                        self.pageConfig.buttonView = false;
                    })
                }
            })
        }
        
        function init(){
            var self = $scope;
            wx.ready(function(){
                initShare();
            });
            scrollTop();
        }

        init();
    }
]);
