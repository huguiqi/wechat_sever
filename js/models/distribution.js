var url = require("../config/url");

angular.module('YApp').factory('distributionModel',['httpService',function( httpService ){
    var distribution = function(){}

    distribution.prototype = {
        order : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.member.order'},params);
            return httpService.request( url.distribution, 'POST', params);
        },
        centerDetail : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.member.getEarnDetail'},params);
            return httpService.request( url.distribution, 'GET', params);
        },
        centerList : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.member.list'},params);
            return httpService.request( url.distribution, 'GET', params);
        },
        productList : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.member.salesProduct'},params);
            return httpService.request( url.distribution, 'GET', params);
        },
        saleList : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.member.salesHistory'},params);
            return httpService.request( url.distribution, 'GET', params);
        },
        getSort : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.member.numberSort'},params);
            return httpService.request( url.distribution, 'GET', params);
        },
        courseList : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.income.course'},params);
            return httpService.request( url.distribution, 'GET', params);
        },
        campaignList : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.income.campaign'},params);
            return httpService.request( url.distribution, 'GET', params);
        },
        memberInfo : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.member.memberInfo'},params);
            return httpService.request( url.distribution, 'GET', params);
        }
    }

    return distribution;
}]);