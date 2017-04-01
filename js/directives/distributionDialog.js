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

