var url = require("../config/url");

angular.module('YApp').factory('campaignModel',['httpService',function( httpService ){
	var campaign = function(){

	}
	campaign.prototype = {
		sendPhoneMsg : function( params ){
			var params = params || {};
			params = angular.extend({method:'com.deer.sms.sendSms'},params);
			return httpService.request( url.campaign, 'GET', params);
		},
		verificationCode : function( params ){
			var params = params || {};
			params = angular.extend({method:'com.deer.sms.checkCode'},params);
			return httpService.request( url.campaign, 'POST', params);
		},
		hostList : function( params ){
			var params = params || {};
			params = angular.extend({method:'com.event.channel.campaign.list'},params);
			return httpService.request( url.campaign, 'GET', params);
		},
        recommendList : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.event.channel.campaign.recommend'},params);
            return httpService.request( url.campaign, 'GET', params);
        },
        nearList : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.event.channel.campaign.nearby'},params);
            return httpService.request( url.campaign, 'GET', params);
        },
		detail : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.event.channel.campaign.get'},params);
            return httpService.request( url.campaign, 'GET', params);
        }, 
        order : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.event.channel.campaign.order'},params);
            return httpService.request( url.campaign, 'POST', params);
        },
        payAgain : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.event.channel.campaign.againPay'},params);
            return httpService.request( url.campaign, 'GET', params);
        },
        myCampaign : function( params ){
        	var params = params || {};
            params = angular.extend({method:'com.event.channel.campaign.userOrder'},params);
            return httpService.request( url.campaign, 'GET', params);
        },
        ticketList : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.eTicket.list'},params);
            return httpService.request( url.campaign, 'GET', params);
        },
        questionList:function(params){
            var params = params || {};
            params = angular.extend({method:'com.deer.question.list'},params);
            return httpService.request( url.campaign, 'GET', params);
        }

	}

	return campaign;
}]); 