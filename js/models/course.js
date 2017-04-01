var url = require("../config/url");

angular.module('YApp').factory('courseModel',['httpService',function( httpService ){
    var course = function(){

    }
    course.prototype = {
        sendPhoneMsg : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.sms.sendSms'},params);
            return httpService.request( url.course, 'GET', params);
        },
        verificationCode : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.sms.checkCode'},params);
            return httpService.request( url.course, 'POST', params);
        },
        detail : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.course.get'},params);
            return httpService.request( url.course, 'GET', params);
        },
        collect : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.favorite.saveOrUpdate'},params);
            return httpService.request( url.course, 'POST', params);
        },
        categoryList : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.category.list'},params);
            return httpService.request( url.course, 'GET', params);
        },
        list : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.course.list'},params);
            return httpService.request( url.course, 'GET', params);
        },
        orderDetail : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.course.detail'},params);
            return httpService.request( url.course, 'GET', params);
        },
        order : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.course.order'},params);
            return httpService.request( url.course, 'POST', params);
        },
        userOrder : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.course.userOrder'},params);
            return httpService.request( url.course, 'GET', params);
        },
        userFavorite : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.favorite.userFavorite'},params);
            return httpService.request( url.course, 'GET', params);
        },
        payAgain : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.course.againPay'},params);
            return httpService.request( url.course, 'GET', params);
        }
    }

    return course;
}]); 