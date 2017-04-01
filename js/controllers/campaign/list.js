var link = require('../../config/link');

angular.module("YApp").controller('campaignListCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'campaignModel',
    'cacheService',
    'toolsService',
    'wxsdkService',
    function($rootScope, $scope, $state, $stateParams, $timeout, campaignModel, cacheService, toolsService, wxsdkService) {
        var campaignModel = new campaignModel(),
            location = cacheService.location.get() || {
                lat:31.29607,
                lon:121.4961,
                city:'上海市'
            },
            timer;

        $("#J_campaignList").css('minHeight',$(document.body)[0].scrollHeight);
        
        toolsService.setTitleForIphone("找活动");

        $scope.nowTime = parseInt( new Date().getTime()/1000, 10);

        $scope.pageConfig = {
            start : 1,
            limit : 5,
            showLoading:true,
            loadingText:'努力加载中...',
            loadingProcess:true,
            scrollAble:false,
            hasNoData:false
        }

        $scope.listShow = 2;
        $scope.timeShow = false;
        $scope.campaign = [];
        $scope.getCampaignList = getCampaignList;

        $scope.personInfo = {
            userId : toolsService.getUrlParam('userId'),
            avatar : toolsService.getUrlParam('avatar')
        }

        // 开始时间倒计时
        function getDate(){
            var self = $scope,
                date = parseInt( new Date().getTime()/1000, 10),
                timerEle = $("#J_campaignList").find(".time"),
                day,
                hour,
                minute,
                second;
            for(var i=0;i<self.campaign.length;i++){
                var d = parseInt(self.campaign[i].overTime,10)-date;
                if(d<=0){
                    timerEle.eq(i).text("报名已截止，下次再约啦~");
                }else{
                    day = parseInt( d/86400, 10);
                    hour = parseInt( (d%86400)/3600, 10);
                    minute = parseInt( ((d%86400)%3600)/60, 10);
                    second = parseInt( ((d%86400)%3600)%60, 10);
                    timerEle.eq(i).text("报名截止: 剩余"+day+"天"+hour+"小时"+minute+"分"+second+"秒");
                }
            }
        }

        function getCampaignList(number){
            var self = $scope;
            window.clearInterval(timer);
            self.campaign = [];
            self.listShow = number;
            self.pageConfig.loadingProcess = true;
            self.pageConfig.start = 1;
            self.pageConfig.loadingText = '努力加载中...'
            self.pageConfig.showLoading = true;
            self.pageConfig.hasNoData = false;
            getList();
        }

        function getList(){
            var self = $scope;
            if(self.listShow==1){
                campaignModel.recommendList({
                    id : $stateParams.id,
                    start : self.pageConfig.start,
                    limit : self.pageConfig.limit
                }).then(function( response ){
                    // response();
                    if( response && response.data ){
                        self.campaign = !self.pageConfig.loadingProcess ? self.campaign.concat(response.data) : response.data;
                        self.timeShow = true;
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
                },function(){

                });
            }
            if(self.listShow==2){
                campaignModel.hostList({
                    id : $stateParams.id,
                    start : self.pageConfig.start,
                    limit : self.pageConfig.limit
                }).then(function( response ){
                    $timeout(function(){
                        $rootScope.pageLoading = false;
                    });
                    // response();
                    if( response && response.data ){
                        self.campaign = !self.pageConfig.loadingProcess ? self.campaign.concat(response.data) : response.data;
                        self.timeShow = true;
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
                },function(){

                });
            }
            if(self.listShow==3){
                campaignModel.nearList({
                    id : $stateParams.id,
                    start : self.pageConfig.start,
                    limit : self.pageConfig.limit,
                    lat : location.lat,
                    lon : location.lon,
                    city : location.city
                }).then(function( response ){
                    // response();
                    if( response && response.data ){
                        self.campaign = !self.pageConfig.loadingProcess ? self.campaign.concat(response.data) : response.data;
                        self.timeShow = true;
                        self.pageConfig.loadingProcess = false;
                        self.pageConfig.showLoading = response.data.length<self.pageConfig.limit;
                        self.pageConfig.hasNoData = response.data.length<self.pageConfig.limit;
                        self.pageConfig.scrollAble = response.data.length===self.pageConfig.limit;
                        if( !self.pageConfig.scrollAble ){
                            self.pageConfig.loadingText = '没有更多了...';
                            self.pageConfig.loadingProcess = true;
                        }else{
                            self.pageConfig.loadingText = '努力加载中...';
                        }
                    }else{
                        self.pageConfig.showLoading = true;
                        self.pageConfig.loadingText = '网络错误，请刷新再试...'
                    }
                },function(){

                });
            }
            $timeout(function(){
                timer=setInterval(getDate,1000);
            },500);
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

        $scope.openCampaignDetail = function(id){
            var self = $scope;
            window.clearInterval(timer);
            self.campaign = [];
            $state.go('campaign.detail',{id:id});
        }

        function initShare(){
            wxsdkService.shareAppMessage({
                title:'孩子周末去哪儿？',
                link:link.campaign,
                desc:'在学习中玩耍，找翼起学！百个教育活动任你选',
                imgUrl:'http://cdn.4001583721.com/share.jpg',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:'孩子周末去哪儿？',
                link:link.campaign,
                imgUrl:'http://cdn.4001583721.com/share.jpg',
                success:function(){}
             });
        }

        function init(){
            bindEvents();
            getList();
            wx.ready(function(){
                initShare();
            });
        }

        init();
        
    }
]);

angular.module("YApp").controller('campaignCenterNav', [
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
