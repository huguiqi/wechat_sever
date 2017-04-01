var link = require('../../config/link');

angular.module("YApp").controller('courseListCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    '$location',
    'courseModel',
    'cacheService',
    'wxsdkService',
    function($rootScope, $scope, $state, $stateParams, $timeout, $location, courseModel, cacheService, wxsdkService) {
        var courseModel = new courseModel(),
            swiperHeader = null,
            location = cacheService.location.get() || {
                lat:31.29607,
                lon:121.4961,
                city:'上海市'
            };

        //scope data
        $scope.view = {
            navFixed : false,
            imageNumber:''
        }
        $scope.pageConfig = {
            start : 1,
            limit : 6,
            showLoading:true,
            loadingText:'努力加载中...',
            loadingProcess:true,
            scrollAble:false,
            hasNoData:false
        }
        $scope.secondCategoryId = $stateParams.secondCategoryId;
        $scope.courseCategory = [];
        $scope.courseList = [];
        //scope function
        $scope.selectCourse = selectCourse;
        $scope.activeIndex = 0;

        function selectCourse(index){
            var self = $scope;
            swiperHeader.slideTo(index); 
            $location.search('item',index);
        }

        function initCategoryList(){
            var self = $scope;
            courseModel.categoryList({
                id : $stateParams.firstCategoryId
            }).then(function( response ){
                $timeout(function(){
                    $rootScope.pageLoading = false;
                    self.courseCategory = response.data;
                    self.activeIndex = getCurrentActiveIndex();
                    setTimeout(function(){
                        initSwiper();
                        getCourseList();
                    })
                })
            },function(){

            });
        }

        function getCurrentActiveIndex(){
            var self = $scope,
                itemParam = $location.search().item;
            if( itemParam !== undefined ){
                return parseInt(itemParam);
            }
            for( var i=0; i<self.courseCategory.length; i++){
                if( self.courseCategory[i]._id === self.secondCategoryId ){
                    return i;
                }
            }
        }

        function initSwiper(){
            var self = $scope;
            swiperHeader = new Swiper('#J_swiperHeader', {
                slidesPerView: 3,
                spaceBetween: 0,
                freeMode: true,
                onInit: function(swiper){
                    swiper.slideTo( self.activeIndex ); 
                    $timeout(function(){
                        $location.search('item',self.activeIndex);
                    });
                },
                onTap:function(swiper){
                    if( self.activeIndex === swiper.clickedIndex ){
                        return false;
                    }
                    self.activeIndex = swiper.clickedIndex;
                    // debugger;
                    if(  !self.pageConfig.loadingProcess ){
                        self.pageConfig.start = 1;
                        self.pageConfig.loadingText = '努力加载中...'
                        self.pageConfig.showLoading = true;
                        self.pageConfig.hasNoData = false;
                        self.courseList = [];
                        getCourseList( true );
                    }
                }
            }); 
        }

        function getCourseList( reset ){
            var self = $scope,
                reset = reset || false;
            courseModel.list({
                subcategoryId : self.courseCategory[self.activeIndex]['_id'],
                start:self.pageConfig.start,
                limit:self.pageConfig.limit,
                city:location.city,
                lon:location.lon,     
                lat:location.lat,
                distance:20/111
            }).then(function( response ){
                if( response && response.data ){
                    self.courseList = !reset ? self.courseList.concat(response.data) : response.data;
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

        function bindEvents(){
            var self = $scope;
                bannerHeight = angular.element("#J_banner").height(),
                win = window,
                body = document.body;

            $(win).bind('scroll',function(){
                //导航固定
                if( win.scrollY >= bannerHeight ){
                    $timeout(function(){
                        self.view.navFixed = true;
                    })
                }else{
                    $timeout(function(){
                        self.view.navFixed = false;
                    })
                }
                // console.log( win.scrollY, win.innerHeight, body.offsetHeight);
                //滚动加载
                if( win.scrollY + win.innerHeight >= body.offsetHeight - 60){
                    if( self.pageConfig.scrollAble && !self.pageConfig.loadingProcess ){
                        self.pageConfig.loadingProcess = true;
                        self.pageConfig.showLoading = true;
                        self.pageConfig.start++;
                        getCourseList();
                    }
                }
            });
        } 

        $scope.$on('$destroy',function() {  
            $(window).unbind('scroll');
        }); 

        function initShare(){
            wxsdkService.shareAppMessage({
                title:'翼起学本期精选课程',
                link:link.course+',course/list/'+$stateParams.firstCategoryId+'/'+$stateParams.secondCategoryId,
                desc:'翼起学本期精选的百个优质活动和课程，不多也不少',
                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:'翼起学本期精选课程',
                link:link.course+',course/list/'+$stateParams.firstCategoryId+'/'+$stateParams.secondCategoryId,
                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
                success:function(){}
            });
        }

        function init(){
            bindEvents();
            wx.ready(function(){
                initShare();
            });
            initCategoryList();
        }

        init();
    }
])