angular.module('YApp').factory('cacheService', ['localStorageService', function(localStorageService) {
	return {
		isSupported : function(){
			return localStorageService.isSupported;
		},
		location : {
			set : function( location ){
				localStorageService.set('location', location);
			},
			get : function(){
				return localStorageService.get('location');
			},
			remove : function(){
				localStorageService.remove('location');
			}
		},
		userId : {
			set : function( userId ){
				localStorageService.set('userId', userId);
			},
			get : function(){
				return localStorageService.get('userId');
			},
			remove : function(){
				localStorageService.remove('userId');
			}
		},
		activityId : {
			set : function( activityId ){
				localStorageService.set('activityId', activityId);
			},
			get : function(){
				return localStorageService.get('activityId');
			},
			remove : function(){
				localStorageService.remove('activityId');
			}
		},
		campaignOrder : {
			set : function( campaignOrder ){
				localStorageService.set('campaignOrder', campaignOrder);
			},
			get : function(){
				return localStorageService.get('campaignOrder');
			},
			remove : function(){
				localStorageService.remove('campaignOrder');
			}
		},
		courseOrder : {
			set : function( courseOrder ){
				localStorageService.set('courseOrder', courseOrder);
			},
			get : function(){
				return localStorageService.get('courseOrder');
			},
			remove : function(){
				localStorageService.remove('courseOrder');
			}
		},
		distributionOrder : {
			set : function( distributionOrder ){
				localStorageService.set('distributionOrder', distributionOrder);
			},
			get : function(){
				return localStorageService.get('distributionOrder');
			},
			remove : function(){
				localStorageService.remove('distributionOrder');
			}
		},
		userInfo : {
			set : function( userInfo ){
				localStorageService.set('userInfo', userInfo);
			},
			get : function(){
				return localStorageService.get('userInfo');
			},
			remove : function(){
				localStorageService.remove('userInfo');
			}
		}
	}
}]);