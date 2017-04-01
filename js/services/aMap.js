angular.module('YApp').factory('aMapService', ['$rootScope',function($rootScope) {
    return {
        showEasyLocation: function(options) {
            var defaultOptions = {},
                map,
                marker;
            options = angular.extend(defaultOptions, options);

            map = new AMap.Map(options.container, {
                zoom: 50,
                center: options.location,
                dragEnable: true,
                zoomEnable: true
            })

            marker = new AMap.Marker({
                map: map,
                position: options.location
            });
        },
        getAddress: function( lnglatXY, success) {
            // var lnglatXY = [116.396574, 39.992706]; //地图上所标点的坐标
        	AMap.service('AMap.Geocoder',function(){//回调函数
		        geocoder = new AMap.Geocoder();
	            geocoder.getAddress(lnglatXY, function(status, result) {
	                if (status === 'complete' && result.info === 'OK') {
	                	// console.log(result.regeocode)
	                	success && success( result.regeocode );
	                } else {
	                    //获取地址失败
	                    alert('获取城市地理位置信息失败，请刷新重试')
	                }
	            });
		    })
        }
    }
}]);