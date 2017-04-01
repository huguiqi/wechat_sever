var link = require('../../config/link');

angular.module("YApp").controller('campaignDetailCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'campaignModel',
    'toolsService',
    'wxsdkService',
    'cacheService',
    'toolsService',
    function($rootScope, $scope, $state, $stateParams, $timeout, campaignModel, toolsService, wxsdkService, cacheService, toolsService) {
        var campaignModel = new campaignModel(),
            userInfo = cacheService.userInfo.get(),
            userId = cacheService.userId.get(),
            shareLink = link.campaign+',campaign/detail/'+$stateParams.id+(userInfo.isMember ? ','+userId : ''),
            timer;
        
        $("#J_campaignDetail").css('minHeight',$(document.body)[0].scrollHeight);

        $scope.userInfo = userInfo;
        $scope.shareLink = shareLink;
        $scope.campaign = {
            name : "",       //活动名
            description : "",    //活动简介
            cover : "",      //活动图标
            poster : "",
            video : "",
            sponsor : "", //主办方
            startTime : "",  //开始时间
            endTime : "",    //结束时间
            overTime: "", //报名截止时间
            address : "",    //详细地址
            personName : "",    //负责人姓名
            phone : "",     //负责人电话
            images : []     //活动照片，多张图片拼成路径字符串，逗号分隔,
        };

        $scope.campaignOrder = {
            campaignId:$stateParams.id,
            mobile:'',
        }

        $scope.campaignIsOver = false;
        //view
        $scope.imageShow = 2;// 2有两张及以上活动图片；1有一张活动图片；0没有活动图片

        function get(){
            var self = $scope;
            campaignModel.detail({
                id : $stateParams.id,
                userId : cacheService.userId.get()
            }).then(function( response ){
                $timeout(function(){
                    $rootScope.pageLoading = false;
                });
                self.campaign = response.campaign;
                self.campaign.school = response.school;
                self.campaign.minPrice = response.price;
                self.campaignOrder.mobile = response.mobile;
                self.campaign.overTime = self.campaign.overTime || self.campaign.endTime;
                self.campaignIsOver = self.campaign.overTime <= parseInt( new Date().getTime()/1000, 10);

                !self.campaignIsOver && initCalculationCountdown();

                toolsService.setTitleForIphone(response.name);

                if(self.campaign.images.length>=1){
                    self.imageShow = 2;
                    initSlider();
                }else{
                    self.imageShow = 0;
                }
                wx.ready(function(){
                    initShare();
                });
                window.scrollTo(0,0);

            },function(){

            });
        }

        function initSlider(){
            var data = [];
            for(var i=0;i<$scope.campaign.images.length;i++){
                var html = '<img src="'+$scope.campaign.images[i]+'?imageView2/1/w/750/h/400/q/100">';
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

        $scope.singup = function(){
            var self = $scope;
            cacheService.campaignOrder.set(self.campaignOrder);
            // if(!self.campaignOrder.mobile){
            //     $state.go('common.setPhone',{type:'campaign'});
            // }else{
            //     $state.go('campaign.order');
            // }
            $state.go('order');
        }

        function initShare(){
            var self = $scope;
            wxsdkService.shareAppMessage({
                title:self.campaign.name,
                link:shareLink,
                desc:'在学习中玩耍，找翼起学！百个教育活动任你选',
                imgUrl:(self.campaign.images[0] || self.campaign.cover)+'?imageView2/1/w/400/h/400/q/80',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:self.campaign.name,
                link:shareLink,
                imgUrl:(self.campaign.images[0] || self.campaign.cover)+'?imageView2/1/w/400/h/400/q/80',
                success:function(){}
            });
        }

        function initCalculationCountdown(){
            var self = $scope,
                date,
                overTime = self.campaign.overTime,
                timerEle = document.getElementById("J_timer")
            timer = setInterval(function(){
                date = toolsService.calculationCountdown(overTime);
                if(!date){
                    $timeout(function(){
                        self.campaignIsOver = true;
                        clearInterval(timer);
                    })
                }else{
                    timerEle.innerHTML = ('离报名结束还有'+date[0]+'天'+date[1]+'小时'+date[2]+'分'+date[3]+'秒')
                }
            },1000)
        }

        $scope.openLocation = function(){
            var self = $scope;
            wxsdkService.openLocation({
                lat:self.campaign.location[1],
                lon:self.campaign.location[0],
                name:self.campaign.name,
                address:self.campaign.address
            })
        }

        function init(){
            window.scrollTo(0,0);
            get();
        }

        init();
    }
]);