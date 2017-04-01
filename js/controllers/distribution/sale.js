var link = require('../../config/link');

angular.module("YApp").controller('distributionSaleCtrl', [
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
        var distributionModel = new distributionModel(),
            userInfo = cacheService.userInfo.get(),
            userId = cacheService.userId.get(),
            shareLink = userInfo.isMember ? link.distribution+',distribution/index,'+userId:link.distribution,
            // shareDesc = userInfo.sort>0 ? '我已是翼起学第'+userInfo.sort+'位合伙人，前方高能预警，育儿福利太多接不住！':'前方高能预警，育儿福利太多接不住！';
            shareDesc = '有了翼起学暑期小特工，您至少可以休息两个月。';


        toolsService.setTitleForIphone("我的销售记录");
        $("#J_distrbutionProducts").css('minHeight',$(document.body)[0].scrollHeight);
        $rootScope.pageLoading = false;
        $rootScope.isPageCover = false;

        $scope.pageConfig = {
            listType:1,
            start:1,
            limit:5,
            showLoading:true,
            loadingText:'努力加载中...',
            loadingProcess:true,
            scrollAble:false,
            hasNoData:false
        }

        $scope.goNewPages = function (id) {
            var self = $scope;
            if(self.pageConfig.listType == 1){
                $state.go('distribution.index');
            }
            if(self.pageConfig.listType == 2){
                $state.go('campaign.detail',{id:id});
            }
            if(self.pageConfig.listType == 3){
                $state.go('course.detail',{id:id});
            }
        }
        
        $scope.list = [];

        $scope.updateList = function (type) {
            var self = $scope;
            self.list = [];
            self.pageConfig.listType = type;
            self.pageConfig.loadingProcess = true;
            self.pageConfig.start = 1;
            self.pageConfig.loadingText = '努力加载中...'
            self.pageConfig.showLoading = true;
            self.pageConfig.hasNoData = false;
            getList();
        }

        function getList() {
            var self = $scope;
            distributionModel.saleList({
                start:self.pageConfig.start,
                limit:self.pageConfig.limit,
                type:self.pageConfig.listType,
                userId:userId
            }).then(function (response) {
                if( response && response.data ){
                    self.list = !self.pageConfig.loadingProcess ? self.list.concat(response.data) : response.data;
                    self.pageConfig.loadingProcess = false;
                    self.pageConfig.showLoading = response.data.length<self.pageConfig.limit;
                    self.pageConfig.hasNoData = response.data.length<self.pageConfig.limit;
                    self.pageConfig.scrollAble = response.data.length===self.pageConfig.limit;
                    if( !self.pageConfig.scrollAble ){
                        self.pageConfig.loadingText = '没有更多了...';
                    }else{
                        self.pageConfig.loadingText = '努力加载中...';
                    }
                }else{
                    self.pageConfig.showLoading = true;
                    self.pageConfig.loadingText = '网络错误，请刷新再试...'
                }
            }, function (error) {
                console.log(error)
            })
        }

        function bindEvents(){
            var self = $scope,
                win = window,
                body = document.body;
            $(win).bind('scroll',function(){
                // console.log( win.scrollY, win.innerHeight, body.offsetHeight);
                //滚动加载
                if( win.scrollY + win.innerHeight >= body.offsetHeight - 60){
                    if( self.pageConfig.scrollAble && !self.pageConfig.loadingProcess ){
                        self.pageConfig.showLoading = true;
                        self.pageConfig.start++;
                        getList();
                    }
                }
            });
        } 

        $scope.$on('$destroy',function() {  
            $(window).unbind('scroll');
        });

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
            var self = $scope;
            wx.ready(function(){
                initShare();
            });
            if($stateParams.type){
                self.pageConfig.listType = $stateParams.type;
            }else{
                self.pageConfig.listType = 1;
            }
            getList();
            bindEvents();
        }

        init();
    }
]);
