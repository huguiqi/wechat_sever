var link = require('../../config/link');

angular.module("YApp").controller('commonPayCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'cacheService',
    'toolsService',
    'wxsdkService',
    function($rootScope, $scope, $state, $stateParams, $timeout, cacheService, toolsService, wxsdkService) {
        var userInfo = cacheService.userInfo.get();

        $rootScope.pageLoading = false;
        toolsService.setTitleForIphone("微信安全支付");
        $scope.payResult = false;
        $scope.orderType = $stateParams.type;

        $scope.pay = function() {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', callPay, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', callPay);
                    document.attachEvent('onWeixinJSBridgeReady', callPay);
                }
            } else {
                callPay();
            }
        }

        function callPay() {
            var self = $scope;
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": self.orderInfo.wechat.appId,
                    "timeStamp": self.orderInfo.wechat.timeStamp,
                    "nonceStr": self.orderInfo.wechat.nonceStr,
                    "package": self.orderInfo.wechat.package,
                    "signType": self.orderInfo.wechat.signType,
                    "paySign": self.orderInfo.wechat.paySign
                },
                function(res) {
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        // cacheService.campaignOrder.remove();
                        // cacheService.courseOrder.remove();
                        if( self.orderType === 'distribution' ){
                            $state.go('distribution.group');
                        }
                        $timeout(function() {
                            self.payResult = true;
                        })
                    } else {

                    }
                }
            );
        }

        function initOrderInfo() {
            var self = $scope,
                orderType = self.orderType;
            self.orderInfo = cacheService[orderType+'Order'].get();
        }

        function init() {
            var self = $scope;
            if( userInfo.type>2 && self.orderType === 'distribution' ){
                $state.go('distribution.index');
            }else{
                initOrderInfo();
            }
        }

        init();
    }
]);