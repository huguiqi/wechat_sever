var link = require('../../config/link');

angular.module("YApp").controller('wechatErrorCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    'toolsService',
    function($rootScope, $scope, $state, toolsService) {
        $rootScope.pageLoading = false;
        toolsService.setTitleForIphone("请在微信打开");
    }
]);