var link = require('../../config/link');

angular.module("YApp").controller('campaignQuestionCtrl', [
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
            campaignOrderInfo = cacheService.campaignOrder.get(),
            userInfo = cacheService.userInfo.get(),
            campaignOrderInfo = cacheService.campaignOrder.get();
        
        $("#J_campaignDetail").css('minHeight',$(document.body)[0].scrollHeight);
        toolsService.setTitleForIphone("填写参与人信息");

        $scope.order = {
            userId: cacheService.userId.get(),
            campaignId: campaignOrderInfo.campaignId || campaignOrderInfo.order.campaignId,
            num: campaignOrderInfo.num || campaignOrderInfo.order.num,
            mobile: parseInt(campaignOrderInfo.mobile || campaignOrderInfo.order.mobile,10),
            price: campaignOrderInfo.price!==undefined?campaignOrderInfo.price:campaignOrderInfo.order.price,
            eTicketId: campaignOrderInfo.eTicketId || campaignOrderInfo.order.eTicketId,
            sourceId : userInfo.sourceId,
            answer:[]
        }

        $scope.questionList = [];
        $scope.tipView = {
            show:false,
            text:''
        }
        $scope.saveStatus = {
            text:$scope.order.num>1?"下一位参与人信息":'确认报名',
            loading:false
        }
        $scope.questionForm = {}
        $scope.submit = submit;
        $scope.validateQuestion = validateQuestion;
        $scope.editIndex = 0;

        function questionList(){
            var self = $scope;
            campaignModel.questionList({
                campaignId : campaignOrderInfo.campaignId || campaignOrderInfo.order.campaignId
            }).then(function( response ){
                $rootScope.pageLoading = false;
                self.questionList = response.data;
                setQuestionModel( self.questionList );
            },function(){

            });
        }

        function setQuestionModel( list ){
            var self = $scope,
                checkboxArray = [];
            self.questionForm.name = '';
            self.questionForm.mobile = self.order.mobile;
            for(var i=0; i<list.length; i++){
                if(list[i]['type']===1){
                    self.questionForm[ list[i]['_id']+'_'+list[i]['type'] ] = list[i]['item'][0]['_id'];
                }else if( list[i]['type']===2){
                    for(var j=0; j<list[i]['item'].length; j++){
                        checkboxArray.push('');
                    }
                    self.questionForm[ list[i]['_id']+'_'+list[i]['type'] ] = checkboxArray;
                }else{
                    self.questionForm[ list[i]['_id']+'_'+list[i]['type'] ] = '';
                }
            }
        }

        function validateQuestion(){
            var self = $scope,
                questionForm = self.questionForm,
                temp = true;
            for(var item in questionForm){
                if( typeof questionForm[item]==='string' && questionForm[item]==='' ){
                    temp = false;
                }else if( typeof questionForm[item]==='object' && questionForm[item].join('').length===0){
                    temp = false;
                }
            }
            return temp;
        }

        function getAnswer(){
            var self = $scope,
                answerArray = [],
                temp;

            for( var item in self.questionForm){
                if( item === 'name' ){
                    answerArray.push({name:self.questionForm[item]});
                }else if( item === 'mobile' ){
                    answerArray.push({mobile:self.questionForm[item]});
                }else{
                    temp = {};
                    temp.id = item.split('_')[0];
                    temp.type = +item.split('_')[1];
                    temp.value = typeof self.questionForm[item] === 'string' ? self.questionForm[item] : self.questionForm[item].join(',');
                    answerArray.push( temp );
                }
            }

            return answerArray;
        }

        function submit(myForm){
            var self = $scope;
            if(myForm.$invalid || !validateQuestion() || self.saveStatus.loading){
                return false;
            }
            self.order.answer[self.editIndex] = getAnswer();
            //多人数填写问卷
            if( self.editIndex < self.order.num-1 ){
                self.editIndex+=1;
                setQuestionModel( self.questionList );
                window.scrollTo(0,0);
            }else{
                self.saveStatus.text = '报名中...';
                self.saveStatus.loading = true;
                campaignModel.order(self.order).then(function(response) {
                    if( response && response.name === 'ProtocolError'){
                        alert("微信协议错误，此活动不能支付，请联系管理员");
                        return false;
                    }
                    if( response && response.order.price === 0 ){
                        alert('您已报名成功，报名详细信息已发送到您的手机上，谢谢');
                        $state.go('campaign.myCampaign');
                    }else{
                        response.order.mobile = campaignOrderInfo.mobile || campaignOrderInfo.order.mobile;
                        cacheService.campaignOrder.set(response);
                        location = location.protocol+"//"+location.host+'/index.html#/common/pay/campaign';
                        location.reload();
                    }
                }, function() {
                    alert('提交订单失败')
                });
            }
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

        $scope.$watch('editIndex',function(newValue,oldValue){
            var self = $scope;
            if(newValue===self.order.num-1){
                self.saveStatus.text = '确认报名';
            }
        });

        function init(){
            wx.ready(function(){
                initShare();
            });
            questionList();
        }

        init();
    }
]);