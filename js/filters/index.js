angular.module('YApp').filter('phone',['$sce',function ($sce) {
    return function (value) {
		return $sce.trustAsHtml(value.replace(/,/g,'<br/>'));
    }
}])

angular.module('YApp').filter('html',['$sce',function ($sce) {
    return function (value) {
        return $sce.trustAsHtml(value);
    }
}])

angular.module('YApp').filter('trusted',['$sce',function ($sce) {
    return function (value) {
      return $sce.trustAsResourceUrl(value);
    }
}])


angular.module('YApp').filter('mdate', function () {
    return function (date, str) {
    	return moment.unix( date ).format( str );
    }
})

angular.module('YApp').filter('clearSpace', function () {
    return function (value) {
      return value.replace(/\s+/g,"");
    }
})

angular.module('YApp').filter('distance', function () {
    return function (value) {
        if( value < 1000 ){
            return parseInt(value)+'m';
        }else{
            return parseFloat(value/1000).toFixed(2)+'km';
        }
    }
})

