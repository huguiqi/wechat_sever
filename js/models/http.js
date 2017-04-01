angular.module('YApp').factory('httpService',['$http', '$q',function($http, $q){
    
    return {
        request : function( url, method, params, headers){
            var defer = $q.defer(),
                headers = headers || {},
                req = {
                    url : url,
                    method : method
                },
                config = {
                    version:"1.1",
                    format:'json',
                    language:'zh_CN'
                };

            req.headers = headers;
            
            if( params && angular.isObject(params) ) {
                if(method === 'GET') {
                    req.params = angular.extend(config, params);
                }else {
                    req.data = angular.extend(config, params);
                }
            }else if( params && angular.isString(params) ){
                if(method === 'GET') {
                    req.params = params;
                }else {
                    req.data = params;
                }
            }
            
            $http( req ).success(function(data){
                defer.resolve(data);
            }).error(function(data){
                defer.reject(data);
            });

            return defer.promise;
        }        
    }    
    
}]);