var link = require('../../config/link');
var url = require('../../config/url.js');

angular.module("YApp").controller('distributionProductsCtrl', [
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
            

        toolsService.setTitleForIphone("推广产品");
        $("#J_distrbutionProducts").css('minHeight',$(document.body)[0].scrollHeight);
        $rootScope.pageLoading = false;
        $rootScope.isPageCover = false;
        $rootScope.isPageWhite = true;
        $scope.userInfo = userInfo;
        $scope.pageConfig = {
            listType:1,
            pageNumber:1,
            start:1,
            limit:4,
            showLoading:true,
            loadingText:'努力加载中...',
            loadingProcess:true,
            scrollAble:false,
            hasNoData:false
        }

        $scope.goNewPages = function (id) {
            var self = $scope;
            if(self.pageConfig.listType == 1){
                if(id===1){
                    $state.go('distribution.index');
                }else{
                    $state.go('distribution.principal');
                }
            }
            if(self.pageConfig.listType == 2){
                $state.go('course.detail',{id:id});
            }
            if(self.pageConfig.listType == 3){
                $state.go('campaign.detail',{id:id});
            }
        }

        $scope.list = [];
        $scope.campaignList = [];
        $scope.courseList = [];

        //最小最大价格
        function priceInterval(courseList) {
            var self = $scope;
            for(var i = 0;i<courseList.length;i++){
                self.price = [];    
                for(var k = 0;k<courseList[i].class.length;k++){
                    if(courseList[i].class[k].type==1){
                        self.price.push(courseList[i].class[k].price*courseList[i].class[k].discount/100);
                    }
                    if(courseList[i].class[k].type==2){
                        self.price.push(courseList[i].class[k].audition);
                    }   
                }
                self.courseList[i].maxPrice = parseInt( Math.max.apply(Math,self.price) );
                self.courseList[i].minPrice = parseInt( Math.min.apply(Math,self.price) );
            }
        }

        $scope.updateList = function (type) {
            var self = $scope;
            self.list = [];
            self.pageConfig.pageNumber = 1;
            self.pageConfig.listType = type;
            self.pageConfig.loadingProcess = true;
            self.pageConfig.start = 1;
            self.pageConfig.loadingText = '努力加载中...'
            self.pageConfig.showLoading = true;
            self.pageConfig.hasNoData = false;
            getList(true);
        }

        function getList(reset) {
            var self = $scope;
            self.reset = reset || false;
            if(self.pageConfig.listType==1){
                distributionModel.productList({
                    start:self.pageConfig.start,
                    limit:self.pageConfig.limit,
                    type:self.pageConfig.listType
                }).then(function (response) {
                    if( response && response.data ){
                        self.list = !self.reset ? self.list.concat(response.data) : response.data;
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
            if(self.pageConfig.listType==2){
                distributionModel.courseList({
                    start:self.pageConfig.start,
                    limit:self.pageConfig.limit,
                    id:url.courseCategoryId/*课程分类id*/
                }).then(function (response) {
                    if( response && response.data ){
                        self.courseList = !self.reset ? self.courseList.concat(response.data) : response.data;
                        self.pageConfig.loadingProcess = false;
                        self.pageConfig.showLoading = response.data.length<self.pageConfig.limit;
                        self.pageConfig.hasNoData = response.data.length<self.pageConfig.limit;
                        self.pageConfig.scrollAble = response.data.length===self.pageConfig.limit;
                        priceInterval(self.courseList)
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
            if(self.pageConfig.listType==3){
                distributionModel.campaignList({
                    start:self.pageConfig.pageNumber,
                    limit:self.pageConfig.limit,
                    id:url.wechatId/*微信公众号id*/
                }).then(function (response) {
                    if( response && response.total>-1 ){
                        self.campaignList = self.pageConfig.pageNumber==1 ? response.data : self.campaignList.concat(response.data);
                        self.pageConfig.loadingProcess = false;
                        self.pageConfig.showLoading = response.total<self.pageConfig.limit;
                        self.pageConfig.scrollAble = response.total>self.pageConfig.limit||response.total==self.pageConfig.limit;
                        if(self.pageConfig.pageNumber==response.cPage){
                            self.pageConfig.pageNumber+=1;
                        }else{
                            self.pageConfig.pageNumber = response.cPage;
                        }
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
                        self.pageConfig.loadingProcess = true;
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
            wx.ready(function(){
                initShare();
            });
            getList();
            bindEvents();
        }

        init();
    }
]);
