var link = require('../../config/link');

angular.module("YApp").controller('distributionHelpCtrl', [
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
        var distributionModel = new distributionModel();
        
        $("#J_distributionHelpPage").css('minHeight',$(document.body)[0].scrollHeight);
        
        $scope.pageConfig = {
            pageView:0,
            imageView:1
        }

        toolsService.setTitleForIphone("翼起学");
        $rootScope.pageLoading = false;
        $rootScope.isPageCover = false;
        $scope.pageView = pageView;

        function pageView(num){
            var self = $scope;
            self.pageConfig.pageView = num;
            self.pageConfig.imageView = 1;
        }


        function init(){
            
        }

        init();
    }
]);
