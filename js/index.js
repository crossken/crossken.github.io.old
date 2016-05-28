$(function() {

	//布局
	if($('.container').height()>$(window).height()) {
		$('.md-record').css('position', 'fixed');
	}
	//禁止默认点击
	$('a').click(function(event) {
		event.preventDefault();
	});
	$('.to-my-money').on('touchstart',function(){
		window.location.href = 'my_money.html';
	});


	//录音
	var el = document.querySelector('.record-btn');
	var isStarted = false, isUpLoading = false;
	var voice = {
		localId: '',
		serverId: ''
	};

	//点击开始录音
	$(el).tap(function(){

		//如果录音正在上传，点击按钮不进行任何逻辑
		if (isUpLoading) return false;


		if (!isStarted) {

			$('.cancel').show();
			$('.record-btn img').attr('src', 'images/record-end.png');

			wx.startRecord({
				cancel: function () {
					
					alert('用户拒绝授权录音');

					$('.cancel').hide();
					$('.record-btn img').attr('src', 'images/record-btn.png');
					isStarted = false;
				}
			});

			isStarted = true;

		} else {

			$('.cancel').hide();
			$('.record-btn img').attr('src', 'images/waiting.png');
			isUpLoading = true;

			wx.stopRecord({
				success: function (res) {
					voice.localId = res.localId;
					if (voice.localId == '') {
						alert('请先使用 startRecord 接口录制一段声音');
						return;
					}
					wx.uploadVoice({
						localId: voice.localId, 
						isShowProgressTips: 1, 
						success: function (res) {
							voice.serverId = res.serverId; 
							$.ajax({
								type: "POST",
								url : $("#url").val(),
								data: {"media_id" : voice.serverId, "openid" : $("#opid").val()},
								dataType : "json",
								success:function(data){
									if(data.res == 'ok'){
										window.location.href = _site  + "/uploadv/share/" + data.openid + "/" + data.vid;
									}
								}
							})
						}
					});
				}
			});

		}

	})




wx.onVoiceRecordEnd({
    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
    complete: function (res) {
    	var localId = res.localId; 

    	isUpLoading = true;
    	$('.cancel').hide();
    	$('.record-btn img').attr('src', 'images/waiting.png');

    	wx.uploadVoice({
    		localId: '',
    		isShowProgressTips: 1, 
    		success: function (res) {
    			var serverId = res.serverId; 
    		}
    	});
    }
});

//loading进度条
loadingPrgress2 = function(){
	pbWidth = parseFloat(nowProgress.style.width);
	if (pbWidth<63) {
		nowProgress.style.width = pbWidth + 0.5 +'%';
	} else {

		setTimeout(function(){
			$('.loading').fadeOut(500,function(){});
		},300);
		setTimeout(function(){
			$('.title-1').addClass('animated rubberBand');
		},600)
		$('.title-2').addClass('animated rotateIn');
		// 建议测试时把下面这句注释掉
		$('.md-record').addClass('animated zoomIn');
		clearInterval(loadingTimer2);			
	}
}

loadState = true;

});