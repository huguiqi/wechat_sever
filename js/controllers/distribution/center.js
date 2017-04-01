var link = require('../../config/link');

angular.module("YApp").controller('distributionCenterCtrl', [
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
        var userInfo = cacheService.userInfo.get(),
            userId = cacheService.userId.get(),
            distributionModel = new distributionModel(),
            shareLink = userInfo.isMember ? link.distribution+',distribution/index,'+userId:link.distribution,
            // shareDesc = userInfo.sort>0 ? '我已是翼起学第'+userInfo.sort+'位合伙人，前方高能预警，育儿福利太多接不住！':'前方高能预警，育儿福利太多接不住！';
            shareDesc = '有了翼起学暑期小特工，您至少可以休息两个月。';

        toolsService.setTitleForIphone("我的收入记录");
        $("#J_distributionCenter").css('minHeight',$(document.body)[0].scrollHeight);

        $scope.userInfo = userInfo;
        $scope.centerDetail = {}
        $scope.centerList = {};
        $scope.pageConfig = {
            listType:1,
        }

        $scope.goSale = function (type) {
            var self = $scope;
            $state.go('distribution.sale',{type:type})
        }
        
        function getCenterDetail() {
            var self = $scope;
            distributionModel.centerDetail({
                userId:userId
            }).then(function( response ){
                if( response ){
                    self.centerDetail = response;
                    $rootScope.pageLoading = false;
                }
            }, function(error){
                console.log(error)
            });
        }

        function getCenterList() {
            var self = $scope;
            distributionModel.centerList({
                type: self.pageConfig.listType
            }).then(function (response) {
                if( response ){
                    self.centerList = response.data;
                    $rootScope.pageLoading = false;
                }
            }, function (error) {
                console.log(error)
            })
        }

        $scope.getList = function (type) {
            var self = $scope;
            self.pageConfig.listType = type;
            getCenterList();
        }

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

        function init(){
            wx.ready(function(){
                initShare();
            });
            if( userInfo.type>=1 ){
                getCenterDetail();
                getCenterList();
                $rootScope.pageLoading = false;
            }else{
                // $state.go('distribution.index')
                $rootScope.pageLoading = false;
            }
        }

        init();
    }
]);
