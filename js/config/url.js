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
