var link = require('../../config/link');

angular.module("YApp").controller('courseHomeCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    '$location',
    'cacheService',
    'wxsdkService',
    'toolsService',
    'courseModel',
    function($rootScope, $scope, $state, $stateParams, $timeout, $location, cacheService, wxsdkService, toolsService, courseModel) {
        var courseModel = new courseModel();
        toolsService.setTitleForIphone("找课程");

        $scope.firstCategoryId = $stateParams.id;

        function getList(){
            var self = $scope;
            courseModel.categoryList({
                id : self.firstCategoryId
            }).then(function( response ){
                $timeout(function(){
                    $rootScope.pageLoading = false;
                });
                self.courseList = response.data;
            },function(){

            });
        }

        function initShare(){
            wxsdkService.shareAppMessage({
                title:'翼起学本期精选课程',
                link:link.course,
                desc:'翼起学本期精选的百个优质活动和课程，不多也不少！',
                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:'翼起学本期精选课程',
                link:link.course,
                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
                success:function(){}
            });
        }
        
        function init(){
            getList();
            wx.ready(function(){
                initShare();
            });
        }

        init();
    }
]);

angular.module("YApp").controller('courseCenterNav', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'cacheService',
    function($rootScope, $scope, $state, $stateParams, $timeout, cacheService) {
        $scope.showNav = false;
        $scope.link = link;
        $scope.userInfo = cacheService.userInfo.get();
    }
]);