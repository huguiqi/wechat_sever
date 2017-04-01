var link = require('../../config/link');

angular.module("YApp").controller('distributionGroupCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    '$location',
    'cacheService',
    'wxsdkService',
    'toolsService',
    'distributionModel',
    function($rootScope, $scope, $state, $stateParams, $timeout, $location, cacheService, wxsdkService, toolsService, distributionModel) {
        var distributionModel = new distributionModel(),
            userInfo = cacheService.userInfo.get(),
            userId = cacheService.userId.get(),
            shareLink = link.distribution+',distribution/index,'+userId,
            shareDesc;

        toolsService.setTitleForIphone("购买成功");
        $("#J_distributionGroup").css('minHeight',$(document.body)[0].scrollHeight);
        $rootScope.pageLoading = false;
        $rootScope.isPageCover = true;
        $scope.shareLink = shareLink;
        $scope.centerLink = link.distributionCenter;
        
        function initShare(){
            wxsdkService.shareAppMessage({
                title:'翼起学为孩子们安排好暑期行程',
                link:shareLink,
                desc:shareDesc,
                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:'翼起学为孩子们安排好暑期行程',
                link:shareLink,
                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
                success:function(){}
            });
        }
        
        function getSort( fn ){
            var self = $scope;
            distributionModel.getSort({
                userId : userId
            }).then(function (response) {
                if( response){
                    fn && fn( response )
                }
            }, function (error) {
                console.log(error)
            })
        }

        function init(){
            wx.ready(function(){
                getSort(function( data ){
                    shareDesc = '有了翼起学暑期小特工，您至少可以休息两个月。';
                    initShare();
                    cacheService.userInfo.set(angular.extend(cacheService.userInfo.get(), {
                        isMember:1,
                        sort:data.sort
                    }))
                })
            });
        }

        init();
    }
]);
