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