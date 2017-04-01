var link = require('../../config/link');

angular.module("YApp").controller('commonSetPhoneCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    '$interval',
    'courseModel',
    'cacheService',
    'toolsService',
    'wxsdkService',
    function($rootScope, $scope, $state, $stateParams, $timeout, $interval, courseModel, cacheService, toolsService, wxsdkService) {
        var courseModel = new courseModel();
        
        toolsService.setTitleForIphone("课程报名");
        $("title").text("课程报名");

        $rootScope.isPageMinCover = true;
        $rootScope.pageLoading = false;

        $scope.phone='';
        $scope.entered = false;
        $scope.sended = false;
        $scope.timerText = "发送";
        $scope.code = "";

        $scope.hideFooter = 1;
        $scope.pageHeight = 100;
        $scope.sendCode = sendCode;

        $scope.verificationPhone = function(){
            var self = $scope,
                type = $stateParams.type,
                orderInfo = null;
            if( !toolsService.checkPhone(self.phone) ){
                alert("请输入正确的手机号");
                return false;
            }
            if( type === 'course' ){
                orderInfo = cacheService.courseOrder.get();
                orderInfo.mobile = self.phone;
                cacheService.courseOrder.set(orderInfo);
            }else if( type === 'campaign'){
                orderInfo = cacheService.campaignOrder.get();
                orderInfo.mobile = self.phone;
                cacheService.campaignOrder.set(orderInfo);
            }
            $scope.entered = true;
            sendCode();
        }

        function sendCode(){
            var self = $scope,
                timerNum = 60,
                timerPromise;

            if( self.sended ){
                return false;
            }

            courseModel.sendPhoneMsg({
                mobile:self.phone
            }).then(function(response){
                if( response && response.errcode===0 ){
                    self.sended = true;
                    timerPromise = $interval(function(){
                        self.timerText = "重发("+timerNum--+")";
                        if( timerNum===-1 ){
                            $interval.cancel( timerPromise );
                            self.sended = false;
                            self.timerText = "重发";
                        }
                    },1000)
                }else{
                    alert("短信发送失败，请重发");
                    self.sended = false;
                    self.timerText = "重发";
                }
            });
        }

        $scope.verificationCode = function(){
            var self = $scope,
                type = $stateParams.type;
            if( !self.code ){
                alert("请输入验证码");
                return false;
            }
            courseModel.verificationCode({
                mobile:self.phone,
                code:self.code
            }).then(function(response){
                if( response && response.errcode===0 ){
                    if( type==='course' ){
                        $state.go('course.order');
                    }else{
                        $state.go('campaign.question');
                    }
                }else{
                    alert("验证码错误，请重新输入")
                }
            });
        }

    }
]);
