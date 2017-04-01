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