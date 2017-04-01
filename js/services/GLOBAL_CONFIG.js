var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {         //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

var GLOBAL_CONFIG = {
	scope: window,
	nf: function() {},
	storageLocation: function(options) {
		this.scope.App_location = options;
	},
	getLocation: function(params,success) {
		var self = this,
			Cordova = window.Cordova,
			defaultLocaltion = {
                cityId:'54cf1f1f7286364768000001',
                lon:'121.483757',
                lat:'31.237607',
                different:1
            };
        if( !browser.versions.mobile ){
        	success(defaultLocaltion)
        }
		if (Cordova) {
			Cordova.exec(function(data){ success(data) }, function(error){alert(error)}, "CallActivityPlugin", "getLocation", params);
		}
	},
	storageUserInfo: function(options) {
		this.scope.APP_userInfo = options;
	},
	getUserInfo: function() {
		return this.scope.APP_userInfo;
	},
	storageListKeyword: function(options) {
		this.scope.App_keyword = options;
	},
	getListKeyword: function() {
		var defaultListKeyword = {
			keyword: ''
		};
		return this.scope.App_keyword || defaultListKeyword;
	},
	//open native activity view
	openNativeView: function(params) {
		var self = this,
			Cordova = window.Cordova;
		if (Cordova) {
			Cordova.exec(self.nf, self.nf, "CallActivityPlugin", "native", params);
		}
	},
	praiseEvaluationCallback: function(options) {
		$("#"+options.evaluateId).click();
	}
}

module.exports = GLOBAL_CONFIG;