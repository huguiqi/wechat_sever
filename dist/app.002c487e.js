/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
		important style file
	*/
	__webpack_require__(1);

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
		
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(10);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(46);

	window['adaptive'].desinWidth = 750;// 设计图宽度
	window['adaptive'].baseFont = 14;// 没有缩放时的字体大小
	window['adaptive'].maxWidth = 480;// 页面最大宽度 默认540
	window['adaptive'].init();// 调用初始化方法


/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */
/***/ function(module, exports) {

	angular.module('YApp').constant('MODULE_CONFIG', [
	    {
	        name: 'video-js',
	        files: [
	            'lib/video/video.min.js',
	            'lib/video/video-js.min.css'
	        ]
	    }
	]).constant('JQ_CONFIG', {
	    'amap': [{
	        "type":"js",
	        "path":"http://webapi.amap.com/maps?v=1.3&key=c87d91e9d9c9eceeed4bd1776801464b"
	    }],
	    'swiper': [
	        'lib/swiper/swiper.min.css',
	        'lib/swiper/swiper.min.js'
	    ],
	    'jquery-qrcode':[
	        'lib/jquery-qrcode/jquery.qrcode.min.js',
	        'lib/jquery-qrcode/qrcode.js'
	    ]
	}).config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
	    // We configure ocLazyLoad to use the lib script.js as the async loader
	    $ocLazyLoadProvider.config({
	        debug: false,
	        events: true,
	        modules: MODULE_CONFIG
	    });
	}])


/***/ },
/* 3 */
/***/ function(module, exports) {

	angular.module('YApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'MODULE_CONFIG','JQ_CONFIG',
	    function($stateProvider, $urlRouterProvider, $locationProvider, MODULE_CONFIG, JQ_CONFIG) {

	        var templateDir = './js/tpl/';

	        $urlRouterProvider.otherwise('/wechatError');

	        $stateProvider
	            //not-wechat
	            .state('wechatError',{
	                url:'/wechatError',
	                templateUrl: templateDir + 'common/wechatError.html'
	            })
	            //campaign
	            .state('campaign',{
	                abstract: true,
	                url:'/campaign',
	                templateUrl: templateDir + 'campaign/layout.html'
	            })
	            .state('campaign.list',{
	                url:'/list/:id',
	                templateUrl: templateDir + 'campaign/list.html'
	            })
	            .state('campaign.detail',{
	                url:'/detail/:id',
	                templateUrl: templateDir + 'campaign/detail.html',
	                resolve: load(['jquery-qrcode'])
	            })
	            .state('campaign.myCampaign',{
	                url:'/myCampaign',
	                templateUrl: templateDir + 'campaign/myCampaign.html'
	            })
	            .state('order',{
	                url:'/order',
	                templateUrl: templateDir + 'campaign/order.html'
	            })
	            .state('campaign.question',{
	                url:'/question',
	                templateUrl: templateDir + 'campaign/question.html'
	            })
	            //course
	            .state('course',{
	                abstract: true,
	                url:'/course',
	                templateUrl: templateDir + 'course/layout.html'
	                // template: '<div ui-view  style="min-height:100%"></div>'
	            })
	            //course-index
	            .state('course.index',{
	                url:'/index/:id',
	                templateUrl: templateDir + 'course/home.html'
	            })
	            //course-list
	            .state('course.list',{
	                url:'/list/:firstCategoryId/:secondCategoryId',
	                templateUrl: templateDir + 'course/list.html',
	                resolve: load(['swiper'])
	            })
	            //course-detail
	            .state('course.detail',{
	                url:'/detail/:id',
	                templateUrl: templateDir + 'course/detail.html',
	                resolve: load(['video-js','jquery-qrcode'])
	            })
	            //course-setPhone
	            .state('course.setPhone',{
	                url:'/setPhone/:id',
	                templateUrl: templateDir + 'course/setPhone.html'
	            })
	            //course-order
	            .state('course.order',{
	                url:'/order',
	                templateUrl: templateDir + 'course/order.html'
	            })
	            //course-pay
	            .state('course.pay',{
	                url:'/pay/:id',
	                templateUrl: templateDir + 'course/pay.html'
	            })
	            //course-myCourse
	            .state('course.myCourse',{
	                url:'/myCourse',
	                templateUrl: templateDir + 'course/myCourse.html'
	            })
	            //course.schoolDetail
	            .state('course.schoolDetail',{
	                url:'/schoolDetail/:id',
	                templateUrl: templateDir + 'course/schoolDetail.html'
	            })
	            //course.schoolCourse
	            .state('course.schoolCourse',{
	                url:'/schoolCourse/:id',
	                templateUrl: templateDir + 'course/schoolCourse.html'
	            })
	            //distribution
	            .state('distribution',{
	                abstract: true,
	                url:'/distribution',
	                template: '<div ui-view></div>'
	            })
	            //distribution-index
	            .state('distribution.index',{
	                url:'/index',
	                templateUrl: templateDir + 'distribution/index.html',
	                resolve: load(['jquery-qrcode'])
	            })
	            //distribution-singup
	            .state('distribution.singup',{
	                url:'/singup/:type',
	                templateUrl: templateDir + 'distribution/singup.html'
	            })
	            //distribution-group
	            .state('distribution.group',{
	                url:'/group',
	                templateUrl: templateDir + 'distribution/group.html',
	                resolve: load(['jquery-qrcode'])
	            })
	            //distribution-center
	            .state('distribution.center',{
	                url:'/center',
	                templateUrl: templateDir + 'distribution/center.html'
	            })
	            //distribution-products
	            .state('distribution.products',{
	                url:'/products',
	                templateUrl: templateDir + 'distribution/products.html'
	            })
	            //distribution-sale
	            .state('distribution.sale',{
	                url:'/sale/:type',
	                templateUrl: templateDir + 'distribution/sale.html'
	            })
	            //distribution-principal
	            .state('distribution.principal',{
	                url:'/principal',
	                templateUrl: templateDir + 'distribution/principal.html'
	            })
	            //distribution-help
	            .state('distribution.help',{
	                url:'/help',
	                templateUrl: templateDir + 'distribution/help.html'
	            })
	            
	            //common
	            .state('common',{
	                abstract: true,
	                url:'/common',
	                template: '<div ui-view style="height:100%"></div>'
	            })
	            //common-setPhone
	            .state('common.setPhone',{
	                url:'/setPhone/:type',
	                templateUrl: templateDir + 'common/setPhone.html'
	            })
	            //common-pay
	            .state('common.pay',{
	                url:'/pay/:type',
	                templateUrl: templateDir + 'common/pay.html'
	            })
	            //activity
	            .state('activity',{
	                abstract: true,
	                url:'/activity',
	                template: '<div ui-view style="height:100%"></div>'
	            })
	            //common-pay
	            .state('activity.childrenVideo',{
	                url:'/childrenVideo',
	                templateUrl: templateDir + 'activity/childrenVideo.html'
	            })


	        // $locationProvider.html5Mode(true);

	        function load(srcs, callback) {
	            return {
	                deps: ['$ocLazyLoad', '$q',
	                    function($ocLazyLoad, $q) {
	                        var deferred = $q.defer();
	                        var promise = false;
	                        srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
	                        if (!promise) {
	                            promise = deferred.promise;
	                        }
	                        angular.forEach(srcs, function(src) {
	                            promise = promise.then(function() {
	                                if (JQ_CONFIG[src]) {
	                                    return $ocLazyLoad.load(JQ_CONFIG[src]);
	                                }
	                                angular.forEach(MODULE_CONFIG, function(module) {
	                                    if (module.name == src) {
	                                        name = module.name;
	                                    } else {
	                                        name = src;
	                                    }
	                                });
	                                return $ocLazyLoad.load(name);
	                            });
	                        });
	                        deferred.resolve();
	                        return callback ? promise.then(function() {
	                            return callback();
	                        }) : promise;
	                    }
	                ]
	            }
	        }
	    }
	]);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5)
	__webpack_require__(7)
	__webpack_require__(8)
	__webpack_require__(9)

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var url = __webpack_require__(6);

	angular.module('YApp').factory('wxsdkService', ['httpService', 'cacheService', function(httpService, cacheService) {
	    return {
	        init: function(params) {
	            var params = params || {};
	            params = angular.extend({
	                method: 'com.wechat.config.jssdk.init',
	                activityId: cacheService.activityId.get(),
	                url: window.location.href.split('#')[0]
	            }, params);
	            return httpService.request(url.campaign, 'GET', params);
	        },
	        getLocation: function( success ) {
	            wx.getLocation({
	                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
	                success: function(res) {
	                    // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
	                    // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
	                    // var speed = res.speed; // 速度，以米/每秒计
	                    // var accuracy = res.accuracy; // 位置精度
	                	success && success(res)
	                }
	            });
	        },
	        openLocation:function( params ){
	            wx.openLocation({
	                latitude: params.lat, // 纬度，浮点数，范围为90 ~ -90
	                longitude: params.lon, // 经度，浮点数，范围为180 ~ -180。
	                name: params.name || '', // 位置名
	                address: params.address || '', // 地址详情说明
	                scale: params.scale || 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
	                infoUrl: params.infoUrl || '' // 在查看位置界面底部显示的超链接,可点击跳转
	            });
	        },
	        //分享朋友
	        shareAppMessage: function(options) {
	            wx.onMenuShareAppMessage({
	                title: options.title, // 分享标题
	                link: options.link, // 分享链接
	                imgUrl: options.imgUrl, // 分享图标
	                desc: options.desc, // 分享描述
	                type: 'link', // 分享类型,music、video或link，不填默认为link
	                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	                success: function() {
	                    // 用户确认分享后执行的回调函数
	                    // wx.closeWindow();
	                    options.success && options.success()
	                },
	                cancel: function(e) {
	                    // 用户取消分享后执行的回调函数
	                    options.cancel && options.cancel()
	                }
	            });
	        },
	        //分享朋友圈
	        shareTimeline: function(options) {
	            wx.onMenuShareTimeline({
	                title: options.title, // 分享标题
	                link: options.link, // 分享链接
	                imgUrl: options.imgUrl, // 分享图标
	                success: function() {
	                    // 用户确认分享后执行的回调函数
	                    // wx.closeWindow();
	                    options.success && options.success()
	                },
	                cancel: function() {
	                    // 用户取消分享后执行的回调函数
	                    options.cancel && options.cancel()
	                }
	            });
	        },
	        previewImage : function(params){
	            wx.previewImage({
	                current: params.current, // 当前显示图片的http链接
	                urls: params.urls || [params.current] // 需要预览的图片http链接列表
	            });
	        }
	    }
	}])

/***/ },
/* 6 */
/***/ function(module, exports) {

	var ENV = "pro";
	//http://gf.api.iqixue.com
	//http://go.4001583721.cn
	var baseUrl = (ENV === "pro") ? "http://gf.api.iqixue.com" :
		(ENV === "test") ? "http://gf.api.4001583721.cn" : "http://localhost:5003";

	var wechatId = (ENV === "pro") ? "567ca3554574cd47633b2c4c" :
		(ENV === "test") ? "56efa0bff5bdb0ec30d6e4b8" : "56efa0bff5bdb0ec30d6e4b8";

	var courseCategoryId = "56f4b6c40ba3fa232c12eee2";

	var proUrlConfig = {
		campaign: baseUrl + '/v1/rest',
		course: baseUrl + '/v1/rest',
	    school: baseUrl + '/v1/rest',
	    distribution: baseUrl + '/v1/rest',
	    wechatId: wechatId,
	    courseCategoryId: courseCategoryId
	}

	module.exports =  proUrlConfig;


/***/ },
/* 7 */
/***/ function(module, exports) {

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

/***/ },
/* 8 */
/***/ function(module, exports) {

	angular.module('YApp').factory('toolsService',['$rootScope', function($rootScope){
		return {
		    isWechat : function(){  
			    var ua = navigator.userAgent.toLowerCase();  
			    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
			        return true;  
			    } else {  
			        return false;  
			    }  
			},  
			checkPhone : function( phone ){
				return /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/.test(phone);
			},
			getUrlParam : function(name){
				name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");  
				var regexS = "[\\?&]" + name + "=([^&#]*)";  
				var regex = new RegExp(regexS);  
				var results = regex.exec(window.location.hash);  
				if(results == null)  
				return "";  
				else  
				return decodeURIComponent(results[1].replace(/\+/g, " "));  
			},  
			setTitleForIphone : function( title ){
				$('title').text(title);
				var $iframe = $('<iframe src="/favicon.ico" style="display:none"></iframe>');
	            $iframe.on('load',function() {
	              setTimeout(function() {
	                  $iframe.off('load').remove();
	              }, 0);
	            }).appendTo( $('body') );
			},
			fixBodyHeight : function(){
				angular.element('body').height(angular.element('html')[0].offsetHeight)
			},
			/*
				@return
				false 已结束
			*/
			calculationCountdown : function( date ){
	            var date = parseInt(date,10),
	            	now = parseInt( new Date().getTime()/1000, 10),
	            	day,
	            	hour,
	            	minute,
	            	second;
	            if( now >= date ){
	            	return false; 
	            }else{
	            	date = date-now;
					day = parseInt( date/86400, 10);
	                hour = parseInt( (date%86400)/3600, 10);
	                minute = parseInt( ((date%86400)%3600)/60, 10);
	                second = parseInt( ((date%86400)%3600)%60, 10);
	                return [
						day,
	                	hour,
	                	(minute<10) ? ('0'+minute) : minute,
	                	(second<10) ? ('0'+second) : second
	                ];
	            }
			}
		}
	}]); 

/***/ },
/* 9 */
/***/ function(module, exports) {

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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(11);
	//活动
	__webpack_require__(12);
	//课程
	__webpack_require__(13);
	//机构
	__webpack_require__(14);
	//会员
	__webpack_require__(15)

/***/ },
/* 11 */
/***/ function(module, exports) {

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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var url = __webpack_require__(6);

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

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var url = __webpack_require__(6);

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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var url = __webpack_require__(6);

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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var url = __webpack_require__(6);

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

/***/ },
/* 16 */
/***/ function(module, exports) {

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



/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(18)
	__webpack_require__(23)
	__webpack_require__(29)
	__webpack_require__(37)
	__webpack_require__(161)



/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(19);
	__webpack_require__(21);
	__webpack_require__(22);


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('wechatErrorCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    'toolsService',
	    function($rootScope, $scope, $state, toolsService) {
	        $rootScope.pageLoading = false;
	        toolsService.setTitleForIphone("请在微信打开");
	    }
	]);

/***/ },
/* 20 */
/***/ function(module, exports) {

	var link = {
		//dev
		// campaign: 'http://gf.api.4001583721.cn/event?id=56f4f4ac944a127959485b85',
		// course: 'http://gf.api.4001583721.cn/event?id=56f4e097a69d5e0d559ee0c8',
		// distribution: 'http://gf.api.4001583721.cn/event?id=5731df1738bfe9041ce97668',
		// distributionCenter : 'http://gf.api.4001583721.cn/event?id=5732a21cdcb2d207274eaa1b',
		// distributionPrincipal: 'http://gf.api.4001583721.cn/event?id=5745741dc7bff22452bef16c'
		//pro
		campaign:'http://wechat.iqixue.com/event?id=56d41a965c5595a503765227',
		course:'http://wechat.iqixue.com/event?id=56fced05e385105c15b3fb40',
		distribution: 'http://wechat.iqixue.com/event?id=57382a540d5c383d1af424f7',
		distributionCenter: 'http://wechat.iqixue.com/event?id=5738286d4707c5a819aee6bb',
		distributionPrincipal: 'http://wechat.iqixue.com/event?id=574670a5377b1b51057d2fb4'
	}

	module.exports =  link;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('commonPayCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'cacheService',
	    'toolsService',
	    'wxsdkService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, cacheService, toolsService, wxsdkService) {
	        var userInfo = cacheService.userInfo.get();

	        $rootScope.pageLoading = false;
	        toolsService.setTitleForIphone("微信安全支付");
	        $scope.payResult = false;
	        $scope.orderType = $stateParams.type;

	        $scope.pay = function() {
	            if (typeof WeixinJSBridge == "undefined") {
	                if (document.addEventListener) {
	                    document.addEventListener('WeixinJSBridgeReady', callPay, false);
	                } else if (document.attachEvent) {
	                    document.attachEvent('WeixinJSBridgeReady', callPay);
	                    document.attachEvent('onWeixinJSBridgeReady', callPay);
	                }
	            } else {
	                callPay();
	            }
	        }

	        function callPay() {
	            var self = $scope;
	            WeixinJSBridge.invoke(
	                'getBrandWCPayRequest', {
	                    "appId": self.orderInfo.wechat.appId,
	                    "timeStamp": self.orderInfo.wechat.timeStamp,
	                    "nonceStr": self.orderInfo.wechat.nonceStr,
	                    "package": self.orderInfo.wechat.package,
	                    "signType": self.orderInfo.wechat.signType,
	                    "paySign": self.orderInfo.wechat.paySign
	                },
	                function(res) {
	                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
	                    if (res.err_msg == "get_brand_wcpay_request:ok") {
	                        // cacheService.campaignOrder.remove();
	                        // cacheService.courseOrder.remove();
	                        if( self.orderType === 'distribution' ){
	                            $state.go('distribution.group');
	                        }
	                        $timeout(function() {
	                            self.payResult = true;
	                        })
	                    } else {

	                    }
	                }
	            );
	        }

	        function initOrderInfo() {
	            var self = $scope,
	                orderType = self.orderType;
	            self.orderInfo = cacheService[orderType+'Order'].get();
	        }

	        function init() {
	            var self = $scope;
	            if( userInfo.type>2 && self.orderType === 'distribution' ){
	                $state.go('distribution.index');
	            }else{
	                initOrderInfo();
	            }
	        }

	        init();
	    }
	]);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('commonSetPhoneCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$interval',
	    'courseModel',
	    'cacheService',
	    'toolsService',
	    'wxsdkService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $interval, courseModel, cacheService, toolsService, wxsdkService) {
	        var courseModel = new courseModel();
	        
	        toolsService.setTitleForIphone("课程报名");
	        $("title").text("课程报名");

	        $rootScope.isPageMinCover = true;
	        $rootScope.pageLoading = false;

	        $scope.phone='';
	        $scope.entered = false;
	        $scope.sended = false;
	        $scope.timerText = "发送";
	        $scope.code = "";

	        $scope.hideFooter = 1;
	        $scope.pageHeight = 100;
	        $scope.sendCode = sendCode;

	        $scope.verificationPhone = function(){
	            var self = $scope,
	                type = $stateParams.type,
	                orderInfo = null;
	            if( !toolsService.checkPhone(self.phone) ){
	                alert("请输入正确的手机号");
	                return false;
	            }
	            if( type === 'course' ){
	                orderInfo = cacheService.courseOrder.get();
	                orderInfo.mobile = self.phone;
	                cacheService.courseOrder.set(orderInfo);
	            }else if( type === 'campaign'){
	                orderInfo = cacheService.campaignOrder.get();
	                orderInfo.mobile = self.phone;
	                cacheService.campaignOrder.set(orderInfo);
	            }
	            $scope.entered = true;
	            sendCode();
	        }

	        function sendCode(){
	            var self = $scope,
	                timerNum = 60,
	                timerPromise;

	            if( self.sended ){
	                return false;
	            }

	            courseModel.sendPhoneMsg({
	                mobile:self.phone
	            }).then(function(response){
	                if( response && response.errcode===0 ){
	                    self.sended = true;
	                    timerPromise = $interval(function(){
	                        self.timerText = "重发("+timerNum--+")";
	                        if( timerNum===-1 ){
	                            $interval.cancel( timerPromise );
	                            self.sended = false;
	                            self.timerText = "重发";
	                        }
	                    },1000)
	                }else{
	                    alert("短信发送失败，请重发");
	                    self.sended = false;
	                    self.timerText = "重发";
	                }
	            });
	        }

	        $scope.verificationCode = function(){
	            var self = $scope,
	                type = $stateParams.type;
	            if( !self.code ){
	                alert("请输入验证码");
	                return false;
	            }
	            courseModel.verificationCode({
	                mobile:self.phone,
	                code:self.code
	            }).then(function(response){
	                if( response && response.errcode===0 ){
	                    if( type==='course' ){
	                        $state.go('course.order');
	                    }else{
	                        $state.go('campaign.question');
	                    }
	                }else{
	                    alert("验证码错误，请重新输入")
	                }
	            });
	        }

	    }
	]);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	//活动列表
	__webpack_require__(24);
	//活动详情
	__webpack_require__(25);
	//我的活动
	__webpack_require__(26);
	//活动下订单
	__webpack_require__(27);
	//活动问卷表单
	__webpack_require__(28);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('campaignListCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'campaignModel',
	    'cacheService',
	    'toolsService',
	    'wxsdkService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, campaignModel, cacheService, toolsService, wxsdkService) {
	        var campaignModel = new campaignModel(),
	            location = cacheService.location.get() || {
	                lat:31.29607,
	                lon:121.4961,
	                city:'上海市'
	            },
	            timer;

	        $("#J_campaignList").css('minHeight',$(document.body)[0].scrollHeight);
	        
	        toolsService.setTitleForIphone("找活动");

	        $scope.nowTime = parseInt( new Date().getTime()/1000, 10);

	        $scope.pageConfig = {
	            start : 1,
	            limit : 5,
	            showLoading:true,
	            loadingText:'努力加载中...',
	            loadingProcess:true,
	            scrollAble:false,
	            hasNoData:false
	        }

	        $scope.listShow = 2;
	        $scope.timeShow = false;
	        $scope.campaign = [];
	        $scope.getCampaignList = getCampaignList;

	        $scope.personInfo = {
	            userId : toolsService.getUrlParam('userId'),
	            avatar : toolsService.getUrlParam('avatar')
	        }

	        // 开始时间倒计时
	        function getDate(){
	            var self = $scope,
	                date = parseInt( new Date().getTime()/1000, 10),
	                timerEle = $("#J_campaignList").find(".time"),
	                day,
	                hour,
	                minute,
	                second;
	            for(var i=0;i<self.campaign.length;i++){
	                var d = parseInt(self.campaign[i].overTime,10)-date;
	                if(d<=0){
	                    timerEle.eq(i).text("报名已截止，下次再约啦~");
	                }else{
	                    day = parseInt( d/86400, 10);
	                    hour = parseInt( (d%86400)/3600, 10);
	                    minute = parseInt( ((d%86400)%3600)/60, 10);
	                    second = parseInt( ((d%86400)%3600)%60, 10);
	                    timerEle.eq(i).text("报名截止: 剩余"+day+"天"+hour+"小时"+minute+"分"+second+"秒");
	                }
	            }
	        }

	        function getCampaignList(number){
	            var self = $scope;
	            window.clearInterval(timer);
	            self.campaign = [];
	            self.listShow = number;
	            self.pageConfig.loadingProcess = true;
	            self.pageConfig.start = 1;
	            self.pageConfig.loadingText = '努力加载中...'
	            self.pageConfig.showLoading = true;
	            self.pageConfig.hasNoData = false;
	            getList();
	        }

	        function getList(){
	            var self = $scope;
	            if(self.listShow==1){
	                campaignModel.recommendList({
	                    id : $stateParams.id,
	                    start : self.pageConfig.start,
	                    limit : self.pageConfig.limit
	                }).then(function( response ){
	                    // response();
	                    if( response && response.data ){
	                        self.campaign = !self.pageConfig.loadingProcess ? self.campaign.concat(response.data) : response.data;
	                        self.timeShow = true;
	                        self.pageConfig.loadingProcess = false;
	                        self.pageConfig.showLoading = response.data.length<self.pageConfig.limit;
	                        self.pageConfig.hasNoData = response.data.length<self.pageConfig.limit;
	                        self.pageConfig.scrollAble = response.data.length===self.pageConfig.limit;
	                        if( !self.pageConfig.scrollAble ){
	                            self.pageConfig.loadingText = '没有更多了...';
	                        }else{
	                            self.pageConfig.loadingText = '努力加载中...';
	                        }
	                    }else{
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.loadingText = '网络错误，请刷新再试...'
	                    }
	                },function(){

	                });
	            }
	            if(self.listShow==2){
	                campaignModel.hostList({
	                    id : $stateParams.id,
	                    start : self.pageConfig.start,
	                    limit : self.pageConfig.limit
	                }).then(function( response ){
	                    $timeout(function(){
	                        $rootScope.pageLoading = false;
	                    });
	                    // response();
	                    if( response && response.data ){
	                        self.campaign = !self.pageConfig.loadingProcess ? self.campaign.concat(response.data) : response.data;
	                        self.timeShow = true;
	                        self.pageConfig.loadingProcess = false;
	                        self.pageConfig.showLoading = response.data.length<self.pageConfig.limit;
	                        self.pageConfig.hasNoData = response.data.length<self.pageConfig.limit;
	                        self.pageConfig.scrollAble = response.data.length===self.pageConfig.limit;
	                        if( !self.pageConfig.scrollAble ){
	                            self.pageConfig.loadingText = '没有更多了...';
	                        }else{
	                            self.pageConfig.loadingText = '努力加载中...';
	                        }
	                    }else{
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.loadingText = '网络错误，请刷新再试...'
	                    }
	                },function(){

	                });
	            }
	            if(self.listShow==3){
	                campaignModel.nearList({
	                    id : $stateParams.id,
	                    start : self.pageConfig.start,
	                    limit : self.pageConfig.limit,
	                    lat : location.lat,
	                    lon : location.lon,
	                    city : location.city
	                }).then(function( response ){
	                    // response();
	                    if( response && response.data ){
	                        self.campaign = !self.pageConfig.loadingProcess ? self.campaign.concat(response.data) : response.data;
	                        self.timeShow = true;
	                        self.pageConfig.loadingProcess = false;
	                        self.pageConfig.showLoading = response.data.length<self.pageConfig.limit;
	                        self.pageConfig.hasNoData = response.data.length<self.pageConfig.limit;
	                        self.pageConfig.scrollAble = response.data.length===self.pageConfig.limit;
	                        if( !self.pageConfig.scrollAble ){
	                            self.pageConfig.loadingText = '没有更多了...';
	                            self.pageConfig.loadingProcess = true;
	                        }else{
	                            self.pageConfig.loadingText = '努力加载中...';
	                        }
	                    }else{
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.loadingText = '网络错误，请刷新再试...'
	                    }
	                },function(){

	                });
	            }
	            $timeout(function(){
	                timer=setInterval(getDate,1000);
	            },500);
	        }

	        function bindEvents(){
	            var self = $scope,
	                win = window,
	                body = document.body;
	            $(win).bind('scroll',function(){
	                // console.log( win.scrollY, win.innerHeight, body.offsetHeight);
	                //滚动加载
	                if( win.scrollY + win.innerHeight >= body.offsetHeight - 60){
	                    if( self.pageConfig.scrollAble && !self.pageConfig.loadingProcess ){
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.start++;
	                        getList();
	                    }
	                }
	            });
	        } 

	        $scope.$on('$destroy',function() {  
	            $(window).unbind('scroll');
	        }); 

	        $scope.openCampaignDetail = function(id){
	            var self = $scope;
	            window.clearInterval(timer);
	            self.campaign = [];
	            $state.go('campaign.detail',{id:id});
	        }

	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'孩子周末去哪儿？',
	                link:link.campaign,
	                desc:'在学习中玩耍，找翼起学！百个教育活动任你选',
	                imgUrl:'http://cdn.4001583721.com/share.jpg',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'孩子周末去哪儿？',
	                link:link.campaign,
	                imgUrl:'http://cdn.4001583721.com/share.jpg',
	                success:function(){}
	             });
	        }

	        function init(){
	            bindEvents();
	            getList();
	            wx.ready(function(){
	                initShare();
	            });
	        }

	        init();
	        
	    }
	]);

	angular.module("YApp").controller('campaignCenterNav', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'cacheService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, cacheService) {
	        $scope.showNav = false;
	        $scope.link = link;
	        $scope.userInfo = cacheService.userInfo.get();
	    }
	]);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('campaignDetailCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'campaignModel',
	    'toolsService',
	    'wxsdkService',
	    'cacheService',
	    'toolsService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, campaignModel, toolsService, wxsdkService, cacheService, toolsService) {
	        var campaignModel = new campaignModel(),
	            userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get(),
	            shareLink = link.campaign+',campaign/detail/'+$stateParams.id+(userInfo.isMember ? ','+userId : ''),
	            timer;
	        
	        $("#J_campaignDetail").css('minHeight',$(document.body)[0].scrollHeight);

	        $scope.userInfo = userInfo;
	        $scope.shareLink = shareLink;
	        $scope.campaign = {
	            name : "",       //活动名
	            description : "",    //活动简介
	            cover : "",      //活动图标
	            poster : "",
	            video : "",
	            sponsor : "", //主办方
	            startTime : "",  //开始时间
	            endTime : "",    //结束时间
	            overTime: "", //报名截止时间
	            address : "",    //详细地址
	            personName : "",    //负责人姓名
	            phone : "",     //负责人电话
	            images : []     //活动照片，多张图片拼成路径字符串，逗号分隔,
	        };

	        $scope.campaignOrder = {
	            campaignId:$stateParams.id,
	            mobile:'',
	        }

	        $scope.campaignIsOver = false;
	        //view
	        $scope.imageShow = 2;// 2有两张及以上活动图片；1有一张活动图片；0没有活动图片

	        function get(){
	            var self = $scope;
	            campaignModel.detail({
	                id : $stateParams.id,
	                userId : cacheService.userId.get()
	            }).then(function( response ){
	                $timeout(function(){
	                    $rootScope.pageLoading = false;
	                });
	                self.campaign = response.campaign;
	                self.campaign.school = response.school;
	                self.campaign.minPrice = response.price;
	                self.campaignOrder.mobile = response.mobile;
	                self.campaign.overTime = self.campaign.overTime || self.campaign.endTime;
	                self.campaignIsOver = self.campaign.overTime <= parseInt( new Date().getTime()/1000, 10);

	                !self.campaignIsOver && initCalculationCountdown();

	                toolsService.setTitleForIphone(response.name);

	                if(self.campaign.images.length>=1){
	                    self.imageShow = 2;
	                    initSlider();
	                }else{
	                    self.imageShow = 0;
	                }
	                wx.ready(function(){
	                    initShare();
	                });
	                window.scrollTo(0,0);

	            },function(){

	            });
	        }

	        function initSlider(){
	            var data = [];
	            for(var i=0;i<$scope.campaign.images.length;i++){
	                var html = '<img src="'+$scope.campaign.images[i]+'?imageView2/1/w/750/h/400/q/100">';
	                data.push({
	                    content:html
	                });
	            }
	            if(data.length>4){
	                data = data.slice(0,5);
	            }
	            var islider = new iSlider({
	                dom : document.getElementById('J_sliderWraper'),
	                type:"dom",
	                data : data,
	                duration : 5000,
	                isLooping : true,
	                isAutoplay : true,
	                fixPage : false
	            });

	            islider.addDot();
	        }

	        $scope.singup = function(){
	            var self = $scope;
	            cacheService.campaignOrder.set(self.campaignOrder);
	            // if(!self.campaignOrder.mobile){
	            //     $state.go('common.setPhone',{type:'campaign'});
	            // }else{
	            //     $state.go('campaign.order');
	            // }
	            $state.go('order');
	        }

	        function initShare(){
	            var self = $scope;
	            wxsdkService.shareAppMessage({
	                title:self.campaign.name,
	                link:shareLink,
	                desc:'在学习中玩耍，找翼起学！百个教育活动任你选',
	                imgUrl:(self.campaign.images[0] || self.campaign.cover)+'?imageView2/1/w/400/h/400/q/80',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:self.campaign.name,
	                link:shareLink,
	                imgUrl:(self.campaign.images[0] || self.campaign.cover)+'?imageView2/1/w/400/h/400/q/80',
	                success:function(){}
	            });
	        }

	        function initCalculationCountdown(){
	            var self = $scope,
	                date,
	                overTime = self.campaign.overTime,
	                timerEle = document.getElementById("J_timer")
	            timer = setInterval(function(){
	                date = toolsService.calculationCountdown(overTime);
	                if(!date){
	                    $timeout(function(){
	                        self.campaignIsOver = true;
	                        clearInterval(timer);
	                    })
	                }else{
	                    timerEle.innerHTML = ('离报名结束还有'+date[0]+'天'+date[1]+'小时'+date[2]+'分'+date[3]+'秒')
	                }
	            },1000)
	        }

	        $scope.openLocation = function(){
	            var self = $scope;
	            wxsdkService.openLocation({
	                lat:self.campaign.location[1],
	                lon:self.campaign.location[0],
	                name:self.campaign.name,
	                address:self.campaign.address
	            })
	        }

	        function init(){
	            window.scrollTo(0,0);
	            get();
	        }

	        init();
	    }
	]);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('myCampaignCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'campaignModel',
	    'courseModel',
	    'toolsService',
	    'cacheService',
	    'wxsdkService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, campaignModel, courseModel, toolsService, cacheService, wxsdkService) {
	        toolsService.setTitleForIphone("我的活动");
	        var campaignModel = new campaignModel(),
	            courseModel = new courseModel();
	        
	        $timeout(function(){
	            $rootScope.pageLoading = false;
	        });

	        $scope.pageConfig = {
	            start : 1,
	            limit : 5,
	            showLoading:true,
	            loadingText:'努力加载中...',
	            loadingProcess:true,
	            scrollAble:false,
	            hasNoData:false
	        }

	        $scope.listShow = 1;
	        $scope.collect = [];
	        $scope.courseOrder = [];
	        $scope.campaignOrder = [];

	        $scope.getList = function(number){
	            var self = $scope;
	            self.collect = [];
	            self.courseOrder = [];
	            self.campaignOrder = [];
	            self.pageConfig.start = 1;
	            self.listShow = number;
	            getMyList();
	        }

	        function getMyList(){
	            var self = $scope;
	            if(self.listShow==1){
	                getMyCampaignOrderList();
	            }
	            if(self.listShow==2){
	                getMyCourseOrderList();
	            }
	            if(self.listShow==3){
	                getCourseCollect();
	            }
	        }

	        function getMyCampaignOrderList(){
	            var self = $scope;
	            campaignModel.myCampaign({
	                userId : cacheService.userId.get(),
	                limit : self.pageConfig.limit,
	                start : self.pageConfig.start
	            }).then(function( response ){
	                $timeout(function(){
	                    $rootScope.pageLoading = false;
	                });
	                if( response && response.length>-1 ){
	                    self.campaignOrder = !self.pageConfig.loadingProcess ? self.campaignOrder.concat(response) : response;
	                    campaignComputeData(self.campaignOrder);
	                    self.pageConfig.loadingProcess = false;
	                    self.pageConfig.showLoading = response.length<self.pageConfig.limit;
	                    self.pageConfig.hasNoData = response.length<self.pageConfig.limit;
	                    self.pageConfig.scrollAble = response.length===self.pageConfig.limit;
	                    if( !self.pageConfig.scrollAble ){
	                        self.pageConfig.loadingText = '没有更多了~~';
	                    }else{
	                        self.pageConfig.loadingText = '努力加载中...';
	                    }
	                }else{
	                    self.pageConfig.showLoading = true;
	                    self.pageConfig.loadingText = '网络错误，请刷新再试...';
	                }
	            },function(){

	            });
	        }

	        function getMyCourseOrderList(){
	            var self = $scope;
	            courseModel.userOrder({
	                userId:cacheService.userId.get(),
	                limit : self.pageConfig.limit,
	                start : self.pageConfig.start
	            }).then(function(response){
	                $timeout(function(){
	                    $rootScope.pageLoading = false;
	                });
	                if( response && response.length>-1 ){
	                    self.courseOrder = !self.pageConfig.loadingProcess ? self.courseOrder.concat(response) : response;
	                    courseComputeData( self.courseOrder );
	                    self.pageConfig.loadingProcess = false;
	                    self.pageConfig.showLoading = response.length<self.pageConfig.limit;
	                    self.pageConfig.hasNoData = response.length<self.pageConfig.limit;
	                    self.pageConfig.scrollAble = response.length===self.pageConfig.limit;
	                    if( !self.pageConfig.scrollAble ){
	                        self.pageConfig.loadingText = '没有更多了~~';
	                    }else{
	                        self.pageConfig.loadingText = '努力加载中...';
	                    }
	                }else{
	                    self.pageConfig.showLoading = true;
	                    self.pageConfig.loadingText = '网络错误，请刷新再试...';
	                }
	            },function(error){
	                console.log(error)
	            });
	        }

	        function getCourseCollect(){
	            var self = $scope;
	            courseModel.userFavorite({
	                userId:cacheService.userId.get(),
	                limit : self.pageConfig.limit,
	                start : self.pageConfig.start
	            }).then(function(response){
	                if( response && response.length>-1 ){
	                    self.collect = !self.pageConfig.loadingProcess ? self.collect.concat(response) : response;
	                    self.pageConfig.loadingProcess = false;
	                    self.pageConfig.showLoading = response.length<self.pageConfig.limit;
	                    self.pageConfig.hasNoData = response.length<self.pageConfig.limit;
	                    self.pageConfig.scrollAble = response.length===self.pageConfig.limit;
	                    if( !self.pageConfig.scrollAble ){
	                        self.pageConfig.loadingText = '没有更多了~~';
	                    }else{
	                        self.pageConfig.loadingText = '努力加载中...';
	                    }
	                }else{
	                    self.pageConfig.showLoading = true;
	                    self.pageConfig.loadingText = '网络错误，请刷新再试...';
	                }
	            },function(error){
	                console.log(error)
	            });
	        }

	        //活动付款倒计时
	        function campaignComputeData( data ){
	            var self = $scope;
	            for( var i=0; i<data.length; i++){
	                if( data[i].trade.status===1 ){
	                    data[i].trade.over = 0;
	                    if( moment().diff(moment(data[i].trade.created*1000)) > 7200000 ){
	                        data[i].trade.over = 0;
	                    }else{
	                        data[i].trade.over = 1;
	                    }
	                }
	            }
	            $timeout(function(){
	                self.campaignOrder = data;
	                var campaignTimes = window.setInterval(campaignGetTime,1000);
	            })
	        }

	        function campaignGetTime(){
	            var self = $scope;
	            var timer = [];
	            var date = new Date().getTime();
	            var date = parseInt(date/1000);
	            for(var t=0;t<self.campaignOrder.length;t++){
	                var time = 7200-(date-self.campaignOrder[t].trade.created);
	                var hour = parseInt(time/3600);
	                var minute = parseInt((time%3600)/60);
	                var text = "未付款 请于"+hour+"小时"+minute+"分钟内完成付款"
	                $(".campaignCountDown").find(".timer").eq(t).text(text);
	                if(time<0){
	                    timer.push(time);
	                    if(timer.length<1){
	                        window.clearInterval(campaignTimes);
	                    }
	                }
	            }
	        }

	        //课程付款倒计时
	        function courseComputeData( data ){
	            var self = $scope;
	            for( var i=0; i<data.length; i++){
	                if( data[i].trade.status===1 ){
	                    data[i].trade.over = 0;
	                    if( moment().diff(moment(data[i].trade.created*1000)) > 7200000 ){
	                        data[i].trade.over = 0;
	                    }else{
	                        data[i].trade.over = 1;
	                    }
	                }
	            }
	            $timeout(function(){
	                self.courseOrder = data;
	                var courseTimes = window.setInterval(courseGetTime,1000);
	            })
	        }

	        function courseGetTime(){
	            var self = $scope;
	            var timer = [];
	            var date = new Date().getTime();
	            var date = parseInt(date/1000);
	            for(var t=0;t<self.courseOrder.length;t++){
	                var time = 7200-(date-self.courseOrder[t].trade.created);
	                var hour = parseInt(time/3600);
	                var minute = parseInt((time%3600)/60);
	                var text = "未付款 请于"+hour+"小时"+minute+"分钟内完成付款"
	                $(".courseCountDown").find(".timer").eq(t).text(text);
	                if(time<0){
	                    timer.push(time);
	                    if(timer.length<1){
	                        window.clearInterval(courseTimes);
	                    }
	                }
	            }
	        }

	        function bindEvents(){
	            var self = $scope,
	                win = window,
	                body = document.body;
	            $(win).bind('scroll',function(){
	                // console.log( win.scrollY, win.innerHeight, body.offsetHeight);
	                //滚动加载
	                if( win.scrollY + win.innerHeight >= body.offsetHeight - 60){
	                    if( self.pageConfig.scrollAble && !self.pageConfig.loadingProcess ){
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.start++;
	                        getMyList();
	                    }
	                }
	            });
	        } 

	        $scope.$on('$destroy',function() {  
	            $(window).unbind('scroll');
	        }); 

	        $scope.payAgain = function( item,type ){
	            var self = $scope;
	            if(type==='course'){
	                courseModel.payAgain({
	                    _id : item.trade._id
	                }).then(function( response ){
	                    cacheService.courseOrder.set(response);
	                    location = location.protocol+"//"+location.host+'/index.html#/common/pay/course';
	                    location.reload();
	                },function(){

	                });
	            }
	            if(type==='campaign'){
	                campaignModel.payAgain({
	                    _id : item.trade._id
	                }).then(function( response ){
	                    cacheService.campaignOrder.set(response);
	                    // location.href = '/index.html#/campaignPay/1?showwxpaytitle=1'
	                    location = location.protocol+"//"+location.host+'/index.html#/common/pay/campaign';
	                    location.reload();
	                },function(){

	                });
	            }
	        } 

	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'孩子周末去哪儿？',
	                link:link.campaign,
	                desc:'在学习中玩耍，找翼起学！百个教育活动任你选',
	                imgUrl:'http://cdn.4001583721.com/share.jpg',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'孩子周末去哪儿？',
	                link:link.campaign,
	                imgUrl:'http://cdn.4001583721.com/share.jpg',
	                success:function(){}
	             });
	        }

	        function init(){
	            bindEvents();
	            wx.ready(function(){
	                initShare();
	            });
	            getMyList();
	        }

	        init();
	        
	    }
	]);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('campaignOrder', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'cacheService',
	    'wxsdkService',
	    'campaignModel',
	    'toolsService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, cacheService, wxsdkService, campaignModel, toolsService) {
	        var campaignModel = new campaignModel(),
	            campaignOrderInfo = cacheService.campaignOrder.get(),
	            campaignId = campaignOrderInfo.campaignId || campaignOrderInfo.order.campaignId,
	            userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get(),
	            shareLink = link.campaign+',campaign/detail/'+campaignId+(userInfo.isMember ? ','+userId : '');

	        $("#J_campaignOrder").css('minHeight',$(document.body)[0].scrollHeight);
	        
	        toolsService.setTitleForIphone("订单确认");

	        $rootScope.isPageMinCover = true;

	        $scope.currentTicketIndex = 0;

	        $scope.maxNum = 1;

	        $scope.order = {
	            userId: cacheService.userId.get(),
	            campaignId: campaignId,
	            num: 1,
	            mobile: campaignOrderInfo.mobile || (campaignOrderInfo.order?campaignOrderInfo.order.mobile:''),
	            price:0,
	            eTicketId:0
	        }

	        $scope.tipView = {
	            tip:false,
	            text:''
	        }

	        function getDetail() {
	            var self = $scope;
	            campaignModel.ticketList({
	                id: campaignId
	            }).then(function(response) {
	                $timeout(function() {
	                    $rootScope.pageLoading = false;
	                });
	                self.campaign = response.campaign;
	                self.ticketList = response.eTicket;
	                self.order.price = self.ticketList[0].price;
	                self.order.eTicketId = self.ticketList[0]._id;
	                self.maxNum = self.ticketList[0].remainder>=0?
	                                self.ticketList[0].remainder<10?self.ticketList[0].remainder:10
	                                :10;
	                self.order.num = self.ticketList[0].remainder===0?0:1;
	                wx.ready(function(){
	                    initShare();
	                });
	            }, function() {

	            });
	        }

	        // $scope.addOrder = function() {
	        //     var self = $scope;
	        //     if( self.maxNum===0 ){
	        //         return false;
	        //     }
	        //     if( self.order.mobile==='' ){
	        //         self.tipView.text = "请填写手机号码"
	        //         self.tipView.show = true;
	        //         $timeout(function(){
	        //           self.tipView.show = false;  
	        //         },1000)
	        //         return false;
	        //     }
	        //     if( self.order.name==='' ){
	        //         self.tipView.text = "请填写参与人姓名"
	        //         self.tipView.show = true;
	        //         $timeout(function(){
	        //           self.tipView.show = false;  
	        //         },1000)
	        //         return false;
	        //     }

	        //     campaignModel.order(self.order).then(function(response) {
	        //         if( response.order.price === 0 ){
	        //             alert('您已报名成功，报名详细信息已发送到您的手机上，谢谢');
	        //             $state.go('campaign.myCampaign');
	        //         }else{
	        //             response.order.mobile = campaignOrderInfo.mobile || campaignOrderInfo.order.mobile;
	        //             cacheService.campaignOrder.set(response);
	        //             location = location.protocol+"//"+location.host+'/index.html#/common/pay/campaign';
	        //             location.reload();
	        //         }
	        //     }, function() {
	        //         alert('提交订单失败')
	        //     });
	        // }

	        $scope.submit = function(){
	            var self = $scope;
	            if( self.maxNum===0 ){
	                self.tipView.text = "该票已售罄";
	                self.tipView.show = true;
	                $timeout(function(){
	                  self.tipView.show = false;  
	                },1000)
	                return false;
	            }
	            campaignOrderInfo.price = self.order.price;
	            campaignOrderInfo.num = self.order.num;
	            campaignOrderInfo.eTicketId = self.order.eTicketId;
	            cacheService.campaignOrder.set(campaignOrderInfo);
	            if(!self.order.mobile){
	                $state.go('common.setPhone',{type:'campaign'});
	            }else{
	                $state.go('campaign.question');
	            }
	        }

	        $scope.subNum = function() {
	            var self = $scope;
	            if (self.order.num > 1) {
	                self.order.num--;
	                self.order.price = self.ticketList[self.currentTicketIndex].price*self.order.num;
	            }
	        }

	        $scope.addNum = function() {
	            var self = $scope;
	            if (self.order.num < self.maxNum) {
	                self.order.num++;
	                self.order.price = self.ticketList[self.currentTicketIndex].price*self.order.num;
	            }
	        }

	        $scope.ticketSelect = function(index){
	            var self = $scope;
	            self.currentTicketIndex = index;
	            self.order.num = self.ticketList[index].remainder===0?0:1;
	            self.order.price = self.ticketList[index].price;
	            self.order.eTicketId = self.ticketList[index]._id;
	            self.maxNum = self.ticketList[index].remainder>=0?
	                                self.ticketList[index].remainder<10?self.ticketList[index].remainder:10
	                                :10;
	        }

	        function initShare(){
	            var self = $scope;
	            wxsdkService.shareAppMessage({
	                title:self.campaign.name,
	                link:shareLink,
	                desc:'在学习中玩耍，找翼起学！百个教育活动任你选',
	                imgUrl:self.campaign.cover+'?imageView2/1/w/400/h/400/q/80',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:self.campaign.name,
	                link:shareLink,
	                imgUrl:self.campaign.cover+'?imageView2/1/w/400/h/400/q/80',
	                success:function(){}
	             });
	        }

	        function init() {
	            getDetail();
	        }

	        init();
	    }
	]);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('campaignQuestionCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'campaignModel',
	    'toolsService',
	    'wxsdkService',
	    'cacheService',
	    'toolsService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, campaignModel, toolsService, wxsdkService, cacheService, toolsService) {
	        var campaignModel = new campaignModel(),
	            campaignOrderInfo = cacheService.campaignOrder.get(),
	            userInfo = cacheService.userInfo.get(),
	            campaignOrderInfo = cacheService.campaignOrder.get();
	        
	        $("#J_campaignDetail").css('minHeight',$(document.body)[0].scrollHeight);
	        toolsService.setTitleForIphone("填写参与人信息");

	        $scope.order = {
	            userId: cacheService.userId.get(),
	            campaignId: campaignOrderInfo.campaignId || campaignOrderInfo.order.campaignId,
	            num: campaignOrderInfo.num || campaignOrderInfo.order.num,
	            mobile: parseInt(campaignOrderInfo.mobile || campaignOrderInfo.order.mobile,10),
	            price: campaignOrderInfo.price!==undefined?campaignOrderInfo.price:campaignOrderInfo.order.price,
	            eTicketId: campaignOrderInfo.eTicketId || campaignOrderInfo.order.eTicketId,
	            sourceId : userInfo.sourceId,
	            answer:[]
	        }

	        $scope.questionList = [];
	        $scope.tipView = {
	            show:false,
	            text:''
	        }
	        $scope.saveStatus = {
	            text:$scope.order.num>1?"下一位参与人信息":'确认报名',
	            loading:false
	        }
	        $scope.questionForm = {}
	        $scope.submit = submit;
	        $scope.validateQuestion = validateQuestion;
	        $scope.editIndex = 0;

	        function questionList(){
	            var self = $scope;
	            campaignModel.questionList({
	                campaignId : campaignOrderInfo.campaignId || campaignOrderInfo.order.campaignId
	            }).then(function( response ){
	                $rootScope.pageLoading = false;
	                self.questionList = response.data;
	                setQuestionModel( self.questionList );
	            },function(){

	            });
	        }

	        function setQuestionModel( list ){
	            var self = $scope,
	                checkboxArray = [];
	            self.questionForm.name = '';
	            self.questionForm.mobile = self.order.mobile;
	            for(var i=0; i<list.length; i++){
	                if(list[i]['type']===1){
	                    self.questionForm[ list[i]['_id']+'_'+list[i]['type'] ] = list[i]['item'][0]['_id'];
	                }else if( list[i]['type']===2){
	                    for(var j=0; j<list[i]['item'].length; j++){
	                        checkboxArray.push('');
	                    }
	                    self.questionForm[ list[i]['_id']+'_'+list[i]['type'] ] = checkboxArray;
	                }else{
	                    self.questionForm[ list[i]['_id']+'_'+list[i]['type'] ] = '';
	                }
	            }
	        }

	        function validateQuestion(){
	            var self = $scope,
	                questionForm = self.questionForm,
	                temp = true;
	            for(var item in questionForm){
	                if( typeof questionForm[item]==='string' && questionForm[item]==='' ){
	                    temp = false;
	                }else if( typeof questionForm[item]==='object' && questionForm[item].join('').length===0){
	                    temp = false;
	                }
	            }
	            return temp;
	        }

	        function getAnswer(){
	            var self = $scope,
	                answerArray = [],
	                temp;

	            for( var item in self.questionForm){
	                if( item === 'name' ){
	                    answerArray.push({name:self.questionForm[item]});
	                }else if( item === 'mobile' ){
	                    answerArray.push({mobile:self.questionForm[item]});
	                }else{
	                    temp = {};
	                    temp.id = item.split('_')[0];
	                    temp.type = +item.split('_')[1];
	                    temp.value = typeof self.questionForm[item] === 'string' ? self.questionForm[item] : self.questionForm[item].join(',');
	                    answerArray.push( temp );
	                }
	            }

	            return answerArray;
	        }

	        function submit(myForm){
	            var self = $scope;
	            if(myForm.$invalid || !validateQuestion() || self.saveStatus.loading){
	                return false;
	            }
	            self.order.answer[self.editIndex] = getAnswer();
	            //多人数填写问卷
	            if( self.editIndex < self.order.num-1 ){
	                self.editIndex+=1;
	                setQuestionModel( self.questionList );
	                window.scrollTo(0,0);
	            }else{
	                self.saveStatus.text = '报名中...';
	                self.saveStatus.loading = true;
	                campaignModel.order(self.order).then(function(response) {
	                    if( response && response.name === 'ProtocolError'){
	                        alert("微信协议错误，此活动不能支付，请联系管理员");
	                        return false;
	                    }
	                    if( response && response.order.price === 0 ){
	                        alert('您已报名成功，报名详细信息已发送到您的手机上，谢谢');
	                        $state.go('campaign.myCampaign');
	                    }else{
	                        response.order.mobile = campaignOrderInfo.mobile || campaignOrderInfo.order.mobile;
	                        cacheService.campaignOrder.set(response);
	                        location = location.protocol+"//"+location.host+'/index.html#/common/pay/campaign';
	                        location.reload();
	                    }
	                }, function() {
	                    alert('提交订单失败')
	                });
	            }
	        }

	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'孩子周末去哪儿？',
	                link:link.campaign,
	                desc:'在学习中玩耍，找翼起学！百个教育活动任你选',
	                imgUrl:'http://cdn.4001583721.com/share.jpg',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'孩子周末去哪儿？',
	                link:link.campaign,
	                imgUrl:'http://cdn.4001583721.com/share.jpg',
	                success:function(){}
	             });
	        }

	        $scope.$watch('editIndex',function(newValue,oldValue){
	            var self = $scope;
	            if(newValue===self.order.num-1){
	                self.saveStatus.text = '确认报名';
	            }
	        });

	        function init(){
	            wx.ready(function(){
	                initShare();
	            });
	            questionList();
	        }

	        init();
	    }
	]);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(30)
	__webpack_require__(31)
	__webpack_require__(32)
	__webpack_require__(33)
	__webpack_require__(34)
	__webpack_require__(35)
	__webpack_require__(36)


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('courseHomeCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$location',
	    'cacheService',
	    'wxsdkService',
	    'toolsService',
	    'courseModel',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $location, cacheService, wxsdkService, toolsService, courseModel) {
	        var courseModel = new courseModel();
	        toolsService.setTitleForIphone("找课程");

	        $scope.firstCategoryId = $stateParams.id;

	        function getList(){
	            var self = $scope;
	            courseModel.categoryList({
	                id : self.firstCategoryId
	            }).then(function( response ){
	                $timeout(function(){
	                    $rootScope.pageLoading = false;
	                });
	                self.courseList = response.data;
	            },function(){

	            });
	        }

	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'翼起学本期精选课程',
	                link:link.course,
	                desc:'翼起学本期精选的百个优质活动和课程，不多也不少！',
	                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'翼起学本期精选课程',
	                link:link.course,
	                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
	                success:function(){}
	            });
	        }
	        
	        function init(){
	            getList();
	            wx.ready(function(){
	                initShare();
	            });
	        }

	        init();
	    }
	]);

	angular.module("YApp").controller('courseCenterNav', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'cacheService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, cacheService) {
	        $scope.showNav = false;
	        $scope.link = link;
	        $scope.userInfo = cacheService.userInfo.get();
	    }
	]);

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('courseListCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$location',
	    'courseModel',
	    'cacheService',
	    'wxsdkService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $location, courseModel, cacheService, wxsdkService) {
	        var courseModel = new courseModel(),
	            swiperHeader = null,
	            location = cacheService.location.get() || {
	                lat:31.29607,
	                lon:121.4961,
	                city:'上海市'
	            };

	        //scope data
	        $scope.view = {
	            navFixed : false,
	            imageNumber:''
	        }
	        $scope.pageConfig = {
	            start : 1,
	            limit : 6,
	            showLoading:true,
	            loadingText:'努力加载中...',
	            loadingProcess:true,
	            scrollAble:false,
	            hasNoData:false
	        }
	        $scope.secondCategoryId = $stateParams.secondCategoryId;
	        $scope.courseCategory = [];
	        $scope.courseList = [];
	        //scope function
	        $scope.selectCourse = selectCourse;
	        $scope.activeIndex = 0;

	        function selectCourse(index){
	            var self = $scope;
	            swiperHeader.slideTo(index); 
	            $location.search('item',index);
	        }

	        function initCategoryList(){
	            var self = $scope;
	            courseModel.categoryList({
	                id : $stateParams.firstCategoryId
	            }).then(function( response ){
	                $timeout(function(){
	                    $rootScope.pageLoading = false;
	                    self.courseCategory = response.data;
	                    self.activeIndex = getCurrentActiveIndex();
	                    setTimeout(function(){
	                        initSwiper();
	                        getCourseList();
	                    })
	                })
	            },function(){

	            });
	        }

	        function getCurrentActiveIndex(){
	            var self = $scope,
	                itemParam = $location.search().item;
	            if( itemParam !== undefined ){
	                return parseInt(itemParam);
	            }
	            for( var i=0; i<self.courseCategory.length; i++){
	                if( self.courseCategory[i]._id === self.secondCategoryId ){
	                    return i;
	                }
	            }
	        }

	        function initSwiper(){
	            var self = $scope;
	            swiperHeader = new Swiper('#J_swiperHeader', {
	                slidesPerView: 3,
	                spaceBetween: 0,
	                freeMode: true,
	                onInit: function(swiper){
	                    swiper.slideTo( self.activeIndex ); 
	                    $timeout(function(){
	                        $location.search('item',self.activeIndex);
	                    });
	                },
	                onTap:function(swiper){
	                    if( self.activeIndex === swiper.clickedIndex ){
	                        return false;
	                    }
	                    self.activeIndex = swiper.clickedIndex;
	                    // debugger;
	                    if(  !self.pageConfig.loadingProcess ){
	                        self.pageConfig.start = 1;
	                        self.pageConfig.loadingText = '努力加载中...'
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.hasNoData = false;
	                        self.courseList = [];
	                        getCourseList( true );
	                    }
	                }
	            }); 
	        }

	        function getCourseList( reset ){
	            var self = $scope,
	                reset = reset || false;
	            courseModel.list({
	                subcategoryId : self.courseCategory[self.activeIndex]['_id'],
	                start:self.pageConfig.start,
	                limit:self.pageConfig.limit,
	                city:location.city,
	                lon:location.lon,     
	                lat:location.lat,
	                distance:20/111
	            }).then(function( response ){
	                if( response && response.data ){
	                    self.courseList = !reset ? self.courseList.concat(response.data) : response.data;
	                    self.pageConfig.loadingProcess = false;
	                    self.pageConfig.showLoading = response.data.length<self.pageConfig.limit;
	                    self.pageConfig.hasNoData = response.data.length<self.pageConfig.limit;
	                    self.pageConfig.scrollAble = response.data.length===self.pageConfig.limit;
	                    if( !self.pageConfig.scrollAble ){
	                        self.pageConfig.loadingText = '没有更多了...';
	                    }else{
	                        self.pageConfig.loadingText = '努力加载中...';
	                    }
	                }else{
	                    self.pageConfig.showLoading = true;
	                    self.pageConfig.loadingText = '网络错误，请刷新再试...'
	                }
	            },function(){

	            });
	        }

	        function bindEvents(){
	            var self = $scope;
	                bannerHeight = angular.element("#J_banner").height(),
	                win = window,
	                body = document.body;

	            $(win).bind('scroll',function(){
	                //导航固定
	                if( win.scrollY >= bannerHeight ){
	                    $timeout(function(){
	                        self.view.navFixed = true;
	                    })
	                }else{
	                    $timeout(function(){
	                        self.view.navFixed = false;
	                    })
	                }
	                // console.log( win.scrollY, win.innerHeight, body.offsetHeight);
	                //滚动加载
	                if( win.scrollY + win.innerHeight >= body.offsetHeight - 60){
	                    if( self.pageConfig.scrollAble && !self.pageConfig.loadingProcess ){
	                        self.pageConfig.loadingProcess = true;
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.start++;
	                        getCourseList();
	                    }
	                }
	            });
	        } 

	        $scope.$on('$destroy',function() {  
	            $(window).unbind('scroll');
	        }); 

	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'翼起学本期精选课程',
	                link:link.course+',course/list/'+$stateParams.firstCategoryId+'/'+$stateParams.secondCategoryId,
	                desc:'翼起学本期精选的百个优质活动和课程，不多也不少',
	                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'翼起学本期精选课程',
	                link:link.course+',course/list/'+$stateParams.firstCategoryId+'/'+$stateParams.secondCategoryId,
	                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
	                success:function(){}
	            });
	        }

	        function init(){
	            bindEvents();
	            wx.ready(function(){
	                initShare();
	            });
	            initCategoryList();
	        }

	        init();
	    }
	])

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('courseDetailCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'toolsService',
	    'wxsdkService',
	    'cacheService',
	    'courseModel',
	    function($rootScope, $scope, $state, $stateParams, $timeout, toolsService, wxsdkService, cacheService, courseModel) {
	        var courseModel = new courseModel(),
	            userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get(),
	            shareLink = link.course+',course/detail/'+$stateParams.id+(userInfo.isMember ? ','+userId : '');

	        $scope.userInfo = userInfo;
	        $scope.shareLink = shareLink;
	        
	        $scope.courseView = {
	            status:'',
	            class:0,
	        }

	        $scope.tipView = {
	            tip:false,
	            text:''
	        }

	        $scope.courseOrder = {
	            classId:'',
	        }

	        $scope.collect=function( status ){
	            var self = $scope;
	            courseModel.collect({
	                schoolId:self.schoolData._id,
	                courseId:self.courseData._id,
	                creator:cacheService.userId.get(),
	                status:status
	            }).then(function( response ){
	                if(response && response.errcode==0){
	                    self.courseView.status=status;
	                    self.tipView.tip=true;
	                    if(self.courseView.status==1){
	                        self.tipView.text="收藏成功"
	                    }else if(self.courseView.status==0){
	                        self.tipView.text="已取消收藏"
	                    }
	                    $timeout(function(){
	                        self.tipView.tip=false;
	                    },2000);
	                }else{
	                    self.tipView.text="收藏失败"
	                }
	            },function(){

	            });
	        }

	        $scope.classShow = function(index,item){
	            var self = $scope;
	            if( item.num === 0 ){
	                self.tipView.tip = true;
	                self.tipView.text = "已满员";
	                $timeout(function(){
	                    self.tipView.tip = false;
	                },2000)
	                return false;
	            }
	            self.courseView.class=index;
	            self.courseOrder.classId = item._id;
	            cacheService.courseOrder.set(self.courseOrder);
	        }

	        $scope.openLocation = function(){
	            var self = $scope;
	            wxsdkService.openLocation({
	                lat:self.schoolData.location[1],
	                lon:self.schoolData.location[0],
	                name:self.courseData.schoolName,
	                address:self.schoolData.address
	            })
	        }

	        $scope.singup = function(){
	            var self = $scope;
	            if(self.classData[self.courseView.class].num<1){
	                self.tipView.tip = true;
	                self.tipView.text = "已满员";
	                $timeout(function(){
	                    self.tipView.tip = false;
	                },2000)
	                return false;
	            }
	            if(!self.courseOrder.mobile){
	                $state.go('common.setPhone',{type:'course'});
	            }else{
	                $state.go('course.order');
	            }
	        }

	        function initSlider(){
	            var self = $scope;
	            var data = [];
	            for(var i=0;i<self.courseData.photo.length;i++){
	                // var html = '<img src="'+self.courseData.photo[i]+'?imageView2/1/w/750/h/400/q/100">';
	                var html = '<img src="'+self.courseData.photo[i]+'">';
	                data.push({
	                    content:html
	                });
	            }
	            if(data.length>4){
	                data = data.slice(0,5);
	            }

	            var islider = new iSlider({
	                dom : document.getElementById('J_sliderWraper'),
	                type:"dom",
	                data : data,
	                duration : 5000,
	                isLooping : true,
	                isAutoplay : true,
	                fixPage : false
	            });

	            islider.addDot();
	        }

	        function initVideo(){
	            var self = $scope;
	            videojs(document.getElementById('J_video'), {}, function() {});
	        }

	        function getDeaultClass( classData ){
	            var self = $scope;
	            for( var i=0; i<classData.length; i++){
	                if( classData[i].num!=0 ){
	                    self.courseView.class = i;
	                    break;
	                }
	            }
	        }

	        function get(){
	            var self = $scope;
	            courseModel.detail({
	                id : $stateParams.id,
	                userId : cacheService.userId.get()
	            }).then(function( response ){
	                $rootScope.pageLoading = false;
	                self.courseData = response.courseData;
	                self.classData = response.classData;
	                self.schoolData = response.schoolData;
	                self.schoolData.phone = response.schoolData.phone[0].split(",");
	                self.courseView.status = response.favoriteData;
	                self.courseOrder.classId = self.classData.length>0?response.classData[0]._id:'';
	                self.courseOrder.mobile = response.mobile;
	                $timeout(function(){
	                    self.courseData.photo.reverse();
	                    self.courseData.photo.length>0 && initSlider();
	                });
	                getDeaultClass(self.classData);
	                self.courseData.video.length && initVideo();
	                initShare();
	                cacheService.courseOrder.set(self.courseOrder);
	                toolsService.setTitleForIphone('课程详情');
	            },function( error ){
	                console.log(error);
	            });
	        }

	        function initShare(){
	            var self = $scope;
	            wxsdkService.shareAppMessage({
	                title:'翼起学精选课程：'+self.courseData.name,
	                link:shareLink,
	                desc:'翼起学本期精选的百个优质活动和课程，不多也不少！',
	                imgUrl:self.courseData.cover || 'http://cdn.4001583721.com/wx-course-share.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'翼起学精选课程：'+self.courseData.name,
	                link:shareLink,
	                imgUrl:self.courseData.cover || 'http://cdn.4001583721.com/wx-course-share.png',
	                success:function(){}
	            });
	        }

	        function init(){
	            var self = $scope;
	            get();
	        }

	        init();
	    }
	]);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('schoolDetailCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'schoolModel',
	    'wxsdkService',
	    'toolsService',
	    'cacheService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, schoolModel, wxsdkService, toolsService, cacheService) {
	        var schoolModel = new schoolModel();

	        $scope.pageView = {
	            companyShow:false,
	            commentEditing:false,
	            content:''
	        }

	        $scope.initPreview = initPreview;

	        $scope.openLocation = function(){
	            var self = $scope;
	            wxsdkService.openLocation({
	                lat:self.school.location[1],
	                lon:self.school.location[0],
	                name:self.school.name,
	                address:self.school.address
	            })
	        }

	        $scope.addComment = function(){
	            var self = $scope;
	            self.pageView.commentEditing = true;
	        }

	        $scope.sendComment = function(){
	            var self = $scope;
	            if( !self.pageView.content ){
	                return false;
	            }
	            schoolModel.evaluate({
	                schoolId:$stateParams.id,
	                creator:cacheService.userId.get(),
	                content:self.pageView.content
	            }).then(function( response ){
	                if( response && response.success ){
	                    self.pageView.content = '';
	                    self.school.comment.unshift(response.data);
	                    $(window).scrollTop($("#J_commentWraper").offset().top-20);
	                    $timeout(function(){
	                        self.pageView.commentEditing = false;
	                    });
	                }
	            },function(){

	            });
	        }

	        function getDetail(){
	            var self = $scope;
	            schoolModel.detail({
	                id:$stateParams.id
	            }).then(function( response ){
	                $rootScope.pageLoading = false;
	                self.school = response;
	                self.school.comment = self.school.comment.reverse();
	                toolsService.setTitleForIphone('校区详情');
	                initShare();
	            },function(){

	            });
	        }

	        //打开精彩课程
	        $scope.openSchoolCourse = function(){
	            var self = $scope;
	            if(self.school.courseCount>0){
	                $state.go('course.schoolCourse',{id:self.school._id});
	            }else{
	                return false;
	            }
	        }

	        function initPreview(){
	            var self = $scope;
	            wxsdkService.previewImage({
	                current: self.school.companyImage
	            });
	        }

	        function initShare(){
	            var self = $scope;
	            wxsdkService.shareAppMessage({
	                title:self.school.name,
	                link:link.course+',course/schoolDetail/'+$stateParams.id,
	                desc:'翼起学本期精选的百个优质活动和课程，不多也不少',
	                imgUrl:self.school.logo || 'http://cdn.4001583721.com/default_avatar1.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:self.school.name,
	                link:link.course+',course/schoolDetail/'+$stateParams.id,
	                imgUrl:self.school.logo || 'http://cdn.4001583721.com/default_avatar1.png',
	                success:function(){}
	            });
	        }

	        function init(){
	            window.scrollTo(0,0);
	            getDetail();
	        }

	        init();
	    }
	]);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('courseOrderCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'cacheService',
	    'wxsdkService',
	    'courseModel',
	    'toolsService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, cacheService, wxsdkService, courseModel, toolsService) {
	        var courseModel = new courseModel(),
	            userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get(),
	            shareLink,
	            courseOrder = cacheService.courseOrder.get();

	        $("#J_courseOrderPage").css('minHeight',$(document.body)[0].scrollHeight);
	        
	        $scope.pageInfo = {
	            phone:courseOrder.mobile,
	            name:'',
	            sourceId : userInfo.sourceId
	        }

	        toolsService.setTitleForIphone("订单确认");

	        function getDetail(){
	            var self = $scope;
	            courseModel.orderDetail({
	                userId:cacheService.userId.get(),
	                classId:courseOrder.classId || courseOrder.order.classId
	            }).then(function(response){
	                self.classData = response.classData;
	                self.courseData = response.courseData;
	                $rootScope.pageLoading = false;
	                // toolsService.fixBodyHeight();

	                shareLink = link.course+',course/detail/'+self.courseData._id+(userInfo.isMember ? ','+userId : ''),
	                wx.ready(function(){
	                    initShare();
	                });
	            },function(error){
	                console.log(error);
	            });
	        }

	        $scope.orderUp = function(){
	            var self = $scope;
	            if(self.pageInfo.name==''){
	                alert("请填写参与人姓名");
	                return false;
	            }
	            if(self.pageInfo.phone==''){
	                alert("请填写参与人手机号码");
	                return false;
	            }else if(!toolsService.checkPhone(self.pageInfo.phone)){
	                alert("请填写正确的手机号码");
	                return false;
	            }
	            courseModel.order({
	                name:self.pageInfo.name,
	                userId:cacheService.userId.get(),
	                mobile:self.pageInfo.phone,
	                classId:self.classData._id,
	                sourceId:self.pageInfo.sourceId
	            }).then(function(response){
	                if( response.order.price === 0 ){
	                    alert('您已报名成功，报名详细信息已发送到您的手机上，谢谢');
	                    $state.go('course.myCourse');
	                }else{
	                    cacheService.courseOrder.set( response );
	                    location = location.protocol+"//"+location.host+'/index.html#/common/pay/course';
	                    location.reload();
	                    // $state.go("common.pay",{type:'course'});
	                }
	            },function(){
	                alert("提交订单失败");
	            });
	        }

	        $scope.$on('$destroy',function() {  
	            angular.element('body').css('height','auto')
	        }); 

	        function initShare(){
	            var self = $scope;
	            wxsdkService.shareAppMessage({
	                title:self.courseData.name,
	                link:shareLink,
	                desc:'翼起学本期精选的百个优质活动和课程，不多也不少',
	                imgUrl:self.courseData.cover || 'http://cdn.4001583721.com/wx-course-share.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:self.courseData.name,
	                link:shareLink,
	                imgUrl:self.courseData.cover || 'http://cdn.4001583721.com/wx-course-share.png',
	                success:function(){}
	            });
	        }

	        function init() {
	            getDetail();
	        }

	        init();
	    }
	]);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('myCourseCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'courseModel',
	    'campaignModel',
	    'toolsService',
	    'cacheService',
	    'wxsdkService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, courseModel, campaignModel, toolsService, cacheService, wxsdkService) {
	        toolsService.setTitleForIphone("我的课程");
	        var campaignModel = new campaignModel(),
	            courseModel = new courseModel();
	        
	        $timeout(function(){
	            $rootScope.pageLoading = false;
	        });

	        $scope.pageConfig = {
	            start : 1,
	            limit : 5,
	            showLoading:true,
	            loadingText:'努力加载中...',
	            loadingProcess:true,
	            scrollAble:false,
	            hasNoData:false
	        }

	        $scope.listShow = 2;
	        $scope.collect = [];
	        $scope.courseOrder = [];
	        $scope.campaignOrder = [];

	        $scope.getList = function(number){
	            var self = $scope;
	            self.collect = [];
	            self.courseOrder = [];
	            self.campaignOrder = [];
	            self.pageConfig.start = 1;
	            self.listShow = number;
	            getMyList();
	        }

	        function getMyList(){
	            var self = $scope;
	            if(self.listShow==1){
	                getMyCampaignOrderList();
	            }
	            if(self.listShow==2){
	                getMyCourseOrderList();
	            }
	            if(self.listShow==3){
	                getCourseCollect();
	            }
	        }

	        function getMyCampaignOrderList(){
	            var self = $scope;
	            campaignModel.myCampaign({
	                userId : cacheService.userId.get(),
	                limit : self.pageConfig.limit,
	                start : self.pageConfig.start
	            }).then(function( response ){
	                $timeout(function(){
	                    $rootScope.pageLoading = false;
	                });
	                if( response && response.length>-1 ){
	                    self.campaignOrder = !self.pageConfig.loadingProcess ? self.campaignOrder.concat(response) : response;
	                    campaignComputeData(self.campaignOrder);
	                    self.pageConfig.loadingProcess = false;
	                    self.pageConfig.showLoading = response.length<self.pageConfig.limit;
	                    self.pageConfig.hasNoData = response.length<self.pageConfig.limit;
	                    self.pageConfig.scrollAble = response.length===self.pageConfig.limit;
	                    if( !self.pageConfig.scrollAble ){
	                        self.pageConfig.loadingText = '没有更多了~~';
	                    }else{
	                        self.pageConfig.loadingText = '努力加载中...';
	                    }
	                }else{
	                    self.pageConfig.showLoading = true;
	                    self.pageConfig.loadingText = '网络错误，请刷新再试...';
	                }
	            },function(){

	            });
	        }

	        function getMyCourseOrderList(){
	            var self = $scope;
	            courseModel.userOrder({
	                userId:cacheService.userId.get(),
	                limit : self.pageConfig.limit,
	                start : self.pageConfig.start
	            }).then(function(response){
	                $timeout(function(){
	                    $rootScope.pageLoading = false;
	                });
	                if( response && response.length>-1 ){
	                    self.courseOrder = !self.pageConfig.loadingProcess ? self.courseOrder.concat(response) : response;
	                    courseComputeData( self.courseOrder );
	                    self.pageConfig.loadingProcess = false;
	                    self.pageConfig.showLoading = response.length<self.pageConfig.limit;
	                    self.pageConfig.hasNoData = response.length<self.pageConfig.limit;
	                    self.pageConfig.scrollAble = response.length===self.pageConfig.limit;
	                    if( !self.pageConfig.scrollAble ){
	                        self.pageConfig.loadingText = '没有更多了~~';
	                    }else{
	                        self.pageConfig.loadingText = '努力加载中...';
	                    }
	                }else{
	                    self.pageConfig.showLoading = true;
	                    self.pageConfig.loadingText = '网络错误，请刷新再试...';
	                }
	            },function(error){
	                console.log(error)
	            });
	        }

	        function getCourseCollect(){
	            var self = $scope;
	            courseModel.userFavorite({
	                userId:cacheService.userId.get(),
	                limit : self.pageConfig.limit,
	                start : self.pageConfig.start
	            }).then(function(response){
	                if( response && response.length>-1 ){
	                    self.collect = !self.pageConfig.loadingProcess ? self.collect.concat(response) : response;
	                    self.pageConfig.loadingProcess = false;
	                    self.pageConfig.showLoading = response.length<self.pageConfig.limit;
	                    self.pageConfig.hasNoData = response.length<self.pageConfig.limit;
	                    self.pageConfig.scrollAble = response.length===self.pageConfig.limit;
	                    if( !self.pageConfig.scrollAble ){
	                        self.pageConfig.loadingText = '没有更多了~~';
	                    }else{
	                        self.pageConfig.loadingText = '努力加载中...';
	                    }
	                }else{
	                    self.pageConfig.showLoading = true;
	                    self.pageConfig.loadingText = '网络错误，请刷新再试...';
	                }
	            },function(error){
	                console.log(error)
	            });
	        }

	        //活动付款倒计时
	        function campaignComputeData( data ){
	            var self = $scope;
	            for( var i=0; i<data.length; i++){
	                if( data[i].trade.status===1 ){
	                    data[i].trade.over = 0;
	                    if( moment().diff(moment(data[i].trade.created*1000)) > 7200000 ){
	                        data[i].trade.over = 0;
	                    }else{
	                        data[i].trade.over = 1;
	                    }
	                }
	            }
	            $timeout(function(){
	                self.campaignOrder = data;
	                var campaignTimes = window.setInterval(campaignGetTime,1000);
	            })
	        }

	        function campaignGetTime(){
	            var self = $scope;
	            var timer = [];
	            var date = new Date().getTime();
	            var date = parseInt(date/1000);
	            for(var t=0;t<self.campaignOrder.length;t++){
	                var time = 7200-(date-self.campaignOrder[t].trade.created);
	                var hour = parseInt(time/3600);
	                var minute = parseInt((time%3600)/60);
	                var text = "未付款 请于"+hour+"小时"+minute+"分钟内完成付款"
	                $(".campaignCountDown").find(".timer").eq(t).text(text);
	                if(time<0){
	                    timer.push(time);
	                    if(timer.length<1){
	                        window.clearInterval(campaignTimes);
	                    }
	                }
	            }
	        }

	        //课程付款倒计时
	        function courseComputeData( data ){
	            var self = $scope;
	            for( var i=0; i<data.length; i++){
	                if( data[i].trade.status===1 ){
	                    data[i].trade.over = 0;
	                    if( moment().diff(moment(data[i].trade.created*1000)) > 7200000 ){
	                        data[i].trade.over = 0;
	                    }else{
	                        data[i].trade.over = 1;
	                    }
	                }
	            }
	            $timeout(function(){
	                self.courseOrder = data;
	                var courseTimes = window.setInterval(courseGetTime,1000);
	            })
	        }

	        function courseGetTime(){
	            var self = $scope;
	            var timer = [];
	            var date = new Date().getTime();
	            var date = parseInt(date/1000);
	            for(var t=0;t<self.courseOrder.length;t++){
	                var time = 7200-(date-self.courseOrder[t].trade.created);
	                var hour = parseInt(time/3600);
	                var minute = parseInt((time%3600)/60);
	                var text = "未付款 请于"+hour+"小时"+minute+"分钟内完成付款"
	                $(".courseCountDown").find(".timer").eq(t).text(text);
	                if(time<0){
	                    timer.push(time);
	                    if(timer.length<1){
	                        window.clearInterval(courseTimes);
	                    }
	                }
	            }
	        }

	        function bindEvents(){
	            var self = $scope,
	                win = window,
	                body = document.body;
	            $(win).bind('scroll',function(){
	                // console.log( win.scrollY, win.innerHeight, body.offsetHeight);
	                //滚动加载
	                if( win.scrollY + win.innerHeight >= body.offsetHeight - 60){
	                    if( self.pageConfig.scrollAble && !self.pageConfig.loadingProcess ){
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.start++;
	                        getMyList();
	                    }
	                }
	            });
	        } 

	        $scope.$on('$destroy',function() {  
	            $(window).unbind('scroll');
	        }); 

	        $scope.payAgain = function( item,type ){
	            var self = $scope;
	            if(type==='course'){
	                courseModel.payAgain({
	                    _id : item.trade._id
	                }).then(function( response ){
	                    cacheService.courseOrder.set(response);
	                    location = location.protocol+"//"+location.host+'/index.html#/common/pay/course';
	                    location.reload();
	                },function(){

	                });
	            }
	            if(type==='campaign'){
	                campaignModel.payAgain({
	                    _id : item.trade._id
	                }).then(function( response ){
	                    cacheService.campaignOrder.set(response);
	                    // location.href = '/index.html#/campaignPay/1?showwxpaytitle=1'
	                    location = location.protocol+"//"+location.host+'/index.html#/common/pay/campaign';
	                    location.reload();
	                },function(){

	                });
	            }
	        }   

	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'翼起学本期精选课程',
	                link:link.course,
	                desc:'翼起学本期精选的百个优质活动和课程，不多也不少',
	                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'翼起学本期精选课程',
	                link:link.course,
	                imgUrl:'http://cdn.4001583721.com/wx-course-share.png',
	                success:function(){}
	            });
	        }

	        function init(){
	            bindEvents();
	            wx.ready(function(){
	                initShare();
	            });
	            getMyList();
	        }

	        init();
	        
	    }
	]);


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('schoolCourseCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    'schoolModel',
	    'wxsdkService',
	    'toolsService',
	    'cacheService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, schoolModel, wxsdkService, toolsService, cacheService) {
	        var schoolModel = new schoolModel();
	        var location = cacheService.location.get() || {
	                lat:31.29607,
	                lon:121.4961,
	                city:'上海市'
	            };

	        function getCourseList(){
	            var self = $scope;
	            schoolModel.courseList({
	                id:$stateParams.id,
	                start:1,
	                limit:99999,
	                lon:location.lon,
	                lat:location.lat
	            }).then(function( response ){
	                $timeout(function(){
	                   $rootScope.pageLoading = false;
	                   toolsService.setTitleForIphone('校区课程'); 
	                });
	                self.courseList = response.data;
	                self.dist = response.dist;
	                self.schoolData = response.schoolData;
	            },function(error){
	                console.log(error)
	            });
	        }

	        function initShare(){
	            var self = $scope;
	            wxsdkService.shareAppMessage({
	                title:self.schoolData.name,
	                link:link.course+',course/schoolDetail/'+$stateParams.id,
	                desc:'翼起学本期精选的百个优质活动和课程，不多也不少',
	                imgUrl:self.schoolData.logo || 'http://cdn.4001583721.com/default_avatar1.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:self.schoolData.name,
	                link:link.course+',course/schoolDetail/'+$stateParams.id,
	                imgUrl:self.schoolData.logo || 'http://cdn.4001583721.com/default_avatar1.png',
	                success:function(){}
	            });
	        }

	        function init(){
	            getCourseList();
	            wx.ready(function(){
	                initShare();
	            });
	        }

	        init();
	    }
	]);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);
	__webpack_require__(39);
	__webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(42);
	__webpack_require__(43);
	__webpack_require__(44);
	__webpack_require__(45);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('distributionIndexPageCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$location',
	    'distributionModel',
	    'cacheService',
	    'wxsdkService',
	    'toolsService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $location, distributionModel, cacheService, wxsdkService, toolsService) {
	        var distributionModel = new distributionModel(),
	            userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get(),
	            shareLink = userInfo.isMember ? link.distribution+',distribution/index,'+userId:link.distribution,
	            // shareDesc = userInfo.sort>0 ? '我已是翼起学第'+userInfo.sort+'位合伙人，敢问土豪你是谁？对我家宝宝如此不薄！':'敢问土豪你是谁？对我家宝宝如此不薄！';
	            shareDesc = '有了翼起学暑期小特工，您至少可以休息两个月。';
	            
	            
	        toolsService.setTitleForIphone("会员亲子年卡限时拼团中");
	        $("#J_distributionIndexPage").css('minHeight',$(document.body)[0].scrollHeight);
	        $rootScope.pageLoading = false;
	        $scope.userInfo = userInfo;
	        $scope.shareLink = shareLink;
	        $scope.link = link;
	        $scope.initPreview = initPreview;
	        $scope.memberInfoList = [];

	        $scope.pageConfig = {
	            start:1,
	            limit:35
	        }
	        
	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title: '翼起学为孩子们安排好暑期行程',
	                link: shareLink,
	                desc: shareDesc,
	                imgUrl: 'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'翼起学为孩子们安排好暑期行程',
	                link: shareLink,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	        }

	        // function onBridgeReady() {
	        //     WeixinJSBridge.on('menu:share:appmessage', function(argv) {
	        //         WeixinJSBridge.invoke('sendAppMessage',{
	        //             "link":"http://m.exmail.qq.com/",
	        //             "desc":"desc",
	        //             "title":"title for WeiXinJsBridge"
	        //         }, function(res) {
	        //             WeixinJSBridge.log(res.err_msg);
	        //         });
	        //     });
	        //     WeixinJSBridge.on('menu:share:timeline', function(argv) {
	        //         WeixinJSBridge.invoke("shareTimeline",{
	        //             "link":"http://m.exmail.qq.com",
	        //             "img_url":"http://rescdn.qqmail.com/bizmail/zh_CN/htmledition/images/bizmail/v3/logo1ca3fe.png",
	        //             "img_width":"172",
	        //             "img_height":"40",
	        //             "desc":"i am description",
	        //             "title":"just test from WeixinJsBridge"
	        //         },function(e){
	        //             WeixinJSBridge.log(res.err_msg);
	        //         })
	        //     });
	        // }
	        //   
	        // if (typeof WeixinJSBridge === "undefined"){
	        //     if(document.addEventListener){
	        //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	        //     }
	        // }else{
	        //   onBridgeReady();
	        // }
	         
	        //已报名用户头像获取
	        function getMemberInfo(){
	            var self = $scope;
	            distributionModel.memberInfo({
	                start:self.pageConfig.start,
	                limit:self.pageConfig.limit
	            }).then(function( response ){
	                self.memberInfoList = response;
	            }, function(error){
	                console.log(error)
	            })
	        }

	        function initPreview( url ){
	            var self = $scope;
	            wxsdkService.previewImage({
	                current: url
	            });
	        }

	        function init(){
	            wx.ready(function(){
	                initShare();
	            });
	            getMemberInfo();
	        }

	        init();
	    }
	]);


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('distributionSingupCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$interval',
	    'wxsdkService',
	    'cacheService',
	    'toolsService',
	    'distributionModel',
	    'courseModel',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $interval, wxsdkService, cacheService, toolsService, distributionModel, courseModel) {
	    	var distributionModel = new distributionModel(),
	    		courseModel = new courseModel(),
	            userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get();

	        toolsService.setTitleForIphone("填写个人信息");
	        $rootScope.pageLoading = false;

	        $scope.order = {
	            userId: cacheService.userId.get(),
	            mobile: '',
	            name : '',
	            type: parseInt($stateParams.type)>=3?parseInt($stateParams.type):2,
	            sourceId : userInfo.sourceId
	        }

	        $scope.code = {
	        	sended : false,
	        	timerText : "发送",
	        	value : ""
	        }

	        $scope.tipView = {
	            show:false,
	            text:''
	        }
	        $scope.saveStatus = {
	            text:"确认报名",
	            loading:false
	        }

	        $scope.singup = singup;
	        $scope.sendCode = sendCode;

	        function showTip( text ){
	        	var self = $scope;
	        	self.tipView.show = true;
	        	self.tipView.text = text;
	        	$timeout(function(){
	        		self.tipView.show = false;
		        	self.tipView.text = '';
	        	},2000)
	        }

	        function sendCode(){
	            var self = $scope,
	                timerNum = 60,
	                timerPromise;

	            if( self.code.sended ){
	                return false;
	            }

	            courseModel.sendPhoneMsg({
	                mobile:self.order.mobile
	            }).then(function(response){
	                if( response && response.errcode===0 ){
	                    self.code.sended = true;
	                    timerPromise = $interval(function(){
	                        self.code.timerText = timerNum--;
	                        if( timerNum===-1 ){
	                            $interval.cancel( timerPromise );
	                            self.code.sended = false;
	                            self.code.timerText = "重发";
	                        }
	                    },1000)
	                }else{
	                    showTip('短信发送失败，请重发');
	                    self.code.sended = false;
	                    self.code.timerText = "重发";
	                }
	            });
	        }

			function verificationCode(){
	            var self = $scope;
	            courseModel.verificationCode({
	                mobile:self.order.mobile,
	                code:self.code.value
	            }).then(function(response){
	                if( response && response.errcode===0 ){
	                    submit();
	                }else{
	                    showTip('验证码错误');
	                }
	            });
	        }


	        function submit(){
	            var self = $scope;
	          
	            self.saveStatus.text = '报名中...';
	            self.saveStatus.loading = true;

	            distributionModel.order(self.order).then(function(response) {
	                if( response && response.name === 'ProtocolError'){
	                    alert("微信协议错误，暂不能支付，请联系管理员");
	                    return false;
	                }
	                cacheService.distributionOrder.set( response );
	                location = location.protocol+"//"+location.host+'/index.html#/common/pay/distribution';
	                location.reload();
	            }, function() {
	                alert('提交订单失败')
	            });

	        }

	        function singup(myForm){
	        	var self = $scope;

	            if(myForm.$invalid || self.saveStatus.loading){
	                return false;
	            }

	            verificationCode();

	        }

	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'翼起学为孩子们安排好暑期行程',
	                link:link.distribution,
	                desc:'有了翼起学暑期小特工，您至少可以休息两个月。',
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'翼起学为孩子们安排好暑期行程',
	                link:link.distribution,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	        }

	        function init(){
	            wx.ready(function(){
	                initShare();
	            });
	        }

	        init();
	    }
	]);

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('distributionGroupCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$location',
	    'cacheService',
	    'wxsdkService',
	    'toolsService',
	    'distributionModel',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $location, cacheService, wxsdkService, toolsService, distributionModel) {
	        var distributionModel = new distributionModel(),
	            userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get(),
	            shareLink = link.distribution+',distribution/index,'+userId,
	            shareDesc;

	        toolsService.setTitleForIphone("购买成功");
	        $("#J_distributionGroup").css('minHeight',$(document.body)[0].scrollHeight);
	        $rootScope.pageLoading = false;
	        $rootScope.isPageCover = true;
	        $scope.shareLink = shareLink;
	        $scope.centerLink = link.distributionCenter;
	        
	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'翼起学为孩子们安排好暑期行程',
	                link:shareLink,
	                desc:shareDesc,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'翼起学为孩子们安排好暑期行程',
	                link:shareLink,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	        }
	        
	        function getSort( fn ){
	            var self = $scope;
	            distributionModel.getSort({
	                userId : userId
	            }).then(function (response) {
	                if( response){
	                    fn && fn( response )
	                }
	            }, function (error) {
	                console.log(error)
	            })
	        }

	        function init(){
	            wx.ready(function(){
	                getSort(function( data ){
	                    shareDesc = '有了翼起学暑期小特工，您至少可以休息两个月。';
	                    initShare();
	                    cacheService.userInfo.set(angular.extend(cacheService.userInfo.get(), {
	                        isMember:1,
	                        sort:data.sort
	                    }))
	                })
	            });
	        }

	        init();
	    }
	]);


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('distributionCenterCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$location',
	    'distributionModel',
	    'cacheService',
	    'wxsdkService',
	    'toolsService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $location, distributionModel, cacheService, wxsdkService, toolsService) {
	        var userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get(),
	            distributionModel = new distributionModel(),
	            shareLink = userInfo.isMember ? link.distribution+',distribution/index,'+userId:link.distribution,
	            // shareDesc = userInfo.sort>0 ? '我已是翼起学第'+userInfo.sort+'位合伙人，前方高能预警，育儿福利太多接不住！':'前方高能预警，育儿福利太多接不住！';
	            shareDesc = '有了翼起学暑期小特工，您至少可以休息两个月。';

	        toolsService.setTitleForIphone("我的收入记录");
	        $("#J_distributionCenter").css('minHeight',$(document.body)[0].scrollHeight);

	        $scope.userInfo = userInfo;
	        $scope.centerDetail = {}
	        $scope.centerList = {};
	        $scope.pageConfig = {
	            listType:1,
	        }

	        $scope.goSale = function (type) {
	            var self = $scope;
	            $state.go('distribution.sale',{type:type})
	        }
	        
	        function getCenterDetail() {
	            var self = $scope;
	            distributionModel.centerDetail({
	                userId:userId
	            }).then(function( response ){
	                if( response ){
	                    self.centerDetail = response;
	                    $rootScope.pageLoading = false;
	                }
	            }, function(error){
	                console.log(error)
	            });
	        }

	        function getCenterList() {
	            var self = $scope;
	            distributionModel.centerList({
	                type: self.pageConfig.listType
	            }).then(function (response) {
	                if( response ){
	                    self.centerList = response.data;
	                    $rootScope.pageLoading = false;
	                }
	            }, function (error) {
	                console.log(error)
	            })
	        }

	        $scope.getList = function (type) {
	            var self = $scope;
	            self.pageConfig.listType = type;
	            getCenterList();
	        }

	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'翼起学为孩子们安排好暑期行程',
	                link:shareLink,
	                desc:shareDesc,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'翼起学为孩子们安排好暑期行程',
	                link:shareLink,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	        }

	        function init(){
	            wx.ready(function(){
	                initShare();
	            });
	            if( userInfo.type>=1 ){
	                getCenterDetail();
	                getCenterList();
	                $rootScope.pageLoading = false;
	            }else{
	                // $state.go('distribution.index')
	                $rootScope.pageLoading = false;
	            }
	        }

	        init();
	    }
	]);


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);
	var url = __webpack_require__(6);

	angular.module("YApp").controller('distributionProductsCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$location',
	    'distributionModel',
	    'cacheService',
	    'wxsdkService',
	    'toolsService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $location, distributionModel, cacheService, wxsdkService, toolsService) {
	        var distributionModel = new distributionModel(),
	            userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get(),
	            shareLink = userInfo.isMember ? link.distribution+',distribution/index,'+userId:link.distribution,
	            // shareDesc = userInfo.sort>0 ? '我已是翼起学第'+userInfo.sort+'位合伙人，前方高能预警，育儿福利太多接不住！':'前方高能预警，育儿福利太多接不住！';
	            shareDesc = '有了翼起学暑期小特工，您至少可以休息两个月。';
	            

	        toolsService.setTitleForIphone("推广产品");
	        $("#J_distrbutionProducts").css('minHeight',$(document.body)[0].scrollHeight);
	        $rootScope.pageLoading = false;
	        $rootScope.isPageCover = false;
	        $rootScope.isPageWhite = true;
	        $scope.userInfo = userInfo;
	        $scope.pageConfig = {
	            listType:1,
	            pageNumber:1,
	            start:1,
	            limit:4,
	            showLoading:true,
	            loadingText:'努力加载中...',
	            loadingProcess:true,
	            scrollAble:false,
	            hasNoData:false
	        }

	        $scope.goNewPages = function (id) {
	            var self = $scope;
	            if(self.pageConfig.listType == 1){
	                if(id===1){
	                    $state.go('distribution.index');
	                }else{
	                    $state.go('distribution.principal');
	                }
	            }
	            if(self.pageConfig.listType == 2){
	                $state.go('course.detail',{id:id});
	            }
	            if(self.pageConfig.listType == 3){
	                $state.go('campaign.detail',{id:id});
	            }
	        }

	        $scope.list = [];
	        $scope.campaignList = [];
	        $scope.courseList = [];

	        //最小最大价格
	        function priceInterval(courseList) {
	            var self = $scope;
	            for(var i = 0;i<courseList.length;i++){
	                self.price = [];    
	                for(var k = 0;k<courseList[i].class.length;k++){
	                    if(courseList[i].class[k].type==1){
	                        self.price.push(courseList[i].class[k].price*courseList[i].class[k].discount/100);
	                    }
	                    if(courseList[i].class[k].type==2){
	                        self.price.push(courseList[i].class[k].audition);
	                    }   
	                }
	                self.courseList[i].maxPrice = parseInt( Math.max.apply(Math,self.price) );
	                self.courseList[i].minPrice = parseInt( Math.min.apply(Math,self.price) );
	            }
	        }

	        $scope.updateList = function (type) {
	            var self = $scope;
	            self.list = [];
	            self.pageConfig.pageNumber = 1;
	            self.pageConfig.listType = type;
	            self.pageConfig.loadingProcess = true;
	            self.pageConfig.start = 1;
	            self.pageConfig.loadingText = '努力加载中...'
	            self.pageConfig.showLoading = true;
	            self.pageConfig.hasNoData = false;
	            getList(true);
	        }

	        function getList(reset) {
	            var self = $scope;
	            self.reset = reset || false;
	            if(self.pageConfig.listType==1){
	                distributionModel.productList({
	                    start:self.pageConfig.start,
	                    limit:self.pageConfig.limit,
	                    type:self.pageConfig.listType
	                }).then(function (response) {
	                    if( response && response.data ){
	                        self.list = !self.reset ? self.list.concat(response.data) : response.data;
	                        self.pageConfig.loadingProcess = false;
	                        self.pageConfig.showLoading = response.data.length<self.pageConfig.limit;
	                        self.pageConfig.hasNoData = response.data.length<self.pageConfig.limit;
	                        self.pageConfig.scrollAble = response.data.length===self.pageConfig.limit;
	                        if( !self.pageConfig.scrollAble ){
	                            self.pageConfig.loadingText = '没有更多了...';
	                        }else{
	                            self.pageConfig.loadingText = '努力加载中...';
	                        }
	                    }else{
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.loadingText = '网络错误，请刷新再试...'
	                    }
	                }, function (error) {
	                    console.log(error)
	                })
	            }
	            if(self.pageConfig.listType==2){
	                distributionModel.courseList({
	                    start:self.pageConfig.start,
	                    limit:self.pageConfig.limit,
	                    id:url.courseCategoryId/*课程分类id*/
	                }).then(function (response) {
	                    if( response && response.data ){
	                        self.courseList = !self.reset ? self.courseList.concat(response.data) : response.data;
	                        self.pageConfig.loadingProcess = false;
	                        self.pageConfig.showLoading = response.data.length<self.pageConfig.limit;
	                        self.pageConfig.hasNoData = response.data.length<self.pageConfig.limit;
	                        self.pageConfig.scrollAble = response.data.length===self.pageConfig.limit;
	                        priceInterval(self.courseList)
	                        if( !self.pageConfig.scrollAble ){
	                            self.pageConfig.loadingText = '没有更多了...';
	                        }else{
	                            self.pageConfig.loadingText = '努力加载中...';
	                        }
	                    }else{
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.loadingText = '网络错误，请刷新再试...'
	                    }
	                }, function (error) {
	                    console.log(error)
	                })
	            }
	            if(self.pageConfig.listType==3){
	                distributionModel.campaignList({
	                    start:self.pageConfig.pageNumber,
	                    limit:self.pageConfig.limit,
	                    id:url.wechatId/*微信公众号id*/
	                }).then(function (response) {
	                    if( response && response.total>-1 ){
	                        self.campaignList = self.pageConfig.pageNumber==1 ? response.data : self.campaignList.concat(response.data);
	                        self.pageConfig.loadingProcess = false;
	                        self.pageConfig.showLoading = response.total<self.pageConfig.limit;
	                        self.pageConfig.scrollAble = response.total>self.pageConfig.limit||response.total==self.pageConfig.limit;
	                        if(self.pageConfig.pageNumber==response.cPage){
	                            self.pageConfig.pageNumber+=1;
	                        }else{
	                            self.pageConfig.pageNumber = response.cPage;
	                        }
	                        if( !self.pageConfig.scrollAble ){
	                            self.pageConfig.loadingText = '没有更多了...';
	                        }else{
	                            self.pageConfig.loadingText = '努力加载中...';
	                        }
	                    }else{
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.loadingText = '网络错误，请刷新再试...'
	                    }
	                }, function (error) {
	                    console.log(error)
	                })
	            }
	        }

	        function bindEvents(){
	            var self = $scope,
	                win = window,
	                body = document.body;
	            $(win).bind('scroll',function(){
	                // console.log( win.scrollY, win.innerHeight, body.offsetHeight);
	                //滚动加载
	                if( win.scrollY + win.innerHeight >= body.offsetHeight - 60){
	                    if( self.pageConfig.scrollAble && !self.pageConfig.loadingProcess ){
	                        self.pageConfig.loadingProcess = true;
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.start++;
	                        getList();
	                    }
	                }
	            });
	        } 

	        $scope.$on('$destroy',function() {  
	            $(window).unbind('scroll');
	        }); 

	        
	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'翼起学为孩子们安排好暑期行程',
	                link:shareLink,
	                desc:shareDesc,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'翼起学为孩子们安排好暑期行程',
	                link:shareLink,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	        }
	        
	        function init(){
	            wx.ready(function(){
	                initShare();
	            });
	            getList();
	            bindEvents();
	        }

	        init();
	    }
	]);


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('distributionSaleCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$location',
	    'distributionModel',
	    'cacheService',
	    'wxsdkService',
	    'toolsService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $location, distributionModel, cacheService, wxsdkService, toolsService) {
	        var distributionModel = new distributionModel(),
	            userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get(),
	            shareLink = userInfo.isMember ? link.distribution+',distribution/index,'+userId:link.distribution,
	            // shareDesc = userInfo.sort>0 ? '我已是翼起学第'+userInfo.sort+'位合伙人，前方高能预警，育儿福利太多接不住！':'前方高能预警，育儿福利太多接不住！';
	            shareDesc = '有了翼起学暑期小特工，您至少可以休息两个月。';


	        toolsService.setTitleForIphone("我的销售记录");
	        $("#J_distrbutionProducts").css('minHeight',$(document.body)[0].scrollHeight);
	        $rootScope.pageLoading = false;
	        $rootScope.isPageCover = false;

	        $scope.pageConfig = {
	            listType:1,
	            start:1,
	            limit:5,
	            showLoading:true,
	            loadingText:'努力加载中...',
	            loadingProcess:true,
	            scrollAble:false,
	            hasNoData:false
	        }

	        $scope.goNewPages = function (id) {
	            var self = $scope;
	            if(self.pageConfig.listType == 1){
	                $state.go('distribution.index');
	            }
	            if(self.pageConfig.listType == 2){
	                $state.go('campaign.detail',{id:id});
	            }
	            if(self.pageConfig.listType == 3){
	                $state.go('course.detail',{id:id});
	            }
	        }
	        
	        $scope.list = [];

	        $scope.updateList = function (type) {
	            var self = $scope;
	            self.list = [];
	            self.pageConfig.listType = type;
	            self.pageConfig.loadingProcess = true;
	            self.pageConfig.start = 1;
	            self.pageConfig.loadingText = '努力加载中...'
	            self.pageConfig.showLoading = true;
	            self.pageConfig.hasNoData = false;
	            getList();
	        }

	        function getList() {
	            var self = $scope;
	            distributionModel.saleList({
	                start:self.pageConfig.start,
	                limit:self.pageConfig.limit,
	                type:self.pageConfig.listType,
	                userId:userId
	            }).then(function (response) {
	                if( response && response.data ){
	                    self.list = !self.pageConfig.loadingProcess ? self.list.concat(response.data) : response.data;
	                    self.pageConfig.loadingProcess = false;
	                    self.pageConfig.showLoading = response.data.length<self.pageConfig.limit;
	                    self.pageConfig.hasNoData = response.data.length<self.pageConfig.limit;
	                    self.pageConfig.scrollAble = response.data.length===self.pageConfig.limit;
	                    if( !self.pageConfig.scrollAble ){
	                        self.pageConfig.loadingText = '没有更多了...';
	                    }else{
	                        self.pageConfig.loadingText = '努力加载中...';
	                    }
	                }else{
	                    self.pageConfig.showLoading = true;
	                    self.pageConfig.loadingText = '网络错误，请刷新再试...'
	                }
	            }, function (error) {
	                console.log(error)
	            })
	        }

	        function bindEvents(){
	            var self = $scope,
	                win = window,
	                body = document.body;
	            $(win).bind('scroll',function(){
	                // console.log( win.scrollY, win.innerHeight, body.offsetHeight);
	                //滚动加载
	                if( win.scrollY + win.innerHeight >= body.offsetHeight - 60){
	                    if( self.pageConfig.scrollAble && !self.pageConfig.loadingProcess ){
	                        self.pageConfig.showLoading = true;
	                        self.pageConfig.start++;
	                        getList();
	                    }
	                }
	            });
	        } 

	        $scope.$on('$destroy',function() {  
	            $(window).unbind('scroll');
	        });

	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'翼起学为孩子们安排好暑期行程',
	                link:shareLink,
	                desc:shareDesc,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'翼起学为孩子们安排好暑期行程',
	                link:shareLink,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon03.png',
	                success:function(){}
	            });
	        }
	        
	        function init(){
	            var self = $scope;
	            wx.ready(function(){
	                initShare();
	            });
	            if($stateParams.type){
	                self.pageConfig.listType = $stateParams.type;
	            }else{
	                self.pageConfig.listType = 1;
	            }
	            getList();
	            bindEvents();
	        }

	        init();
	    }
	]);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('distributionPrincipalCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$location',
	    'distributionModel',
	    'cacheService',
	    'wxsdkService',
	    'toolsService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $location, distributionModel, cacheService, wxsdkService, toolsService) {
	        var distributionModel = new distributionModel(),
	            userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get(),
	            shareLink = userInfo.isMember ? link.distributionPrincipal+',distribution/principal,'+userId:link.distributionPrincipal,
	            shareDesc = userInfo.sort>0 ? '我已是翼起学第'+userInfo.sort+'位合伙人，前方高能预警，育儿福利太多接不住！':'前方高能预警，育儿福利太多接不住！';

	        toolsService.setTitleForIphone("战略合伙人招募中");
	        $("#J_distrbutionProducts").css('minHeight',$(document.body)[0].scrollHeight);
	        $rootScope.pageLoading = false;
	        $rootScope.isPageCover = false;
	        $rootScope.isPageWhite = true;

	        $scope.userInfo = userInfo;
	        
	        $scope.pageConfig = {
	            type:3,
	            buttonView:false,
	        }

	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'国民老公邀请您一起学一起玩！',
	                link:shareLink,
	                desc:shareDesc,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'国民老公邀请您一起学一起玩！',
	                link:shareLink,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon.png',
	                success:function(){}
	            });
	        }

	        function scrollTop() {
	            $(window).bind('scroll',function () {
	                var self = $scope;
	                var scrollTop = $(window).scrollTop();
	                if(scrollTop>0){
	                    $timeout(function () {
	                        self.pageConfig.buttonView = true;
	                    })
	                }else{
	                    $timeout(function () {
	                        self.pageConfig.buttonView = false;
	                    })
	                }
	            })
	        }
	        
	        function init(){
	            var self = $scope;
	            wx.ready(function(){
	                initShare();
	            });
	            scrollTop();
	        }

	        init();
	    }
	]);


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('distributionHelpCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$location',
	    'cacheService',
	    'wxsdkService',
	    'toolsService',
	    'distributionModel',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $location, cacheService, wxsdkService, toolsService, distributionModel) {
	        var distributionModel = new distributionModel();
	        
	        $("#J_distributionHelpPage").css('minHeight',$(document.body)[0].scrollHeight);
	        
	        $scope.pageConfig = {
	            pageView:0,
	            imageView:1
	        }

	        toolsService.setTitleForIphone("翼起学");
	        $rootScope.pageLoading = false;
	        $rootScope.isPageCover = false;
	        $scope.pageView = pageView;

	        function pageView(num){
	            var self = $scope;
	            self.pageConfig.pageView = num;
	            self.pageConfig.imageView = 1;
	        }


	        function init(){
	            
	        }

	        init();
	    }
	]);


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(47)
	__webpack_require__(48)

/***/ },
/* 47 */
/***/ function(module, exports) {

	angular.module('YApp').directive('autoFocus', function() {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            scope.$watch(function() {
	                return scope.$eval(attrs.autoFocus);
	            }, function(newValue) {
	                if (newValue === true) {
	                    element[0].focus(); //use focus function instead of autofocus attribute to avoid cross browser problem. And autofocus should only be used to mark an element to be focused when page loads.
	                }
	            });
	        }
	    };
	})

/***/ },
/* 48 */
/***/ function(module, exports) {

	angular.module('YApp').directive('ngDistributionDialog',['$state',function($state){
		return {
			restrict:'A',
			link:function(scope,element,attr){
				var qrCodeUrl = attr.qrCodeUrl,
					elementId = 'J_distribution_' + Math.floor(Math.random() * 9999),
					dialog = '<div class="distribution-spread" id="'+elementId+'">'+
								'<div class="spread-model">'+
									'<h4 class="title">立即推广</h4>'+
									'<div class="desc-section">'+
										'<p class="name">方法一：微信内直接分享</p>'+
										'<p class="content">点击微信右上角，通过【发送给朋友】或【分享到朋友圈】推广</p>'+
									'</div>'+
									'<div class="desc-section J_way">'+
										'<p class="name">方法二：使用专属二维码推广</p>'+
										'<p class="content" style="width:70%;">点击右侧二维码放大，邀请客户扫描即可</p>'+
										'<p class="code-img" id="J_qrCodeWraper"></p>'+
									'</div>'+
									'<div class="button-wraper">'+
										'<button class="c-distribution-button c-distribution-button-fill J_goCenter" href="/index.html#/distribution/center">返回会员中心</button>'+
										'<button class="c-distribution-button J_close">关闭</button>'+
									'</div>'+
								'</div>'+
							'</div>';

				element.bind('click',function(){
					var qrCodeWraper;

					angular.element("body").append( angular.element(dialog) );
					dialog = angular.element("#"+elementId);
					qrCodeWraper = $('#J_qrCodeWraper');
					qrCodeWraper.html('');
					qrCodeWraper.qrcode({
						text:qrCodeUrl,
						width:dialog.width()*0.75,
						height:dialog.width()*0.75
					});

					dialog.find(".J_close").click(function(event) {
						qrCodeWraper.css({
							width:'20%',
							right:'0px',
						}).appendTo(dialog.find('.J_way'))
						dialog.remove();
					});
					dialog.find(".J_goCenter").click(function(event) {
						qrCodeWraper.css({
							width:'20%',
							right:'0px',
						}).appendTo(dialog.find('.J_way'))
						dialog.remove();
						$state.go('distribution.center')
					});
					dialog.find("#J_qrCodeWraper").click(function(event) {
						qrCodeWraper.css({
							width:'90%',
							right:'5%',
							top:'0.3rem',
							position:'absolute',
							'text-align':'center',
							'background':'#fff'
						}).appendTo(dialog.find('.spread-model'))
					});
				});
			}
		}
	}]);



/***/ },
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(162);


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var link = __webpack_require__(20);

	angular.module("YApp").controller('distributionPrincipalCtrl', [
	    '$rootScope',
	    '$scope',
	    '$state',
	    '$stateParams',
	    '$timeout',
	    '$location',
	    'distributionModel',
	    'cacheService',
	    'wxsdkService',
	    'toolsService',
	    function($rootScope, $scope, $state, $stateParams, $timeout, $location, distributionModel, cacheService, wxsdkService, toolsService) {
	        var distributionModel = new distributionModel(),
	            userInfo = cacheService.userInfo.get(),
	            userId = cacheService.userId.get();
	            shareLink = '',
	            shareDesc = '妈妈在哪儿？央视暑期大电影，儿童演员全国海选';

	        toolsService.setTitleForIphone("妈妈在哪儿？央视暑期大电影，儿童演员全国海选");

	        $rootScope.pageLoading = false;
	        $rootScope.isPageCover = false;
	        $rootScope.isPageWhite = true;

	        $scope.userInfo = userInfo;
	        
	         
	        function initShare(){
	            wxsdkService.shareAppMessage({
	                title:'国民老公邀请您一起学一起玩！',
	                link:shareLink,
	                desc:shareDesc,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon.png',
	                success:function(){}
	            });
	            wxsdkService.shareTimeline({
	                title:'国民老公邀请您一起学一起玩！',
	                link:shareLink,
	                imgUrl:'http://cdn.4001583721.com/share-distribution-icon.png',
	                success:function(){}
	            });
	        }

	         
	        
	        function init(){
	            var self = $scope;
	            wx.ready(function(){
	                initShare();
	            });
	        }

	        init();
	    }
	]);


/***/ }
/******/ ]);