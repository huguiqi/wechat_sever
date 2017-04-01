var link = require('../../config/link');

angular.module("YApp").controller('activityChildrenVideoCtrl', [
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
            userId = cacheService.userId.get();
            shareLink = '',
            shareDesc = '妈妈在哪儿？央视暑期大电影，儿童演员全国海选';

        toolsService.setTitleForIphone("妈妈在哪儿？央视暑期大电影，儿童演员全国海选");

        $rootScope.pageLoading = false;
        $rootScope.isPageCover = false;
        $rootScope.isPageWhite = true;

        $scope.userInfo = userInfo;
        
         
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

         
        
        function init(){
            var self = $scope;
            wx.ready(function(){
                initShare();
            });
        }

        init();
    }
]);
