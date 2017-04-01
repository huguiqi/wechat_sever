var link = require('../../config/link');

angular.module("YApp").controller('courseDetailCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'toolsService',
    'wxsdkService',
    'cacheService',
    'courseModel',
    function($rootScope, $scope, $state, $stateParams, $timeout, toolsService, wxsdkService, cacheService, courseModel) {
        var courseModel = new courseModel(),
            userInfo = cacheService.userInfo.get(),
            userId = cacheService.userId.get(),
            shareLink = link.course+',course/detail/'+$stateParams.id+(userInfo.isMember ? ','+userId : '');

        $scope.userInfo = userInfo;
        $scope.shareLink = shareLink;
        
        $scope.courseView = {
            status:'',
            class:0,
        }

        $scope.tipView = {
            tip:false,
            text:''
        }

        $scope.courseOrder = {
            classId:'',
        }

        $scope.collect=function( status ){
            var self = $scope;
            courseModel.collect({
                schoolId:self.schoolData._id,
                courseId:self.courseData._id,
                creator:cacheService.userId.get(),
                status:status
            }).then(function( response ){
                if(response && response.errcode==0){
                    self.courseView.status=status;
                    self.tipView.tip=true;
                    if(self.courseView.status==1){
                        self.tipView.text="收藏成功"
                    }else if(self.courseView.status==0){
                        self.tipView.text="已取消收藏"
                    }
                    $timeout(function(){
                        self.tipView.tip=false;
                    },2000);
                }else{
                    self.tipView.text="收藏失败"
                }
            },function(){

            });
        }

        $scope.classShow = function(index,item){
            var self = $scope;
            if( item.num === 0 ){
                self.tipView.tip = true;
                self.tipView.text = "已满员";
                $timeout(function(){
                    self.tipView.tip = false;
                },2000)
                return false;
            }
            self.courseView.class=index;
            self.courseOrder.classId = item._id;
            cacheService.courseOrder.set(self.courseOrder);
        }

        $scope.openLocation = function(){
            var self = $scope;
            wxsdkService.openLocation({
                lat:self.schoolData.location[1],
                lon:self.schoolData.location[0],
                name:self.courseData.schoolName,
                address:self.schoolData.address
            })
        }

        $scope.singup = function(){
            var self = $scope;
            if(self.classData[self.courseView.class].num<1){
                self.tipView.tip = true;
                self.tipView.text = "已满员";
                $timeout(function(){
                    self.tipView.tip = false;
                },2000)
                return false;
            }
            if(!self.courseOrder.mobile){
                $state.go('common.setPhone',{type:'course'});
            }else{
                $state.go('course.order');
            }
        }

        function initSlider(){
            var self = $scope;
            var data = [];
            for(var i=0;i<self.courseData.photo.length;i++){
                // var html = '<img src="'+self.courseData.photo[i]+'?imageView2/1/w/750/h/400/q/100">';
                var html = '<img src="'+self.courseData.photo[i]+'">';
                data.push({
                    content:html
                });
            }
            if(data.length>4){
                data = data.slice(0,5);
            }

            var islider = new iSlider({
                dom : document.getElementById('J_sliderWraper'),
                type:"dom",
                data : data,
                duration : 5000,
                isLooping : true,
                isAutoplay : true,
                fixPage : false
            });

            islider.addDot();
        }

        function initVideo(){
            var self = $scope;
            videojs(document.getElementById('J_video'), {}, function() {});
        }

        function getDeaultClass( classData ){
            var self = $scope;
            for( var i=0; i<classData.length; i++){
                if( classData[i].num!=0 ){
                    self.courseView.class = i;
                    break;
                }
            }
        }

        function get(){
            var self = $scope;
            courseModel.detail({
                id : $stateParams.id,
                userId : cacheService.userId.get()
            }).then(function( response ){
                $rootScope.pageLoading = false;
                self.courseData = response.courseData;
                self.classData = response.classData;
                self.schoolData = response.schoolData;
                self.schoolData.phone = response.schoolData.phone[0].split(",");
                self.courseView.status = response.favoriteData;
                self.courseOrder.classId = self.classData.length>0?response.classData[0]._id:'';
                self.courseOrder.mobile = response.mobile;
                $timeout(function(){
                    self.courseData.photo.reverse();
                    self.courseData.photo.length>0 && initSlider();
                });
                getDeaultClass(self.classData);
                self.courseData.video.length && initVideo();
                initShare();
                cacheService.courseOrder.set(self.courseOrder);
                toolsService.setTitleForIphone('课程详情');
            },function( error ){
                console.log(error);
            });
        }

        function initShare(){
            var self = $scope;
            wxsdkService.shareAppMessage({
                title:'翼起学精选课程：'+self.courseData.name,
                link:shareLink,
                desc:'翼起学本期精选的百个优质活动和课程，不多也不少！',
                imgUrl:self.courseData.cover || 'http://cdn.4001583721.com/wx-course-share.png',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:'翼起学精选课程：'+self.courseData.name,
                link:shareLink,
                imgUrl:self.courseData.cover || 'http://cdn.4001583721.com/wx-course-share.png',
                success:function(){}
            });
        }

        function init(){
            var self = $scope;
            get();
        }

        init();
    }
]);