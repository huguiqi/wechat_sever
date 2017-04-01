var link = require('../../config/link');

angular.module("YApp").controller('myCourseCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'courseModel',
    'campaignModel',
    'toolsService',
    'cacheService',
    'wxsdkService',
    function($rootScope, $scope, $state, $stateParams, $timeout, courseModel, campaignModel, toolsService, cacheService, wxsdkService) {
        toolsService.setTitleForIphone("我的课程");
        var campaignModel = new campaignModel(),
            courseModel = new courseModel();
        
        $timeout(function(){
            $rootScope.pageLoading = false;
        });

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
        $scope.collect = [];
        $scope.courseOrder = [];
        $scope.campaignOrder = [];

        $scope.getList = function(number){
            var self = $scope;
            self.collect = [];
            self.courseOrder = [];
            self.campaignOrder = [];
            self.pageConfig.start = 1;
            self.listShow = number;
            getMyList();
        }

        function getMyList(){
            var self = $scope;
            if(self.listShow==1){
                getMyCampaignOrderList();
            }
            if(self.listShow==2){
                getMyCourseOrderList();
            }
            if(self.listShow==3){
                getCourseCollect();
            }
        }

        function getMyCampaignOrderList(){
            var self = $scope;
            campaignModel.myCampaign({
                userId : cacheService.userId.get(),
                limit : self.pageConfig.limit,
                start : self.pageConfig.start
            }).then(function( response ){
                $timeout(function(){
                    $rootScope.pageLoading = false;
                });
                if( response && response.length>-1 ){
                    self.campaignOrder = !self.pageConfig.loadingProcess ? self.campaignOrder.concat(response) : response;
                    campaignComputeData(self.campaignOrder);
                    self.pageConfig.loadingProcess = false;
                    self.pageConfig.showLoading = response.length<self.pageConfig.limit;
                    self.pageConfig.hasNoData = response.length<self.pageConfig.limit;
                    self.pageConfig.scrollAble = response.length===self.pageConfig.limit;
                    if( !self.pageConfig.scrollAble ){
                        self.pageConfig.loadingText = '没有更多了~~';
                    }else{
                        self.pageConfig.loadingText = '努力加载中...';
                    }
                }else{
                    self.pageConfig.showLoading = true;
                    self.pageConfig.loadingText = '网络错误，请刷新再试...';
                }
            },function(){

            });
        }

        function getMyCourseOrderList(){
            var self = $scope;
            courseModel.userOrder({
                userId:cacheService.userId.get(),
                limit : self.pageConfig.limit,
                start : self.pageConfig.start
            }).then(function(response){
                $timeout(function(){
                    $rootScope.pageLoading = false;
                });
                if( response && response.length>-1 ){
                    self.courseOrder = !self.pageConfig.loadingProcess ? self.courseOrder.concat(response) : response;
                    courseComputeData( self.courseOrder );
                    self.pageConfig.loadingProcess = false;
                    self.pageConfig.showLoading = response.length<self.pageConfig.limit;
                    self.pageConfig.hasNoData = response.length<self.pageConfig.limit;
                    self.pageConfig.scrollAble = response.length===self.pageConfig.limit;
                    if( !self.pageConfig.scrollAble ){
                        self.pageConfig.loadingText = '没有更多了~~';
                    }else{
                        self.pageConfig.loadingText = '努力加载中...';
                    }
                }else{
                    self.pageConfig.showLoading = true;
                    self.pageConfig.loadingText = '网络错误，请刷新再试...';
                }
            },function(error){
                console.log(error)
            });
        }

        function getCourseCollect(){
            var self = $scope;
            courseModel.userFavorite({
                userId:cacheService.userId.get(),
                limit : self.pageConfig.limit,
                start : self.pageConfig.start
            }).then(function(response){
                if( response && response.length>-1 ){
                    self.collect = !self.pageConfig.loadingProcess ? self.collect.concat(response) : response;
                    self.pageConfig.loadingProcess = false;
                    self.pageConfig.showLoading = response.length<self.pageConfig.limit;
                    self.pageConfig.hasNoData = response.length<self.pageConfig.limit;
                    self.pageConfig.scrollAble = response.length===self.pageConfig.limit;
                    if( !self.pageConfig.scrollAble ){
                        self.pageConfig.loadingText = '没有更多了~~';
                    }else{
                        self.pageConfig.loadingText = '努力加载中...';
                    }
                }else{
                    self.pageConfig.showLoading = true;
                    self.pageConfig.loadingText = '网络错误，请刷新再试...';
                }
            },function(error){
                console.log(error)
            });
        }

        //活动付款倒计时
        function campaignComputeData( data ){
            var self = $scope;
            for( var i=0; i<data.length; i++){
                if( data[i].trade.status===1 ){
                    data[i].trade.over = 0;
                    if( moment().diff(moment(data[i].trade.created*1000)) > 7200000 ){
                        data[i].trade.over = 0;
                    }else{
                        data[i].trade.over = 1;
                    }
                }
            }
            $timeout(function(){
                self.campaignOrder = data;
                var campaignTimes = window.setInterval(campaignGetTime,1000);
            })
        }

        function campaignGetTime(){
            var self = $scope;
            var timer = [];
            var date = new Date().getTime();
            var date = parseInt(date/1000);
            for(var t=0;t<self.campaignOrder.length;t++){
                var time = 7200-(date-self.campaignOrder[t].trade.created);
                var hour = parseInt(time/3600);
                var minute = parseInt((time%3600)/60);
                var text = "未付款 请于"+hour+"小时"+minute+"分钟内完成付款"
                $(".campaignCountDown").find(".timer").eq(t).text(text);
                if(time<0){
                    timer.push(time);
                    if(timer.length<1){
                        window.clearInterval(campaignTimes);
                    }
                }
            }
        }

        //课程付款倒计时
        function courseComputeData( data ){
            var self = $scope;
            for( var i=0; i<data.length; i++){
                if( data[i].trade.status===1 ){
                    data[i].trade.over = 0;
                    if( moment().diff(moment(data[i].trade.created*1000)) > 7200000 ){
                        data[i].trade.over = 0;
                    }else{
                        data[i].trade.over = 1;
                    }
                }
            }
            $timeout(function(){
                self.courseOrder = data;
                var courseTimes = window.setInterval(courseGetTime,1000);
            })
        }

        function courseGetTime(){
            var self = $scope;
            var timer = [];
            var date = new Date().getTime();
            var date = parseInt(date/1000);
            for(var t=0;t<self.courseOrder.length;t++){
                var time = 7200-(date-self.courseOrder[t].trade.created);
                var hour = parseInt(time/3600);
                var minute = parseInt((time%3600)/60);
                var text = "未付款 请于"+hour+"小时"+minute+"分钟内完成付款"
                $(".courseCountDown").find(".timer").eq(t).text(text);
                if(time<0){
                    timer.push(time);
                    if(timer.length<1){
                        window.clearInterval(courseTimes);
                    }
                }
            }
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
                        getMyList();
                    }
                }
            });
        } 

        $scope.$on('$destroy',function() {  
            $(window).unbind('scroll');
        }); 

        $scope.payAgain = function( item,type ){
            var self = $scope;
            if(type==='course'){
                courseModel.payAgain({
                    _id : item.trade._id
                }).then(function( response ){
                    cacheService.courseOrder.set(response);
                    location = location.protocol+"//"+location.host+'/index.html#/common/pay/course';
                    location.reload();
                },function(){

                });
            }
            if(type==='campaign'){
                campaignModel.payAgain({
                    _id : item.trade._id
                }).then(function( response ){
                    cacheService.campaignOrder.set(response);
                    // location.href = '/index.html#/campaignPay/1?showwxpaytitle=1'
                    location = location.protocol+"//"+location.host+'/index.html#/common/pay/campaign';
                    location.reload();
                },function(){

                });
            }
        }   

        function initShare(){
            wxsdkService.shareAppMessage({
                title:'翼起学本期精选课程',
                link:link.course,
                desc:'翼起学本期精选的百个优质活动和课程，不多也不少',
                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:'翼起学本期精选课程',
                link:link.course,
                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
                success:function(){}
            });
        }

        function init(){
            bindEvents();
            wx.ready(function(){
                initShare();
            });
            getMyList();
        }

        init();
        
    }
]);
