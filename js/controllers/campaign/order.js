var link = require('../../config/link');

angular.module("YApp").controller('campaignOrder', [
    '$rootScope',
    '$scope',
    '$state',
    '$stateParams',
    '$timeout',
    'cacheService',
    'wxsdkService',
    'campaignModel',
    'toolsService',
    function($rootScope, $scope, $state, $stateParams, $timeout, cacheService, wxsdkService, campaignModel, toolsService) {
        var campaignModel = new campaignModel(),
            campaignOrderInfo = cacheService.campaignOrder.get(),
            campaignId = campaignOrderInfo.campaignId || campaignOrderInfo.order.campaignId,
            userInfo = cacheService.userInfo.get(),
            userId = cacheService.userId.get(),
            shareLink = link.campaign+',campaign/detail/'+campaignId+(userInfo.isMember ? ','+userId : '');

        $("#J_campaignOrder").css('minHeight',$(document.body)[0].scrollHeight);
        
        toolsService.setTitleForIphone("订单确认");

        $rootScope.isPageMinCover = true;

        $scope.currentTicketIndex = 0;

        $scope.maxNum = 1;

        $scope.order = {
            userId: cacheService.userId.get(),
            campaignId: campaignId,
            num: 1,
            mobile: campaignOrderInfo.mobile || (campaignOrderInfo.order?campaignOrderInfo.order.mobile:''),
            price:0,
            eTicketId:0
        }

        $scope.tipView = {
            tip:false,
            text:''
        }

        function getDetail() {
            var self = $scope;
            campaignModel.ticketList({
                id: campaignId
            }).then(function(response) {
                $timeout(function() {
                    $rootScope.pageLoading = false;
                });
                self.campaign = response.campaign;
                self.ticketList = response.eTicket;
                self.order.price = self.ticketList[0].price;
                self.order.eTicketId = self.ticketList[0]._id;
                self.maxNum = self.ticketList[0].remainder>=0?
                                self.ticketList[0].remainder<10?self.ticketList[0].remainder:10
                                :10;
                self.order.num = self.ticketList[0].remainder===0?0:1;
                wx.ready(function(){
                    initShare();
                });
            }, function() {

            });
        }

        // $scope.addOrder = function() {
        //     var self = $scope;
        //     if( self.maxNum===0 ){
        //         return false;
        //     }
        //     if( self.order.mobile==='' ){
        //         self.tipView.text = "请填写手机号码"
        //         self.tipView.show = true;
        //         $timeout(function(){
        //           self.tipView.show = false;  
        //         },1000)
        //         return false;
        //     }
        //     if( self.order.name==='' ){
        //         self.tipView.text = "请填写参与人姓名"
        //         self.tipView.show = true;
        //         $timeout(function(){
        //           self.tipView.show = false;  
        //         },1000)
        //         return false;
        //     }

        //     campaignModel.order(self.order).then(function(response) {
        //         if( response.order.price === 0 ){
        //             alert('您已报名成功，报名详细信息已发送到您的手机上，谢谢');
        //             $state.go('campaign.myCampaign');
        //         }else{
        //             response.order.mobile = campaignOrderInfo.mobile || campaignOrderInfo.order.mobile;
        //             cacheService.campaignOrder.set(response);
        //             location = location.protocol+"//"+location.host+'/index.html#/common/pay/campaign';
        //             location.reload();
        //         }
        //     }, function() {
        //         alert('提交订单失败')
        //     });
        // }

        $scope.submit = function(){
            var self = $scope;
            if( self.maxNum===0 ){
                self.tipView.text = "该票已售罄";
                self.tipView.show = true;
                $timeout(function(){
                  self.tipView.show = false;  
                },1000)
                return false;
            }
            campaignOrderInfo.price = self.order.price;
            campaignOrderInfo.num = self.order.num;
            campaignOrderInfo.eTicketId = self.order.eTicketId;
            cacheService.campaignOrder.set(campaignOrderInfo);
            if(!self.order.mobile){
                $state.go('common.setPhone',{type:'campaign'});
            }else{
                $state.go('campaign.question');
            }
        }

        $scope.subNum = function() {
            var self = $scope;
            if (self.order.num > 1) {
                self.order.num--;
                self.order.price = self.ticketList[self.currentTicketIndex].price*self.order.num;
            }
        }

        $scope.addNum = function() {
            var self = $scope;
            if (self.order.num < self.maxNum) {
                self.order.num++;
                self.order.price = self.ticketList[self.currentTicketIndex].price*self.order.num;
            }
        }

        $scope.ticketSelect = function(index){
            var self = $scope;
            self.currentTicketIndex = index;
            self.order.num = self.ticketList[index].remainder===0?0:1;
            self.order.price = self.ticketList[index].price;
            self.order.eTicketId = self.ticketList[index]._id;
            self.maxNum = self.ticketList[index].remainder>=0?
                                self.ticketList[index].remainder<10?self.ticketList[index].remainder:10
                                :10;
        }

        function initShare(){
            var self = $scope;
            wxsdkService.shareAppMessage({
                title:self.campaign.name,
                link:shareLink,
                desc:'在学习中玩耍，找翼起学！百个教育活动任你选',
                imgUrl:self.campaign.cover+'?imageView2/1/w/400/h/400/q/80',
                success:function(){}
            });
            wxsdkService.shareTimeline({
                title:self.campaign.name,
                link:shareLink,
                imgUrl:self.campaign.cover+'?imageView2/1/w/400/h/400/q/80',
                success:function(){}
             });
        }

        function init() {
            getDetail();
        }

        init();
    }
]);