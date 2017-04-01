/*
	important style file
*/
require('../css/less/app.less');

/*
	app start
*/
angular
	.module("YApp", [
		"ui.router",
		"LocalStorageModule",
		"ngSanitize",
		"oc.lazyLoad"
	])
	.config([
		'$controllerProvider',
		'$compileProvider',
		'$filterProvider',
		'$provide',
		'$httpProvider',
		'$sceDelegateProvider',
		function($controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, $sceDelegateProvider) {
			// lazy controller, directive and service
			app.controller = $controllerProvider.register;
			app.directive = $compileProvider.directive;
			app.filter = $filterProvider.register;
			app.factory = $provide.factory;
			app.service = $provide.service;
			app.constant = $provide.constant;
			app.value = $provide.value;

			$sceDelegateProvider.resourceUrlWhitelist(['**']);

		}
	])
	.run([
		'$rootScope',
		'$state',
		'$stateParams',
		'wxsdkService',
		'aMapService',
		'toolsService',
		'cacheService',
		function($rootScope, $state, $stateParams, wxsdkService, aMapService, toolsService, cacheService) {
			//Fastclick init
			Fastclick.attach(document.body);
			//cache init
            // var userId = toolsService.getUrlParam('userId') || cacheService.userId.get() || "5721c753b7078e7fda9c12b6",
            var userId = toolsService.getUrlParam('userId') || cacheService.userId.get(),
                activityId = toolsService.getUrlParam('activityId') || cacheService.activityId.get(),
                avatar = toolsService.getUrlParam('avatar') ? toolsService.getUrlParam('avatar') :
                											  cacheService.userInfo.get() ? cacheService.userInfo.get().avatar :
                											  'http://cdn.4001583721.com/default_avatar1.png?imageView2/1/w/100/h/100/q/100',
              	isMember = toolsService.getUrlParam('member')!==''?toolsService.getUrlParam('member'):0,
              	sourceId = toolsService.getUrlParam('sourceId')!==''?toolsService.getUrlParam('sourceId'):0,
              	sort = toolsService.getUrlParam('sort')!==''?toolsService.getUrlParam('sort'):0;
              	type = toolsService.getUrlParam('type')!==''?toolsService.getUrlParam('type'):0;
            if( cacheService.isSupported() && userId ){
                cacheService.userId.set(userId);
                cacheService.activityId.set(activityId);
                cacheService.userInfo.set({
                	avatar:avatar,
                	isMember: parseInt(isMember)==1,
                	type:parseInt(type),
                	sourceId: sourceId,
                	sort:sort
                });
            }else{
                alert('请在微信端打开');
            }
			//wxsdk init 
			wxsdkService.init().then(function( response ){
				wx.config( response );
                cacheService.location.remove();
				wx.ready(function(){
                	// wx.config( response );
	                wxsdkService.getLocation(function( res ){
						aMapService.getAddress([res.longitude,res.latitude],function( geo ){
		                	cacheService.location.set({
		                		lat:res.latitude,
		                		lon:res.longitude,
		                		city:geo.addressComponent.city || geo.addressComponent.province
		                	});
						});
	                })
				})
            },function(){
            });
			$rootScope.$on('$stateChangeSuccess', function(evt) {
				$rootScope.pageLoading = true;
				$rootScope.isPageCover = false;
				$rootScope.isPageMinCover = true;
				$rootScope.isPageWhite = false;
				if( $state.current.name !=='wechatError' && !toolsService.isWechat() ){
					// $state.go('wechatError');
				}
			});
		}
	]);
	
require('./config/lazyload.js');
require('./routers/index.js');
require('./services/index.js');
require('./models/index.js');
require('./filters/index.js');
require('./controllers/index.js');
require('./directives/index.js');

window['adaptive'].desinWidth = 750;// 设计图宽度
window['adaptive'].baseFont = 14;// 没有缩放时的字体大小
window['adaptive'].maxWidth = 480;// 页面最大宽度 默认540
window['adaptive'].init();// 调用初始化方法
