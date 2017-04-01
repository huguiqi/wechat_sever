var link = require('../../config/link');

angular.module("YApp").controller('courseOrderCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'cacheService',
    'wxsdkService',
    'courseModel',
    'toolsService',
    function($rootScope, $scope, $state, $stateParams, $timeout, cacheService, wxsdkService, courseModel, toolsService) {
        var courseModel = new courseModel(),
            userInfo = cacheService.userInfo.get(),
            userId = cacheService.userId.get(),
            shareLink,
            courseOrder = cacheService.courseOrder.get();

        $("#J_courseOrderPage").css('minHeight',$(document.body)[0].scrollHeight);
        
        $scope.pageInfo = {
            phone:courseOrder.mobile,
            name:'',
            sourceId : userInfo.sourceId
        }

        toolsService.setTitleForIphone("订单确认");

        function getDetail(){
            var self = $scope;
            courseModel.orderDetail({
                userId:cacheService.userId.get(),
                classId:courseOrder.classId || courseOrder.order.classId
            }).then(function(response){
                self.classData = response.classData;
                self.courseData = response.courseData;
                $rootScope.pageLoading = false;
                // toolsService.fixBodyHeight();

                shareLink = link.course+',course/detail/'+self.courseData._id+(userInfo.isMember ? ','+userId : ''),
                wx.ready(function(){
                    initShare();
                });
            },function(error){
                console.log(error);
            });
        }

        $scope.orderUp = function(){
            var self = $scope;
            if(self.pageInfo.name==''){
                alert("请填写参与人姓名");
                return false;
            }
            if(self.pageInfo.phone==''){
                alert("请填写参与人手机号码");
                return false;
            }else if(!toolsService.checkPhone(self.pageInfo.phone)){
                alert("请填写正确的手机号码");
                return false;
            }
            courseModel.order({
                name:self.pageInfo.name,
                userId:cacheService.userId.get(),
                mobile:self.pageInfo.phone,
                classId:self.classData._id,
                sourceId:self.pageInfo.sourceId
            }).then(function(response){
                if( response.order.price === 0 ){
                    alert('您已报名成功，报名详细信息已发送到您的手机上，谢谢');
                    $state.go('course.myCourse');
                }else{
                    cacheService.courseOrder.set( response );
                    location = location.protocol+"//"+location.host+'/index.html#/common/pay/course';
                    location.reload();
                    // $state.go("common.pay",{type:'course'});
                }
            },function(){
                alert("提交订单失败");
            });
        }

        $scope.$on('$destroy',function() {  
            angular.element('body').css('height','auto')
        }); 

        function initShare(){
            var self = $scope;
            wxsdkService.shareAppMessage({
                title:self.courseData.name,
                link:shareLink,
                desc:'翼起学本期精选的百个优质活动和课程，不多也不少',
                imgUrl:self.courseData.cover || 'http://cdn.4001583721.com/wx-course-share.png',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:self.courseData.name,
                link:shareLink,
                imgUrl:self.courseData.cover || 'http://cdn.4001583721.com/wx-course-share.png',
                success:function(){}
            });
        }

        function init() {
            getDetail();
        }

        init();
    }
]);