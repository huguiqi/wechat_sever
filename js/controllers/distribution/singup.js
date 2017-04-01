var link = require('../../config/link');

angular.module("YApp").controller('distributionSingupCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    '$interval',
    'wxsdkService',
    'cacheService',
    'toolsService',
    'distributionModel',
    'courseModel',
    function($rootScope, $scope, $state, $stateParams, $timeout, $interval, wxsdkService, cacheService, toolsService, distributionModel, courseModel) {
    	var distributionModel = new distributionModel(),
    		courseModel = new courseModel(),
            userInfo = cacheService.userInfo.get(),
            userId = cacheService.userId.get();

        toolsService.setTitleForIphone("填写个人信息");
        $rootScope.pageLoading = false;

        $scope.order = {
            userId: cacheService.userId.get(),
            mobile: '',
            name : '',
            type: parseInt($stateParams.type)>=3?parseInt($stateParams.type):2,
            sourceId : userInfo.sourceId
        }

        $scope.code = {
        	sended : false,
        	timerText : "发送",
        	value : ""
        }

        $scope.tipView = {
            show:false,
            text:''
        }
        $scope.saveStatus = {
            text:"确认报名",
            loading:false
        }

        $scope.singup = singup;
        $scope.sendCode = sendCode;

        function showTip( text ){
        	var self = $scope;
        	self.tipView.show = true;
        	self.tipView.text = text;
        	$timeout(function(){
        		self.tipView.show = false;
	        	self.tipView.text = '';
        	},2000)
        }

        function sendCode(){
            var self = $scope,
                timerNum = 60,
                timerPromise;

            if( self.code.sended ){
                return false;
            }

            courseModel.sendPhoneMsg({
                mobile:self.order.mobile
            }).then(function(response){
                if( response && response.errcode===0 ){
                    self.code.sended = true;
                    timerPromise = $interval(function(){
                        self.code.timerText = timerNum--;
                        if( timerNum===-1 ){
                            $interval.cancel( timerPromise );
                            self.code.sended = false;
                            self.code.timerText = "重发";
                        }
                    },1000)
                }else{
                    showTip('短信发送失败，请重发');
                    self.code.sended = false;
                    self.code.timerText = "重发";
                }
            });
        }

		function verificationCode(){
            var self = $scope;
            courseModel.verificationCode({
                mobile:self.order.mobile,
                code:self.code.value
            }).then(function(response){
                if( response && response.errcode===0 ){
                    submit();
                }else{
                    showTip('验证码错误');
                }
            });
        }


        function submit(){
            var self = $scope;
          
            self.saveStatus.text = '报名中...';
            self.saveStatus.loading = true;

            distributionModel.order(self.order).then(function(response) {
                if( response && response.name === 'ProtocolError'){
                    alert("微信协议错误，暂不能支付，请联系管理员");
                    return false;
                }
                cacheService.distributionOrder.set( response );
                location = location.protocol+"//"+location.host+'/index.html#/common/pay/distribution';
                location.reload();
            }, function() {
                alert('提交订单失败')
            });

        }

        function singup(myForm){
        	var self = $scope;

            if(myForm.$invalid || self.saveStatus.loading){
                return false;
            }

            verificationCode();

        }

        function initShare(){
            wxsdkService.shareAppMessage({
                title:'翼起学为孩子们安排好暑期行程',
                link:link.distribution,
                desc:'有了翼起学暑期小特工，您至少可以休息两个月。',
                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:'翼起学为孩子们安排好暑期行程',
                link:link.distribution,
                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
                success:function(){}
            });
        }

        function init(){
            wx.ready(function(){
                initShare();
            });
        }

        init();
    }
]);