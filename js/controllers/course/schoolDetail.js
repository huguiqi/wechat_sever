var link = require('../../config/link');

angular.module("YApp").controller('schoolDetailCtrl', [
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

        $scope.pageView = {
            companyShow:false,
            commentEditing:false,
            content:''
        }

        $scope.initPreview = initPreview;

        $scope.openLocation = function(){
            var self = $scope;
            wxsdkService.openLocation({
                lat:self.school.location[1],
                lon:self.school.location[0],
                name:self.school.name,
                address:self.school.address
            })
        }

        $scope.addComment = function(){
            var self = $scope;
            self.pageView.commentEditing = true;
        }

        $scope.sendComment = function(){
            var self = $scope;
            if( !self.pageView.content ){
                return false;
            }
            schoolModel.evaluate({
                schoolId:$stateParams.id,
                creator:cacheService.userId.get(),
                content:self.pageView.content
            }).then(function( response ){
                if( response && response.success ){
                    self.pageView.content = '';
                    self.school.comment.unshift(response.data);
                    $(window).scrollTop($("#J_commentWraper").offset().top-20);
                    $timeout(function(){
                        self.pageView.commentEditing = false;
                    });
                }
            },function(){

            });
        }

        function getDetail(){
            var self = $scope;
            schoolModel.detail({
                id:$stateParams.id
            }).then(function( response ){
                $rootScope.pageLoading = false;
                self.school = response;
                self.school.comment = self.school.comment.reverse();
                toolsService.setTitleForIphone('校区详情');
                initShare();
            },function(){

            });
        }

        //打开精彩课程
        $scope.openSchoolCourse = function(){
            var self = $scope;
            if(self.school.courseCount>0){
                $state.go('course.schoolCourse',{id:self.school._id});
            }else{
                return false;
            }
        }

        function initPreview(){
            var self = $scope;
            wxsdkService.previewImage({
                current: self.school.companyImage
            });
        }

        function initShare(){
            var self = $scope;
            wxsdkService.shareAppMessage({
                title:self.school.name,
                link:link.course+',course/schoolDetail/'+$stateParams.id,
                desc:'翼起学本期精选的百个优质活动和课程，不多也不少',
                imgUrl:self.school.logo || 'http://cdn.4001583721.com/default_avatar1.png',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:self.school.name,
                link:link.course+',course/schoolDetail/'+$stateParams.id,
                imgUrl:self.school.logo || 'http://cdn.4001583721.com/default_avatar1.png',
                success:function(){}
            });
        }

        function init(){
            window.scrollTo(0,0);
            getDetail();
        }

        init();
    }
]);