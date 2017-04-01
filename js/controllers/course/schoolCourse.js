var link = require('../../config/link');

angular.module("YApp").controller('schoolCourseCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'schoolModel',
    'wxsdkService',
    'toolsService',
    'cacheService',
    function($rootScope, $scope, $state, $stateParams, $timeout, schoolModel, wxsdkService, toolsService, cacheService) {
        var schoolModel = new schoolModel();
        var location = cacheService.location.get() || {
                lat:31.29607,
                lon:121.4961,
                city:'上海市'
            };

        function getCourseList(){
            var self = $scope;
            schoolModel.courseList({
                id:$stateParams.id,
                start:1,
                limit:99999,
                lon:location.lon,
                lat:location.lat
            }).then(function( response ){
                $timeout(function(){
                   $rootScope.pageLoading = false;
                   toolsService.setTitleForIphone('校区课程'); 
                });
                self.courseList = response.data;
                self.dist = response.dist;
                self.schoolData = response.schoolData;
            },function(error){
                console.log(error)
            });
        }

        function initShare(){
            var self = $scope;
            wxsdkService.shareAppMessage({
                title:self.schoolData.name,
                link:link.course+',course/schoolDetail/'+$stateParams.id,
                desc:'翼起学本期精选的百个优质活动和课程，不多也不少',
                imgUrl:self.schoolData.logo || 'http://cdn.4001583721.com/default_avatar1.png',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:self.schoolData.name,
                link:link.course+',course/schoolDetail/'+$stateParams.id,
                imgUrl:self.schoolData.logo || 'http://cdn.4001583721.com/default_avatar1.png',
                success:function(){}
            });
        }

        function init(){
            getCourseList();
            wx.ready(function(){
                initShare();
            });
        }

        init();
    }
]);