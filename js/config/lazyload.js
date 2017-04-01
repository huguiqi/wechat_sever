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
