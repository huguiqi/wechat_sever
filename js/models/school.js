var url = require("../config/url");

angular.module('YApp').factory('schoolModel',['httpService',function( httpService ){
    var school = function(){

    }
    school.prototype = {
        detail : function( params ){
            var params = params || {};
            params = angular.extend({method:'com.deer.school.get'},params);
            return httpService.request( url.school, 'GET', params);
        },
        evaluate:function(params){
            var params = params || {};
            params = angular.extend({method:'com.deer.evaluate.save'},params);
            return httpService.request( url.school, 'POST', params);
        },
        courseList:function(params){
            var params = params || {};
            params = angular.extend({method:'com.deer.course.slist'},params);
            return httpService.request( url.school, 'GET', params);
        }
    }

    return school;
}]);